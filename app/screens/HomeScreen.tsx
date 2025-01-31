import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons"; // Add this import at the top

import { View, Text, StyleSheet, ScrollView, Image, ImageBackground,TouchableOpacity } from "react-native";
import { getCurrentLocation } from "@/utils/location";
import { fetchWeatherAndDaylight } from "@/utils/fetchWeatherAndDaylight";
import { loadData } from "@/utils/storage";
import suggestSadLampSlot from "@/utils/sadLampScheduler";
import theme from "@/theme";

const HomeScreen = () => {
  const [todayData, setTodayData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadTodayData = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];

      // Get current location
      const { latitude, longitude } = await getCurrentLocation();

      // Fetch weather and daylight data
      const weatherAndDaylightData = await fetchWeatherAndDaylight(
        latitude,
        longitude
      );

      // Extract sunrise/sunset
      const sunrise = new Date(
        weatherAndDaylightData.sys.sunrise * 1000
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const sunset = new Date(
        weatherAndDaylightData.sys.sunset * 1000
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // Convert temperature from Kelvin to Celsius
      const temperatureCelsius = Math.round(weatherAndDaylightData.main.temp - 273.15);
      const weatherCondition = weatherAndDaylightData.weather[0]?.main || "N/A";
      const weatherIcon = weatherAndDaylightData.weather[0]?.icon || null;

      // Load today's schedule
      const schedules = (await loadData("schedules")) || {};
      const todaySchedule = schedules[today] || []; // Fallback to an empty array

      // Calculate SAD lamp suggestion
      const suggestedLampTime = await suggestSadLampSlot(
        today,
        { sunrise, sunset },
        todaySchedule
      );

      setTodayData({
        weather: { temperature: temperatureCelsius, condition: weatherCondition, icon: weatherIcon },
        daylight: { sunrise, sunset },
        schedule: todaySchedule,
        sadLampTime: suggestedLampTime || "No time calculated yet.",
      });
    } catch (err) {
      console.error("Error loading today's data:", err);
      setError("Failed to load today's data.");
    }
  };

  useEffect(() => {
    loadTodayData();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!todayData) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>Loading today's data...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/backgroundHS.jpg")} // Replace with your background image
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Weather Section */}
        <View style={styles.weatherContainer}>
          {todayData.weather.icon && (
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${todayData.weather.icon}@4x.png`,
              }}
              style={styles.weatherIcon}
            />
          )}
          <Text style={styles.temperatureText}>
            {`${todayData.weather.temperature}°C`}
          </Text>
          <Text style={styles.weatherConditionText}>
            {todayData.weather.condition}
          </Text>
        </View>

        {/* Sunrise/Sunset Section */}
        <View style={styles.daylightContainer}>
          <View style={styles.daylightRow}>
            <FontAwesome5 name="sun" size={24} color="#ffa511" style={styles.daylightIcon} />
            <Text style={styles.daylightText}>
              {todayData.daylight.sunrise}
            </Text>
            <Text style={styles.separator}>/</Text>
            <Text style={styles.daylightText}>
              {todayData.daylight.sunset}
            </Text>
            <FontAwesome5 name="moon" size={24} color="#4A90E2" style={styles.daylightIcon} />
          </View>
        </View>
        {/* SAD Lamp Suggestion */}
        <View style={styles.sadLampContainer}>
          <Text style={styles.sadLampText}>SAD lamp time</Text>
          <Text style={styles.sadLampTime}>
            {todayData.sadLampTime}
          </Text>
        </View>

        {/* Schedule Section */}
        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleHeader}>your schedule</Text>
          {todayData.schedule && todayData.schedule.length > 0 ? (
            todayData.schedule.map((item: any, index: number) => (
              <Text key={index} style={styles.scheduleText}>
                {`${item.startTime} - ${item.endTime}`}
              </Text>
            ))
          ) : (
            <Text style={styles.noSchedulesText}>no schedules for today</Text>
          )}
        </View>

        {/* Button to navigate to CollectedDataScreen */}
        return (
    <TouchableOpacity
      style={styles.navigationButton}
      onPress={() => router.push("/CollectedDataScreen")} // ✅ Correct navigation call
    >
      <Text style={styles.navigationButtonText}>Go to Collected Data</Text>
    </TouchableOpacity>
  );
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    
  },
  weatherContainer: {
    alignItems: "center",
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
    color: theme.colors.primary, 
  },
  temperatureText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#7d89cb",
  },
  weatherConditionText: {
    fontSize: 24,
    color: theme.colors.text,
    textAlign: "center",
  },
  daylightContainer: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: "rgba(255, 249, 196, 0.5)",
    borderRadius: 10,
    alignItems: "center",
  },
  
  daylightRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  
  daylightText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
    marginHorizontal: 5,
  },
  
  daylightIcon: {
    marginHorizontal: 5,
  },
  
  separator: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
    marginHorizontal: 5,
  },
  
  sadLampContainer: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    alignItems: "center",
  },
  sadLampText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7d85cb",
    marginBottom: 8,
  },
  sadLampTime: {
    fontSize: 24,
    color: "#004fa9",
    fontWeight: "bold",
  },
  scheduleContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    alignItems: "center",
  },
  scheduleHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#7d85cb",
    textAlign: "center",
  },
  scheduleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#004fa9",
    marginBottom: 8,
  },
  noSchedulesText: {
    fontSize: 16,
    fontStyle: "italic",
    color: theme.colors.fadedText,
  },
  errorText: {
    fontSize: 18,
    color: theme.colors.error,
    textAlign: "center",
  },
  messageText: {
    fontSize: 20,
    color: "#555",
    textAlign: "center",
  },
  navigationButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    alignItems: "center",
  },
  navigationButtonText: {
    fontSize: 18,
    color: theme.colors.primaryText,
    fontWeight: "bold",
  },
});

export default HomeScreen;
