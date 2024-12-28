import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { fetchWeatherAndDaylight } from "../../util/fetchWeatherAndDaylight";
import { saveData, loadData } from "../../util/storage";

// Define types for the data structures
type ScheduleItem = {
  id: string;
  startTime: string;
  endTime: string;
  description: string;
};

type WeatherData = {
  main: string;
  description: string;
  temperature: number;
};

type DaylightData = {
  sunrise: string;
  sunset: string;
};

type TodayData = {
  date: string;
  schedule: ScheduleItem[];
  weather?: WeatherData;
  daylight?: DaylightData;
};

export default function HomeScreen() {
  const [todayData, setTodayData] = useState<TodayData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiKey = "3920538957e8362160f4d41ff5cae837"; // OpenWeatherMap API key

  const loadTodayData = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

      // Fetch user's location
      const location = await loadData("userLocation");
      if (!location) {
        Alert.alert(
          "Error",
          "Location not set. Update your location in Settings."
        );
        return;
      }

      const { latitude, longitude } = location;

      // Fetch and combine weather and daylight data
      const weatherAndDaylightData = await fetchWeatherAndDaylight(
        latitude,
        longitude,
        apiKey
      );
      await saveData("weatherAndDaylight", weatherAndDaylightData);

      const schedules = await loadData("schedules");
      const todaySchedule: ScheduleItem[] = schedules?.[today] || [];

      if (!todaySchedule.length && !weatherAndDaylightData.length) {
        setError("No data available for today.");
        return;
      }

      const todayWeather = weatherAndDaylightData.find((entry: any) =>
        entry.dt_txt.startsWith(today)
      );

      setTodayData({
        date: today,
        schedule: todaySchedule,
        weather: todayWeather?.weather || undefined,
        daylight: todayWeather?.daylight || undefined,
      });
    } catch (err) {
      console.error("Error loading today's data:", err);
      setError("Failed to load today's data.");
    }
  };

  const handleKeep = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      await saveData(`response-${today}`, "kept");
      Alert.alert("Saved", "You kept today's schedule.");
    } catch (error) {
      console.error("Error saving response:", error);
    }
  };

  const handleEdit = () => {
    Alert.alert("Edit", "Navigate to the schedule editor.");
    // Add navigation logic if applicable
  };

  const handleDontSave = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      await saveData(`response-${today}`, "not saved");
      Alert.alert("Updated", "You chose not to save today's schedule.");
    } catch (error) {
      console.error("Error saving response:", error);
    }
  };

  useEffect(() => {
    loadTodayData();
  }, []);

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!todayData) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.messageText}>Loading today's data...</Text>
        <Button title="Retry" onPress={loadTodayData} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Weather and Daylight Data */}
      <View style={styles.card}>
        <Text style={styles.dateText}>Today: {todayData.date}</Text>
        <Text style={styles.weatherText}>
          Weather: {todayData.weather?.main || "N/A"},{" "}
          {todayData.weather?.description || "N/A"} Temp:{" "}
          {todayData.weather?.temperature || "N/A"}°C
        </Text>
        <Text style={styles.daylightText}>
          Sunrise: {todayData.daylight?.sunrise || "N/A"}, Sunset:{" "}
          {todayData.daylight?.sunset || "N/A"}
        </Text>
      </View>

      {/* Schedule Data */}
      <View style={styles.card}>
        <Text style={styles.scheduleHeader}>Today's Schedule:</Text>
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

      {/* Actions Section */}
      <View style={styles.card}>
        <Text style={styles.questionText}>
          Did you stick to today's schedule, or would you like to edit it?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.keepButton} onPress={handleKeep}>
            <Text style={styles.buttonText}>Keep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dontSaveButton}
            onPress={handleDontSave}
          >
            <Text style={styles.buttonText}>Don't Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f9f9f9" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  messageText: { fontSize: 16, color: "gray" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dateText: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  weatherText: { fontSize: 16, marginBottom: 4 },
  daylightText: { fontSize: 16, marginBottom: 4 },
  scheduleHeader: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  scheduleText: { fontSize: 14, marginBottom: 4, marginLeft: 8 },
  noSchedulesText: { fontSize: 14, fontStyle: "italic", color: "gray" },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  keepButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  dontSaveButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: { textAlign: "center", color: "red", fontSize: 16 },
});
