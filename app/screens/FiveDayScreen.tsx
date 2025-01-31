import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { getCurrentLocation } from "@/utils/location";
import { useFocusEffect } from "@react-navigation/native";
import { fetchFiveDayForecast } from "@/utils/fetchFiveDayForecast";
import theme from "@/theme";

type Schedule = {
  startTime: string;
  endTime: string;
  description: string;
};

type ForecastDay = {
  date: string;
  main: string;
  temp: string;
  sunrise: string;
  sunset: string;
  schedule: Schedule[];
};

export default function FiveDayScreen() {
  const [forecastData, setForecastData] = useState<ForecastDay[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case "Clear":
        return "sun";
      case "Clouds":
        return "cloud";
      case "Rain":
        return "cloud-rain";
      case "Snow":
        return "snowflake";
      case "Thunderstorm":
        return "bolt";
      default:
        return "cloud-sun";
    }
  };
  useFocusEffect(
    useCallback(() => {
      const loadForecast = async () => {
        try {
          const location = await getCurrentLocation();
          const forecastData = await fetchFiveDayForecast(location.latitude, location.longitude);
          setForecastData(forecastData);
        } catch (error) {
          console.error("Failed to fetch 5-day forecast:", error);
          setError("Failed to fetch forecast data. Please try again later.");
        }
      };

      loadForecast();
    }, [])
  );

  return (
    <ImageBackground source={require("../assets/images/backgroundFDS.jpg")} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          forecastData.map((day, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.weatherContainer}>
                <FontAwesome5 name={getWeatherIcon(day.main)} size={40} color={theme.colors.primary} />
                <Text style={styles.dateText}>{day.date}</Text>
                <Text style={styles.weatherText}>{`${day.main} - ${day.temp}°C`}</Text>
              </View>

              <View style={styles.daylightContainer}>
                <Text style={styles.daylightText}>{`🌅 Sunrise: ${day.sunrise}`}</Text>
                <Text style={styles.daylightText}>{`🌙 Sunset: ${day.sunset}`}</Text>
              </View>

              {/* Schedule Section */}
              <View style={styles.scheduleContainer}>
                <Text style={styles.scheduleHeader}>Schedule:</Text>
                {day.schedule.length > 0 ? (
                  day.schedule.map((schedule: Schedule, idx: number) => (
                    <Text key={idx} style={styles.scheduleText}>
                      {`${schedule.startTime} - ${schedule.endTime}: ${schedule.description}`}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.noSchedulesText}>No schedules for this day.</Text>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: "cover" },
  container: { padding: theme.spacing.medium },
  card: { backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: theme.borderRadius.medium, padding: theme.spacing.medium, marginBottom: theme.spacing.medium },
  weatherContainer: { alignItems: "center", marginBottom: theme.spacing.medium },
  dateText: { fontSize: theme.fontSizes.large, fontWeight: "bold" },
  weatherText: { fontSize: theme.fontSizes.medium },
  daylightContainer: { marginVertical: theme.spacing.small },
  daylightText: { fontSize: theme.fontSizes.medium },
  scheduleContainer: { marginTop: theme.spacing.small },
  scheduleHeader: { fontSize: theme.fontSizes.medium, fontWeight: "bold" },
  scheduleText: { fontSize: theme.fontSizes.medium },
  noSchedulesText: { fontSize: theme.fontSizes.medium, fontStyle: "italic", color: theme.colors.fadedText },
  errorText: { fontSize: theme.fontSizes.medium, color: theme.colors.error, textAlign: "center" },
});
