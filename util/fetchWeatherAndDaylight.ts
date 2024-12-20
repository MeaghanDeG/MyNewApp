export type WeatherData = {
  dt_txt: string; // ISO date string
  weather: {
    main: string; // Main weather description
    description: string; // Detailed weather description
    temperature: number; // Temperature in Celsius
  };
  daylight: {
    sunrise: string; // Sunrise time in HH:MM format
    sunset: string; // Sunset time in HH:MM format
  };
};

export const fetchWeatherAndDaylight = async (
  latitude: number,
  longitude: number,
  apiKey: string
): Promise<WeatherData[]> => {
  try {
    // Fetch One Call API for daily data
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;
    const oneCallResponse = await fetch(oneCallUrl);
    if (!oneCallResponse.ok) {
      throw new Error(`Failed to fetch daylight data: ${oneCallResponse.statusText}`);
    }
    const oneCallData = await oneCallResponse.json();
    const { daily, timezone_offset } = oneCallData;

    // Fetch 5-day Forecast API for hourly data
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
      throw new Error(`Failed to fetch weather data: ${forecastResponse.statusText}`);
    }
    const forecastData = await forecastResponse.json();

    // Adjust times for the local timezone
    const adjustToTimezone = (timestamp: number): string =>
      new Date((timestamp + timezone_offset) * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    // Combine forecast (hourly) with daily (sunrise/sunset)
    return forecastData.list.map((item: any, index: number) => {
      const day = daily[Math.floor(index / 8)]; // Group hourly data into daily
      return {
        dt_txt: item.dt_txt,
        weather: {
          main: item.weather[0].main,
          description: item.weather[0].description,
          temperature: item.main.temp,
        },
        daylight: {
          sunrise: adjustToTimezone(day.sunrise),
          sunset: adjustToTimezone(day.sunset),
        },
      };
    });
  } catch (error) {
    console.error("Error fetching weather and daylight data:", error);
    throw error;
  }
};
