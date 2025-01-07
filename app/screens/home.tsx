// app/screens/home.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { getCurrentLocation } from "@/app/utils/location";  // ✅ Fixed path
import { fetchWeatherAndDaylight } from "@/app/utils/fetchWeatherAndDaylight"; // ✅ Fixed path
import { rateWeather } from "@/app/utils/rateWeather"; // ✅ Fixed path

export default function HomeScreen() {
  const [weather, setWeather] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherDescription, setWeatherDescription] = useState<string | null>(null);

  const getWeatherData = async () => {
    try {
      const location = await getCurrentLocation();
      const weatherData = await fetchWeatherAndDaylight(
        location.latitude,
        location.longitude
      );

      // ✅ Access the data correctly assuming weatherData is an object
      const weatherMain = weatherData.weather[0].main;
      const weatherDescription = weatherData.weather[0].description;
      const temp = weatherData.main.temp;

      const score = rateWeather(weatherMain);

      setWeather(weatherMain);
      setTemperature(temp);
      setWeatherDescription(`${weatherDescription}, Score: ${score}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Weather: {weather || "Loading..."}</Text>
      <Text style={styles.text}>Temperature: {temperature ?? "N/A"}°C</Text>
      <Text style={styles.text}>Details: {weatherDescription || "Fetching..."}</Text>
      <Button title="Refresh Weather" onPress={getWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginBottom: 8 },
});
