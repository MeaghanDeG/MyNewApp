import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";
import { getCurrentLocation } from "@/utils/location";
import { saveData, loadData } from "@/utils/storage";
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

  const fetchFiveDayData = async () => {
    try {
      const location = await getCurrentLocation();

      // Get the API key from your configuration
      const API_KEY = Constants.expoConfig?.extra?.OPENWEATHERMAP_API_KEY;
      if (!API_KEY) {
        throw new Error("API key is missing.");
      }

      // Use the 5-day forecast endpoint
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}`;
      const response = await fetch(forecastUrl);
      const weatherData = await response.json();

      // Log the API response for debugging
      console.log("Weather API Response:", weatherData);

      // Defensive checks
      if (!weatherData?.list || !weatherData?.city) {
        console.warn("Weather data is incomplete:", weatherData);
        setError("Some forecast data is missing. Displaying cached data.");
        const cachedData = await loadData("fiveDayForecast");
        if (cachedData) {
          setForecastData(cachedData);
          return;
        }
        throw new Error("No forecast data available.");
      }

      // Load schedules from storage
      const schedules = (await loadData("schedules")) || {};

      // Map forecast data into a usable format
      const forecastDays = weatherData.list
        .filter((entry: any, index: number) => index % 8 === 0) // Approx. one entry per day
        .map((entry: any) => {
          const dateObj = new Date(entry.dt_txt);
          const dayOfWeek = dateObj.toLocaleDateString(undefined, {
            weekday: "long",
          });
          const date = dateObj.toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
          });

          return {
            date: `${dayOfWeek}, ${date}`,
            main: entry.weather[0]?.main || "N/A",
            temp: Math.round(entry.main.temp - 273.15).toString(), // Convert to Celsius
            sunrise: new Date(weatherData.city.sunrise * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            sunset: new Date(weatherData.city.sunset * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            schedule: schedules[dateObj.toISOString().split("T")[0]] || [], // Attach schedule
          };
        });

      // Save data for offline use
      await saveData("fiveDayForecast", forecastDays);

      // Update state with the processed forecast data
      setForecastData(forecastDays);
    } catch (error) {
      console.error("Error fetching forecast data:", error);

      // Attempt to load cached data as a fallback
      const cachedData = await loadData("fiveDayForecast");
      if (cachedData) {
        console.log("Loaded cached forecast data:", cachedData);
        setForecastData(cachedData);
      } else {
        setError("Failed to fetch forecast data. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchFiveDayData();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/backgroundFDS.jpg")} // Replace with your background image
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          forecastData.map((day: ForecastDay, index: number) => (
            <View key={index} style={styles.card}>
              {/* Weather Section */}
              <View style={styles.weatherContainer}>
                <FontAwesome5
                  name={getWeatherIcon(day.main)}
                  size={40}
                  color={theme.colors.primary}
                  style={styles.weatherIcon}
                />
                <Text style={styles.dateText}>{day.date}</Text>
                <Text style={styles.weatherText}>{`${day.main} - ${day.temp}°C`}</Text>
              </View>

              {/* Daylight Section */}
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
                  <Text style={styles.noSchedulesText}>
                    No schedules for this day.
                  </Text>
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    padding: theme.spacing.medium,
    
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    shadowColor: theme.colors.border,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  weatherContainer: {
    alignItems: "center",
    marginBottom: theme.spacing.medium,
  },
  weatherIcon: {
    marginBottom: theme.spacing.small,
    fontSize: 50, // Increase the size of the icon
    color: theme.colors.primary, // Vibrant color from theme
    shadowColor: "#000", // Add shadow for better contrast
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
  daylightContainer: {
    marginVertical: theme.spacing.small,
  },
  daylightText: {
    fontSize: theme.fontSizes.medium,
    marginBottom: theme.spacing.small,
    color: theme.colors.text,
  },
  scheduleContainer: {
    marginTop: theme.spacing.small,
  },
  scheduleHeader: {
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
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
