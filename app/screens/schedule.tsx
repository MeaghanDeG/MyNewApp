import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from "expo-location";

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(""); // Selected calendar date
  const [schedules, setSchedules] = useState<any[]>([]); // List of schedules for the selected date
  const [scheduleInput, setScheduleInput] = useState(""); // User input for the schedule description
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [showStartTimePicker, setShowStartTimePicker] = useState(false); // Start time picker visibility
  const [showEndTimePicker, setShowEndTimePicker] = useState(false); // End time picker visibility
  const [selectedStartTime, setSelectedStartTime] = useState(new Date()); // Selected start time
  const [selectedEndTime, setSelectedEndTime] = useState(new Date()); // Selected end time
  const [daylightHours, setDaylightHours] = useState(""); // Daylight hours for the selected location
  const [latitude, setLatitude] = useState(""); // User's latitude
  const [longitude, setLongitude] = useState(""); // User's longitude

  // Save data to AsyncStorage
  const saveData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Load data from AsyncStorage
  const loadData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // Fetch schedules for the selected date
  const loadSchedules = async (date: string) => {
    try {
      const existingSchedules = (await loadData("schedules")) || {};
      setSchedules(existingSchedules[date] || []);
    } catch (error) {
      console.error("Error loading schedules:", error);
    }
  };

  // Save a new schedule
  const saveSchedule = async () => {
    if (!selectedDate || !scheduleInput) {
      Alert.alert("Error", "Please complete all fields.");
      return;
    }

    const startTime = selectedStartTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = selectedEndTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newSchedule = {
      id: Date.now().toString(), // Unique ID
      description: scheduleInput,
      startTime,
      endTime,
    };

    try {
      const existingSchedules = (await loadData("schedules")) || {};
      if (!existingSchedules[selectedDate]) {
        existingSchedules[selectedDate] = [];
      }

      existingSchedules[selectedDate].push(newSchedule);
      await saveData("schedules", existingSchedules);

      setSchedules(existingSchedules[selectedDate]); // Update UI
      setScheduleInput("");
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  // Fetch daylight hours for the selected date
  const fetchDaylightHours = async (date: string) => {
    if (!latitude || !longitude) {
      setDaylightHours("Location not available");
      return;
    }

    try {
      const response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0&date=${date}`
      );
      const json = await response.json();

      if (json.status === "OK") {
        const sunrise = new Date(json.results.sunrise).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const sunset = new Date(json.results.sunset).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        setDaylightHours(`${sunrise} - ${sunset}`);
      } else {
        setDaylightHours("Error fetching daylight hours");
      }
    } catch (error) {
      console.error("Error fetching daylight hours:", error);
      setDaylightHours("Error fetching daylight hours");
    }
  };

  // Fetch user's location
  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to fetch daylight hours."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadSchedules(selectedDate);
      fetchDaylightHours(selectedDate);
    }
  }, [selectedDate, latitude, longitude]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Calendar
        markingType="simple"
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#ADD8E6" },
        }}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          setModalVisible(true);
        }}
        theme={{
          backgroundColor: "#f9f9f9",
          calendarBackground: "#f9f9f9",
          textSectionTitleColor: "#007BFF",
          selectedDayBackgroundColor: "#007BFF",
          selectedDayTextColor: "#fff",
        }}
      />

      {selectedDate && (
        <View style={styles.daylightBox}>
          <Text style={styles.daylightTitle}>Daylight Hours</Text>
          <Text style={styles.daylightText}>
            {daylightHours || "Loading daylight hours..."}
          </Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scheduleContainer}>
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <View key={schedule.id} style={styles.card}>
              <Text>{`${schedule.startTime} - ${schedule.endTime}: ${schedule.description}`}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noSchedulesText}>No schedules for the selected date.</Text>
        )}
      </ScrollView>

      {modalVisible && (
        <BlurView intensity={50} style={StyleSheet.absoluteFill}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Schedule for {selectedDate}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter schedule description"
              value={scheduleInput}
              onChangeText={setScheduleInput}
            />
            <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
              <Text>Start Time</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={showStartTimePicker}
              mode="time"
              onConfirm={(time) => {
                setSelectedStartTime(time);
                setShowStartTimePicker(false);
              }}
              onCancel={() => setShowStartTimePicker(false)}
            />
            <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
              <Text>End Time</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={showEndTimePicker}
              mode="time"
              onConfirm={(time) => {
                setSelectedEndTime(time);
                setShowEndTimePicker(false);
              }}
              onCancel={() => setShowEndTimePicker(false)}
            />
            <TouchableOpacity onPress={saveSchedule}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#f0f0f0", marginBottom: 8, padding: 8 },
  daylightBox: { backgroundColor: "#E3F2FD", borderRadius: 8, margin: 16, padding: 16 },
  daylightText: { fontSize: 16 },
  daylightTitle: { fontSize: 18, fontWeight: "bold" },
  input: { borderBottomWidth: 1, marginBottom: 12, padding: 8 },
  modalContent: { backgroundColor: "white", borderRadius: 8, padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  noSchedulesText: { color: "#888", textAlign: "center" },
  safeArea: { backgroundColor: "#FFF8E1", flex: 1 },
  scheduleContainer: { padding: 16 },
});

