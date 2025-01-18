import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Slider from "@react-native-community/slider";
import  theme  from "@/theme";

export default function UserProfile() {
  const [name, setName] = useState<string>("");
  const [lampDuration, setLampDuration] = useState<number>(15); // Default 15 minutes
  const [startTime, setStartTime] = useState<string>("08:00 AM");
  const [endTime, setEndTime] = useState<string>("08:30 PM");
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const loadPreferences = async () => {
      const savedName = await AsyncStorage.getItem("name");
      const savedDuration = await AsyncStorage.getItem("lampDuration");
      const savedStart = await AsyncStorage.getItem("startTime");
      const savedEnd = await AsyncStorage.getItem("endTime");

      if (savedName) setName(savedName);
      if (savedDuration) setLampDuration(parseInt(savedDuration, 10));
      if (savedStart) setStartTime(savedStart);
      if (savedEnd) setEndTime(savedEnd);
    };

    loadPreferences();
  }, []);

  // Save preferences
  const savePreferences = async () => {
    try {
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("lampDuration", lampDuration.toString());
      await AsyncStorage.setItem("startTime", startTime);
      await AsyncStorage.setItem("endTime", endTime);

      Alert.alert("Saved", "Your preferences have been successfully saved.");
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  // Handle time picker confirmation
  const handleTimeConfirm = (
    time: Date,
    setTime: React.Dispatch<React.SetStateAction<string>>,
    closePicker: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(formattedTime);
    closePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* Lamp Duration Slider */}
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>
          Preferred SAD Lamp Duration: {lampDuration} minutes
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={30}
          step={1}
          value={lampDuration}
          onValueChange={(value: number) => setLampDuration(value)} // Explicitly typed
          minimumTrackTintColor="#007BFF"
          maximumTrackTintColor="#CCC"
          thumbTintColor="#007BFF"
       />
      </View>

      {/* Time Window */}
      <View style={styles.timeContainer}>
        <Text style={styles.label}>Available Time Window:</Text>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setStartPickerVisible(true)}
        >
          <Text style={styles.timeText}>Start: {startTime}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isStartPickerVisible}
          mode="time"
          onConfirm={(time) =>
            handleTimeConfirm(time, setStartTime, setStartPickerVisible)
          }
          onCancel={() => setStartPickerVisible(false)}
        />
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setEndPickerVisible(true)}
        >
          <Text style={styles.timeText}>End: {endTime}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isEndPickerVisible}
          mode="time"
          onConfirm={(time) =>
            handleTimeConfirm(time, setEndTime, setEndPickerVisible)
          }
          onCancel={() => setEndPickerVisible(false)}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={savePreferences}>
        <Text style={styles.buttonText}>Save Preferences</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sliderContainer: {
    marginBottom: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  timeContainer: {
    marginBottom: 20,
  },
  timeButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
