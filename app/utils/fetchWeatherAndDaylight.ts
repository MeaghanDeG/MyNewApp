// app/utils/fetchWeatherAndDaylight.ts
export const fetchWeatherAndDaylight = async (
  latitude: number,
  longitude: number
) => {
  try {
    // Retrieve the API key from environment variables
    const apiKey = process.env.EXPO_PUBLIC_OPENWEATHERMAP_API_KEY;

    if (!apiKey) {
      throw new Error("Missing OpenWeatherMap API key.");
    }

    // Construct the API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    // Fetch the weather data
    const response = await fetch(url);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Defensive check for sys.sunrise and sys.sunset
    if (!data.sys || typeof data.sys.sunrise !== "number" || typeof data.sys.sunset !== "number") {
      throw new Error("Sunrise/sunset data is missing from the API response.");
    }

    // Return the weather data
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message || error);
    throw error;
  }
};

export default fetchWeatherAndDaylight;
