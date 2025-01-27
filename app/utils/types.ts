// app/utils/types.ts

// Define individual types
export type WeatherData = {
  weather: { main: string; description: string }[];
  main: { temp: number };
  sys?: { sunrise?: number; sunset?: number };
};

export type ScheduleItem = {
  id: string;
  startTime: string;
  endTime: string;
  description: string;
};

export type DaylightData = {
  sunrise: string;
  sunset: string;
};

export type TodayData = {
  date: string;
  schedule: Array<{
    id: string;
    startTime: string;
    endTime: string;
    description: string;
  }>;
  weather: {
    weather: Array<{
      main: string; // e.g., "Clouds", "Rain"
      description: string; // e.g., "overcast clouds"
    }>;
    main: {
      temp: number; // e.g., 25.5 (temperature)
    };
  };
  daylight: {
    sunrise: string; // e.g., "06:30 AM"
    sunset: string; // e.g., "07:45 PM"
  };
  sadLampTime: string; // e.g., "No available time today"
};

export default {};
