import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Slider from "@react-native-community/slider";
import theme from "@/theme";

export default function UserProfile() {
  const [lampDuration, setLampDuration] = useState<number>(20); // Default 20 minutes
  const [startTime, setStartTime] = useState<string>("08:00 AM");
  const [endTime, setEndTime] = useState<string>("08:30 PM");
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const loadPreferences = async () => {
      const savedDuration = await AsyncStorage.getItem("lampDuration");
      const savedStart = await AsyncStorage.getItem("startTime");
      const savedEnd = await AsyncStorage.getItem("endTime");

      if (savedDuration) setLampDuration(parseInt(savedDuration, 10));
      if (savedStart) setStartTime(savedStart);
      if (savedEnd) setEndTime(savedEnd);
    };

    loadPreferences();
  }, []);

  // Save preferences
  const savePreferences = async () => {
    try {
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
      <Text style={styles.header}>User Preferences</Text>

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
          onValueChange={(value: number) => setLampDuration(value)}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.secondary}
          thumbTintColor={theme.colors.primaryText}
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
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  header: {
    fontSize: theme.fontSizes.large,
    fontWeight: "bold",
    marginBottom: theme.spacing.large,
    textAlign: "center",
    color: theme.colors.text,
  },
  sliderContainer: {
    marginBottom: theme.spacing.large,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  label: {
    fontSize: theme.fontSizes.medium,
    marginBottom: theme.spacing.small,
    color: theme.colors.text,
  },
  timeContainer: {
    marginBottom: theme.spacing.large,
  },
  timeButton: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.small,
  },
  timeText: {
    fontSize: theme.fontSizes.medium,
    textAlign: "center",
    color: theme.colors.secondaryText,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.large,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.primaryText,
    fontWeight: "bold",
    fontSize: theme.fontSizes.medium,
  },
});







