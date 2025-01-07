import { OPENWEATHERMAP_API_KEY } from "@env";

export const fetchWeatherAndDaylight = async (
  latitude: number,
  longitude: number
): Promise<WeatherData[]> => {
  try {
    if (!OPENWEATHERMAP_API_KEY) {
      throw new Error("Missing OpenWeatherMap API key in configuration.");
    }

    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&units=metric&appid=${OPENWEATHERMAP_API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;

    // Fetch One Call API for daily data (sunrise and sunset)
    const oneCallResponse = await fetch(oneCallUrl);
    if (!oneCallResponse.ok) {
      throw new Error(`Failed to fetch daylight data: ${oneCallResponse.statusText}`);
    }
    const oneCallData = await oneCallResponse.json();
    const { daily, timezone_offset } = oneCallData;

    // Fetch 5-day Forecast API for hourly weather
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
      throw new Error(`Failed to fetch weather data: ${forecastResponse.statusText}`);
    }
    const forecastData = await forecastResponse.json();

    // Adjust times to local timezone
    const adjustToTimezone = (timestamp: number): string =>
      new Date((timestamp + timezone_offset) * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    // Combine hourly weather data with daily daylight data
    return forecastData.list.map((item: any, index: number) => {
      const dayIndex = Math.floor(index / 8); // Divide 8-hour segments into days
      const day = daily[dayIndex] || {};

      return {
        dt_txt: item.dt_txt, // Date/Time string for hourly data
        weather: {
          main: item.weather[0]?.main || "Unknown",
          description: item.weather[0]?.description || "No description available",
          temperature: item.main?.temp || 0,
        },
        daylight: {
          sunrise: day.sunrise ? adjustToTimezone(day.sunrise) : "N/A",
          sunset: day.sunset ? adjustToTimezone(day.sunset) : "N/A",
        },
      };
    });
  } catch (error) {
    console.error("Error fetching weather and daylight data:", error);
    throw error;
  }
};
