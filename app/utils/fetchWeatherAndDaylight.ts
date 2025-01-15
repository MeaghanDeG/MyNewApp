// app/utils/fetchWeatherAndDaylight.ts
import { OPENWEATHERMAP_API_KEY } from "@env";

export const fetchWeatherAndDaylight = async (
  latitude: number,
  longitude: number
) => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    // ✅ Defensive check for sys property
    if (!data.sys || typeof data.sys.sunrise !== "number") {
      throw new Error("Sunrise/sunset data is missing from the API response.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export default fetchWeatherAndDaylight;
