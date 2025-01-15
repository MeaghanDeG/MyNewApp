// app/utils/types.ts
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
  schedule: ScheduleItem[];
  weather?: WeatherData;
  daylight?: DaylightData;
  sadLampTime?: string;
};

// ✅ Exporting WeatherData as default
export default WeatherData;
