export type WeatherData = {
    dt_txt: string; // ISO date string for hourly forecast
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
  