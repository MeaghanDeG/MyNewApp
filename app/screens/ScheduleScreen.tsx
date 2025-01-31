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
import  theme  from "@/theme";
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
            <Text style={styles.modalTitle}>ADD SCHEDULE FOR {selectedDate}</Text>
            <TextInput
              style={styles.input}
              placeholder="Schedule description (required)"
              placeholderTextColor="#aaa"
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
  // Safe Area
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },

  // Daylight Box
  daylightBox: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.medium,
    elevation: 3, // Subtle shadow for depth
  },
  daylightTitle: {
    fontSize: theme.fontSizes.large,
    fontWeight: "bold",
    color: theme.colors.primaryText,
    marginBottom: theme.spacing.small,
  },
  daylightText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.primaryText,
  },

  // Schedule Cards
  scheduleContainer: {
    flexGrow: 1,
    paddingVertical: theme.spacing.medium,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.small,
    elevation: 2,
    shadowColor: theme.colors.border,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  scheduleText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.text,
  },
  noSchedulesText: {
    fontSize: theme.fontSizes.medium,
    fontStyle: "italic",
    color: theme.colors.fadedText,
    textAlign: "center",
    marginTop: theme.spacing.large,
  },

  // Buttons
  clearButton: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    marginTop: theme.spacing.medium,
  },
  clearButtonText: {
    color: theme.colors.primaryText,
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#66d4ff",
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    marginTop: theme.spacing.medium,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#cd9b0a",
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    marginTop: theme.spacing.small,
  },
  cancelButtonText: {
    color: "#FFF",
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Modal
  modalContent: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.large,
    marginHorizontal: theme.spacing.medium,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: theme.fontSizes.large,
    fontWeight: "bold",
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: theme.spacing.large,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    padding: theme.spacing.small,
    fontSize: theme.fontSizes.medium,
    marginBottom: theme.spacing.medium,
  },
  

  // Calendar Styling
  calendar: {
    marginBottom: theme.spacing.medium,
  },
});
