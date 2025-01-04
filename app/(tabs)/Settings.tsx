import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SettingsScreen() {
  const [location, setLocation] = useState<string>("");
  const [useGPS, setUseGPS] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    false
  );
  const [reminderTime, setReminderTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Request Location Permissions & Fetch Current Location
  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Enable location permissions.");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(
        `${currentLocation.coords.latitude}, ${currentLocation.coords.longitude}`
      );
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Could not fetch location.");
    }
  };

  // Request Notification Permissions
  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Enable notifications to receive reminders."
      );
    }
  };

  // Schedule Daily Notification
  const scheduleNotification = async (time: Date) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "SAD Lamp Reminder",
        body: "Don't forget to use your SAD lamp!",
      },
      trigger: {
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
      },
    });
    Alert.alert("Notification Scheduled", `Reminder set for ${time}`);
  };

  useEffect(() => {
    if (notificationsEnabled) {
      requestNotificationPermissions();
    }
  }, [notificationsEnabled]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Location Section */}
        <Text style={styles.sectionTitle}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter location (City or Lat, Lon)"
          value={location}
          onChangeText={setLocation}
          editable={!useGPS}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={fetchLocation}
          disabled={useGPS}
        >
          <Text style={styles.buttonText}>
            {useGPS ? "Using GPS Location" : "Use GPS"}
          </Text>
        </TouchableOpacity>

        {/* Notifications Section */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={(value) => setNotificationsEnabled(value)}
          />
        </View>

        {notificationsEnabled && (
          <View>
            <Text style={styles.sectionTitle}>Reminder Time</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.buttonText}>
                Set Reminder: {reminderTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={reminderTime}
                mode="time"
                display="default"
                onChange={(event, date) => {
                  setShowTimePicker(false);
                  if (date) setReminderTime(date);
                }}
              />
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => scheduleNotification(reminderTime)}
            >
              <Text style={styles.buttonText}>Save Reminder</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#007BFF",
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  container: { flex: 1, padding: 16 },
  input: {
    borderColor: "#ddd",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
  },
  safeArea: { backgroundColor: "#FFF8E1", flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  switchContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  switchText: { fontSize: 16 },
});

