import Constants from "expo-constants";

export const fetchWeatherAndDaylight = async (
  latitude: number,
  longitude: number
) => {
  try {
    const apiKey = Constants.expoConfig?.extra?.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      throw new Error("Missing OpenWeatherMap API key.");
    }

    // Fetch current weather for sunrise/sunset
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    console.log("Fetching current weather data from URL:", currentWeatherUrl);

    const currentWeatherResponse = await fetch(currentWeatherUrl);
    if (!currentWeatherResponse.ok) {
      throw new Error(`HTTP Error! Status: ${currentWeatherResponse.status}`);
    }

    const currentWeatherData = await currentWeatherResponse.json();
    console.log("Current Weather Data:", currentWeatherData);

    if (!currentWeatherData.sys?.sunrise || !currentWeatherData.sys?.sunset) {
      throw new Error("Sunrise/sunset data is missing from the API response.");
    }

    // Return weather and daylight data
    return currentWeatherData;
  } catch (error) {
    console.error("Error fetching weather and daylight data:", error);
    throw error;
  }
};
