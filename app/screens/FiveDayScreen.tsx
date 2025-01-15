// app/screens/FiveDayForecastScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getCurrentLocation } from "@/utils/location";
import { fetchWeatherAndDaylight } from "@/utils/fetchWeatherAndDaylight";
import { fetchSchedules } from "@/utils/storage";

const backgroundImage = require("@/assets/images/backgroundFDS.jpg");

export default function FiveDayForecastScreen() {
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [allSchedules, setAllSchedules] = useState<{ [key: string]: any[] }>({});
  const [error, setError] = useState<string | null>(null);

  const fetchFiveDayData = async () => {
    try {
        const location = await getCurrentLocation();
        const weatherData = await fetchWeatherAndDaylight(
            location.latitude,
            location.longitude
        );

        // ✅ Defensive check for weatherData structure
        if (!weatherData?.list || !weatherData?.city) {
            throw new Error("Incomplete weather data received.");
        }

        // ✅ Safely map the forecast days with optional chaining
        const forecastDays = weatherData.list.map((entry: any) => ({
            date: entry?.dt_txt?.split(" ")[0] ?? "N/A",
            main: entry?.weather?.[0]?.main ?? "N/A",
            temp: entry?.main?.temp ?? "N/A",
        }));

        // ✅ Defensive check for city sunrise/sunset data
        const sunrise = weatherData?.city?.sunrise
            ? new Date(weatherData.city.sunrise * 1000).toLocaleTimeString()
            : "N/A";
        const sunset = weatherData?.city?.sunset
            ? new Date(weatherData.city.sunset * 1000).toLocaleTimeString()
            : "N/A";

        setForecastData(
            forecastDays.map((day) => ({
                ...day,
                sunrise,
                sunset,
            }))
        );
    } catch (error) {
        console.error("Error fetching forecast data:", error);
        setError("Failed to fetch the forecast data.");
    }
};

  useEffect(() => {
    fetchFiveDayData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ✅ Error Handling */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        forecastData.map((day, index) => (
          <View key={index} style={styles.card}>
            {/* ✅ Weather Section */}
            <Text style={styles.dateText}>{day.date}</Text>
            <Text style={styles.weatherText}>Weather: {day.main}</Text>
            <Text style={styles.weatherText}>Temp: {day.temp}°C</Text>

            {/* ✅ Daylight Section */}
            <Text style={styles.daylightText}>
              Sunrise: {day.sunrise} | Sunset: {day.sunset}
            </Text>

            {/* ✅ Schedule Section */}
            <Text style={styles.scheduleHeader}>Schedule:</Text>
            {allSchedules[day.date]?.length > 0 ? (
              allSchedules[day.date].map((schedule, idx) => (
                <Text key={idx} style={styles.scheduleText}>
                  {schedule.startTime} - {schedule.endTime}: {schedule.description}
                </Text>
              ))
            ) : (
              <Text style={styles.noSchedulesText}>No schedules for this day.</Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f9f9f9" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  dateText: { fontSize: 20, fontWeight: "bold" },
  weatherText: { fontSize: 16, marginTop: 8 },
  daylightText: { fontSize: 16, marginVertical: 8 },
  scheduleHeader: { fontSize: 18, fontWeight: "bold", marginTop: 12 },
  scheduleText: { fontSize: 16, marginTop: 4 },
  noSchedulesText: { fontSize: 16, fontStyle: "italic", color: "gray" },
  errorText: { color: "red", textAlign: "center", marginTop: 20 },
});

