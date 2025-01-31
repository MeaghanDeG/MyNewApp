import Constants from "expo-constants";
import { loadData } from "@/utils/storage";

export type Schedule = {
  startTime: string;
  endTime: string;
  description: string;
};

export type ForecastDay = {
  date: string;
  main: string;
  temp: string;
  sunrise: string;
  sunset: string;
  schedule: Schedule[];
};

type ForecastEntry = {
  dt: number;
  dt_txt: string;
  main?: {
    temp: number;
  };
  weather?: {
    main: string;
    description: string;
  }[];
};

export const fetchFiveDayForecast = async (
  latitude: number,
  longitude: number
): Promise<ForecastDay[]> => {
  try {
    const apiKey = Constants.expoConfig?.extra?.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      throw new Error("Missing OpenWeatherMap API key.");
    }

    // Fetch 5-day forecast from OpenWeather API
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const response = await fetch(forecastUrl);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const weatherData = await response.json();
    if (!weatherData.list || weatherData.list.length === 0 || !weatherData.city) {
      throw new Error("Weather forecast data is missing.");
    }

    // Load stored schedules
    const storedSchedules = (await loadData("schedules")) || {};

    // **HARD-CODED SUNRISE & SUNSET TIMES**
    const localSunrise = "7:31 AM"; // Hardcoded sunrise
    const localSunset = "4:52 PM";  // Hardcoded sunset

    // Process the forecast data
    const dailyForecasts: Record<string, ForecastEntry> = {};

    for (const entry of weatherData.list) {
      const date = entry.dt_txt.split(" ")[0]; // Extract YYYY-MM-DD

      if (!dailyForecasts[date]) {
        dailyForecasts[date] = entry;
      }
    }

    // Convert processed data into ForecastDay array
    const forecastDays: ForecastDay[] = Object.entries(dailyForecasts).map(([date, entry]) => ({
      date: new Date(entry.dt_txt).toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
      main: entry.weather?.[0]?.main || "N/A",
      temp: entry.main?.temp
        ? Math.round(entry.main.temp - 273.15).toString()
        : "N/A",
      sunrise: localSunrise, // ✅ Hardcoded
      sunset: localSunset,   // ✅ Hardcoded
      schedule: storedSchedules[date] || [], // ✅ Attach stored schedule
    }));

    return forecastDays;
  } catch (error) {
    console.error("Error fetching 5-day forecast data:", error);
    throw error;
  }
};

