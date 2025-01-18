import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
  ImageBackground,
} from "react-native";
import { fetchWeatherAndDaylight } from "../utils/fetchWeatherAndDaylight";
import { saveData, loadData } from "../utils/storage";
import getCurrentLocation from "../utils/location";
import { WeatherData, ScheduleItem, TodayData } from "@/utils/types";
import suggestSadLampSlot from "@/utils/sadLampScheduler";
import  theme  from "@/theme";

// Import weather icons from Expo icons library
import { FontAwesome5 } from "@expo/vector-icons";



export default function HomeScreen() {
  const [todayData, setTodayData] = useState<TodayData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ Day/Night Check Logic
  const isDaytime = () => {
    if (!todayData?.daylight) return true;
    const currentTime = new Date().getHours();
    const sunriseTime = new Date(todayData.daylight.sunrise).getHours();
    const sunsetTime = new Date(todayData.daylight.sunset).getHours();
    return currentTime >= sunriseTime && currentTime < sunsetTime;
  };

  // ✅ Fetching Weather and Daylight Data
  const loadTodayData = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const { latitude, longitude } = await getCurrentLocation();
      const weatherAndDaylightData = await fetchWeatherAndDaylight(latitude, longitude);

      // ✅ Ensure data structure exists before accessing
      if (!weatherAndDaylightData.sys) {
        throw new Error("Sunrise and Sunset data missing.");
      }

      const sunrise = weatherAndDaylightData.sys?.sunrise
      ? new Date(weatherAndDaylightData.sys.sunrise * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
      })
      : "N/A";
      const sunset = weatherAndDaylightData.sys?.sunset
      ? new Date(weatherAndDaylightData.sys.sunset * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
      })
      : "N/A";

      const schedules = await loadData("schedules");
      const todaySchedule = schedules?.[today] || [];

      const suggestedLampTime = await suggestSadLampSlot(today, { sunrise, sunset }, todaySchedule);
      setTodayData({
        date: today,
        schedule: todaySchedule,
        weather: weatherAndDaylightData,
        daylight: { sunrise, sunset },
        sadLampTime: suggestedLampTime || "No available time today",
      });
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load today's data.");
    }
  };

  useEffect(() => {
    loadTodayData();
  }, []);

  // ✅ Button Handlers
  const handleKeep = async () => {
    const today = new Date().toISOString().split("T")[0];
    await saveData(`response-${today}`, "kept");
    Alert.alert("Success", "You kept today's schedule.");
  };

  const handleEdit = () => {
    Alert.alert("Edit", "Navigating to the schedule editor...");
  };

  const handleDontSave = async () => {
    const today = new Date().toISOString().split("T")[0];
    await saveData(`response-${today}`, "not saved");
    Alert.alert("Updated", "You chose not to save today's schedule.");
  };

  // ✅ Determine Weather Icon
  const getWeatherIcon = (weather: string | undefined) => {
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

  // ✅ Error Handling
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={loadTodayData} />
      </View>
    );
  }

  // ✅ Loading State Handling
  if (!todayData) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.messageText}>Loading today's data...</Text>
        <Button title="Retry" onPress={loadTodayData} />
      </View>
    );
  }

  // ✅ Main Screen Return
  return (
    <ImageBackground source={require("../assets/images/backgroundHS.jpg")} style={styles.backgroundImage}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: isDaytime() ? "rgba(135, 206, 235, 0.8)" : "rgba(44, 62, 80, 0.8)" },
        ]}
      >
        {/* ✅ Weather Section with Icon */}
        <View style={styles.weatherContainer}>
          <FontAwesome5
            name={getWeatherIcon(todayData.weather?.weather[0]?.main)}
            size={50}
            color={isDaytime() ? "#FDB813" : "#f0f0f0"}
          />
          <Text style={styles.weatherText}>
            {todayData.weather?.weather[0]?.main || "N/A"} -{" "}
            {todayData.weather?.main.temp || "N/A"}°C
          </Text>
        </View>

        {/* ✅ Sunrise/Sunset Section */}
        <View style={styles.sunriseContainer}>
          <Text style={styles.daylightText}>
            🌅 Sunrise: {todayData.daylight?.sunrise || "N/A"} | 🌙 Sunset:{" "}
            {todayData.daylight?.sunset || "N/A"}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.scheduleHeader}>Use your SAD Lamp:</Text>
          <Text style={styles.scheduleText}>
              {todayData.sadLampTime || "No available time today"}
          </Text>
        </View>

        {/* ✅ Schedule Section */}
        <View style={styles.card}>
          <Text style={styles.scheduleHeader}>Your Schedule Today:</Text>
          {todayData.schedule.length > 0 ? (
            todayData.schedule.map((item: ScheduleItem) => (
              <Text key={item.id} style={styles.scheduleText}>
                {item.startTime} - {item.endTime}: {item.description}
              </Text>
            ))
          ) : (
            <Text style={styles.noSchedulesText}>No schedules for today.</Text>
          )}
        </View>
        
        {/* ✅ Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.keepButton} onPress={handleKeep}>
            <Text style={styles.buttonText}>Keep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dontSaveButton} onPress={handleDontSave}>
            <Text style={styles.buttonText}>Don't Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

// ✅ Styles Section
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  weatherContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  weatherText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  sunriseContainer: {
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 15,
    padding: 10,
    marginVertical: 20,
  },
  daylightText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  scheduleHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  scheduleText: {
    fontSize: 18,
    marginVertical: 6,
    color: "#333",
  },
  noSchedulesText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  keepButton: {
    flex: 1,
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: "center",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: "center",
  },
  dontSaveButton: {
    flex: 1,
    backgroundColor: "#dc3545",
    paddingVertical: 14,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    fontSize: 20,
    color: "#555",
    textAlign: "center",
  },
});
