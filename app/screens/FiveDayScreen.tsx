// app/screens/FiveDayForecastScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getCurrentLocation } from "@/utils/location";
import { fetchWeatherAndDaylight } from "@/utils/fetchWeatherAndDaylight";
import { fetchSchedules } from "@/utils/storage";
import  theme from "@/theme";

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
        const forecastDays: { date: string; main: string; temp: string }[] = weatherData.list.map((entry: any) => ({
          date: entry.dt_txt.split(" ")[0],
          main: entry.weather[0].main,
          temp: entry.main.temp,
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
  container: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    shadowColor: theme.colors.border,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  dateText: {
    fontSize: theme.fontSizes.large,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  weatherText: {
    fontSize: theme.fontSizes.medium,
    marginTop: theme.spacing.small,
    color: theme.colors.text,
  },
  daylightText: {
    fontSize: theme.fontSizes.medium,
    marginVertical: theme.spacing.small,
    color: theme.colors.text,
  },
  scheduleHeader: {
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
    marginTop: theme.spacing.small,
    color: theme.colors.text,
  },
  scheduleText: {
    fontSize: theme.fontSizes.small,
    marginTop: theme.spacing.small,
    color: theme.colors.text,
  },
  noSchedulesText: {
    fontSize: theme.fontSizes.small,
    fontStyle: "italic",
    color: theme.colors.fadedText,
  },
  errorText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.error,
    textAlign: "center",
    marginTop: theme.spacing.large,
  },
});
