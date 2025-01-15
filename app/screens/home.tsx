// app/screens/home.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { getCurrentLocation } from "@/utils/location";
import { fetchWeatherAndDaylight } from "@/utils/fetchWeatherAndDaylight";
import { rateWeather } from "@/utils/rateWeather";
import { WeatherData } from "@/utils/types";

export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getWeatherData = async () => {
    try {
      const location = await getCurrentLocation();
      const fetchedData = await fetchWeatherAndDaylight(
        location.latitude,
        location.longitude
      );

      // ✅ TypeScript now recognizes the structure
      if (fetchedData.weather && fetchedData.weather.length > 0) {
        setWeatherData(fetchedData);
      } else {
        setError("No weather data available.");
      }
    } catch (error) {
      setError("Failed to fetch weather data.");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <View style={styles.container}>
      {weatherData ? (
        <>
          <Text style={styles.text}>Weather: {weatherData.weather[0].main}</Text>
          <Text style={styles.text}>Temperature: {weatherData.main.temp}°C</Text>
          <Text style={styles.text}>Description: {weatherData.weather[0].description}</Text>
        </>
      ) : (
        <Text>{error || "Loading weather data..."}</Text>
      )}
      <Button title="Refresh Weather" onPress={getWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginBottom: 8 },
});
