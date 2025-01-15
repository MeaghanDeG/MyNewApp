// app/screens/SettingsScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
  const [preferredTime, setPreferredTime] = useState<string>("08:00");
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  // ✅ Load saved preferences from AsyncStorage
  const loadPreferences = async () => {
    try {
      const storedTime = await AsyncStorage.getItem("preferredSadLampTime");
      if (storedTime) setPreferredTime(storedTime);
    } catch (error) {
      console.error("Error loading preferences:", error);
    }
  };

  // ✅ Save preferred time to AsyncStorage
  const savePreferredTime = async (time: string) => {
    try {
      await AsyncStorage.setItem("preferredSadLampTime", time);
      Alert.alert("Saved", "Preferred time has been updated.");
    } catch (error) {
      console.error("Error saving time:", error);
    }
  };

  useEffect(() => {
    loadPreferences();
  }, []);

  const handleConfirmTime = (time: Date) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setPreferredTime(formattedTime);
    savePreferredTime(formattedTime);
    setTimePickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      
      {/* ✅ Preferred SAD Lamp Time Setting */}
      <View style={styles.settingItem}>
        <Text style={styles.label}>Preferred SAD Lamp Time:</Text>
        <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
          <Text style={styles.valueText}>{preferredTime}</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setTimePickerVisible(false)}
      />
      
      {/* ✅ Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => savePreferredTime(preferredTime)}
      >
        <Text style={styles.buttonText}>Save Preferences</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  settingItem: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  valueText: {
    fontSize: 18,
    marginTop: 8,
    color: "#007bff",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
