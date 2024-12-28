import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { fetchWeatherAndDaylight } from "@/util/fetchWeatherAndDaylight";
import { getCurrentLocation } from "@/util/location";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

type ScheduleItem = {
  description: string;
  startTime: string;
  endTime: string;
};

type DaylightData = {
  sunrise: string | null;
  sunset: string | null;
};

type WeatherData = {
  dt_txt: string; // ISO date string
  weather: {
    main: string;
    description: string;
    temperature: number;
  };
  daylight: DaylightData;
};

type CombinedData = {
  date: string;
  schedules: ScheduleItem[];
  daylight: DaylightData;
  weather: string;
  temp: string; // Displayed as °C
};

export default function FiveDayScreen() {
  const [combinedData, setCombinedData] = useState<CombinedData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchCombinedData = async () => {
    try {
      setLoading(true);

      // Get location
      const location = await getCurrentLocation();
      const apiKey = Constants.expoConfig?.extra?.OPENWEATHERMAP_API_KEY;
      if (!apiKey) {
        throw new Error("Missing OpenWeatherMap API key in configuration.");
      }

      // Fetch weather and daylight data
      const weatherData: WeatherData[] = await fetchWeatherAndDaylight(
        location.latitude,
        location.longitude,
        apiKey
      );

      // Combine the data for display
      const combined = weatherData.map((day) => ({
        date: new Date(day.dt_txt).toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        schedules: [], // Replace with actual schedules
        daylight: {
          sunrise: day.daylight.sunrise || "N/A",
          sunset: day.daylight.sunset || "N/A",
        },
        weather: day.weather.main,
        temp: `${Math.round(day.weather.temperature)}°C`,
      }));

      setCombinedData(combined);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to fetch weather or location data. Please try again.",
        [{ text: "Retry", onPress: fetchCombinedData }]
      );
      console.error("Error fetching combined data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCombinedData();
  }, []);

  const renderCard = useCallback(
    ({ item }: { item: CombinedData }) => (
      <View style={styles.card}>
        <Text style={styles.dateText}>{item.date}</Text>

        {/* Weather Information */}
        <View style={styles.row}>
          <Ionicons name="cloud-outline" size={20} color="#555" />
          <Text style={styles.weatherText}>
            {item.weather}, {item.temp}
          </Text>
        </View>

        {/* Daylight Information */}
        <View style={styles.row}>
          <Ionicons name="sunny-outline" size={20} color="#555" />
          <Text style={styles.daylightText}>
            Sunrise: {item.daylight.sunrise}, Sunset: {item.daylight.sunset}
          </Text>
        </View>

        {/* Schedules */}
        <Text style={styles.scheduleHeader}>Schedules:</Text>
        {item.schedules.length > 0 ? (
          item.schedules.map((schedule, index) => (
            <TouchableOpacity key={index} style={styles.scheduleItem}>
              <Text>
                {schedule.startTime} - {schedule.endTime}: {schedule.description}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noSchedulesText}>No schedules for this day.</Text>
        )}
      </View>
    ),
    []
  );

  const keyExtractor = useCallback((item: CombinedData) => item.date, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <FlatList
      data={combinedData}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContainer}
      renderItem={renderCard}
      refreshing={refreshing}
      onRefresh={async () => {
        setRefreshing(true);
        await fetchCombinedData();
        setRefreshing(false);
      }}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { padding: 16 },
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
  dateText: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  weatherText: { fontSize: 16, marginLeft: 8 },
  daylightText: { fontSize: 16, marginLeft: 8 },
  scheduleHeader: { fontSize: 16, fontWeight: "600", marginTop: 8 },
  scheduleItem: {
    padding: 8,
    marginBottom: 4,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  noSchedulesText: { fontSize: 14, fontStyle: "italic", color: "gray" },
  separator: { height: 1, backgroundColor: "#ccc", marginVertical: 8 },
});
