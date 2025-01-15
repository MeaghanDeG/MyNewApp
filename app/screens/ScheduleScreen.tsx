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
import { Calendar, DateData } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// ✅ State and functional component setup
export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [schedules, setSchedules] = useState<any[]>([]);
  const [scheduleInput, setScheduleInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [daylightHours, setDaylightHours] = useState("");
  const [latitude, setLatitude] = useState("49.2827");
  const [longitude, setLongitude] = useState("-123.1207");

  // ✅ Save data to AsyncStorage
  const saveData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // ✅ Load data from AsyncStorage
  const loadData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error loading data:", error);
      return null;
    }
  };

  // ✅ Load schedules for a date
  const loadSchedules = async (date: string) => {
    const storedSchedules = await loadData("schedules");
    setSchedules(storedSchedules?.[date] || []);
  };

  // ✅ Save schedule
  const saveSchedule = async () => {
    if (!selectedDate || !scheduleInput) {
      Alert.alert("Error", "Please complete all fields.");
      return;
    }

    const startTime = selectedStartTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const endTime = selectedEndTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (startTime >= endTime) {
      Alert.alert("Error", "Start time must be before end time.");
      return;
    }

    const newSchedule = {
      id: Date.now().toString(),
      description: scheduleInput,
      startTime,
      endTime,
    };

    try {
      const storedSchedules = (await loadData("schedules")) || {};
      storedSchedules[selectedDate] = [...(storedSchedules[selectedDate] || []), newSchedule];
      await saveData("schedules", storedSchedules);
      setSchedules(storedSchedules[selectedDate]);
      setScheduleInput("");
      setModalVisible(false);
      Alert.alert("Success", "Schedule saved successfully.");
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  // ✅ Delete all schedules for a date
  const clearSchedulesForDate = async () => {
    try {
      const storedSchedules = await loadData("schedules");
      if (storedSchedules?.[selectedDate]) {
        delete storedSchedules[selectedDate];
        await saveData("schedules", storedSchedules);
        setSchedules([]);
        Alert.alert("Deleted", "All schedules cleared for this day.");
      } else {
        Alert.alert("No schedules found to delete.");
      }
    } catch (error) {
      console.error("Error clearing schedules:", error);
    }
  };

  // ✅ Fetch daylight hours based on latitude and longitude
  const fetchDaylightHours = async (date: string) => {
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
    }
  };

  // ✅ Load schedules and daylight hours when date is selected
  useEffect(() => {
    if (selectedDate) {
      loadSchedules(selectedDate);
      fetchDaylightHours(selectedDate);
    }
  }, [selectedDate]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ✅ Calendar for date selection */}
      <Calendar
        markingType="simple"
        markedDates={{ [selectedDate]: { selected: true, selectedColor: "#ADD8E6" } }}
        onDayPress={(day: DateData) => {
          setSelectedDate(day.dateString);
          setModalVisible(true);
        }}
      />

      {/* ✅ Display Daylight Hours */}
      {selectedDate && (
        <View style={styles.daylightBox}>
          <Text style={styles.daylightTitle}>Daylight Hours</Text>
          <Text style={styles.daylightText}>{daylightHours || "Loading daylight hours..."}</Text>
        </View>
      )}

      {/* ✅ List Schedules */}
      <ScrollView contentContainerStyle={styles.scheduleContainer}>
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <View key={schedule.id} style={styles.card}>
              <Text>{`${schedule.startTime} - ${schedule.endTime}: ${schedule.description}`}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noSchedulesText}>No schedules for this date.</Text>
        )}
      </ScrollView>

      {/* ✅ Delete Schedules Button */}
      <TouchableOpacity onPress={clearSchedulesForDate} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Delete All Schedules for This Date</Text>
      </TouchableOpacity>

      {/* ✅ Add Schedule Modal */}
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
            {/* Start Time Picker */}
            <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
              <Text>{`Start Time: ${selectedStartTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}</Text>
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
            {/* End Time Picker */}
            <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
              <Text>{`End Time: ${selectedEndTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`}</Text>
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

            {/* Save Button */}
            <TouchableOpacity onPress={saveSchedule} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </BlurView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, padding: 20 },
  daylightBox: { backgroundColor: "#E3F2FD", padding: 16, borderRadius: 8 },
  daylightTitle: { fontSize: 18, fontWeight: "bold" },
  daylightText: { fontSize: 16 },
  card: { padding: 10, backgroundColor: "#f0f0f0", marginVertical: 8 },
  clearButton: { backgroundColor: "#ff4444", padding: 12, borderRadius: 8 },
  clearButtonText: { color: "white", textAlign: "center" },
  cancelButton: {
    backgroundColor: "#888",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  saveButton: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 8 },
  saveButtonText: { color: "#FFF", textAlign: "center" },
  scheduleContainer: { paddingVertical: 16 },
  noSchedulesText: { textAlign: "center", marginTop: 20 },
  modalContent: { padding: 20, backgroundColor: "white", borderRadius: 8 },
  modalTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
  input: { borderBottomWidth: 1, padding: 10, marginBottom: 12 },
});

