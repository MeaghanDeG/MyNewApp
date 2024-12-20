import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { saveData, loadData, clearData } from "../../util/storage";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Load user location on mount
  useEffect(() => {
    const loadUserLocation = async () => {
      const location = await loadData("userLocation");
      setUserLocation(location);
    };
    loadUserLocation();
  }, []);

  // Toggle notifications
  const toggleNotifications = async () => {
    setNotificationsEnabled((prev) => !prev);
    await saveData("notificationsEnabled", !notificationsEnabled);
    Alert.alert(
      "Notifications",
      !notificationsEnabled ? "Notifications enabled" : "Notifications disabled"
    );
  };

  // Update user location
  const updateLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Location Permission Denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      await saveData("userLocation", userLocation);
      setUserLocation(userLocation);
      Alert.alert("Location Updated Successfully");
    } catch (error) {
      Alert.alert("Error Fetching Location", error.message);
    }
  };

  // Reset all app data
  const resetData = async () => {
    Alert.alert("Reset Data", "Are you sure you want to clear all app data?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          await clearData(); // Clear all AsyncStorage data
          setUserLocation(null);
          setNotificationsEnabled(true);
          Alert.alert("App Data Cleared");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Location */}
      <Text style={styles.settingLabel}>Location</Text>
      <Text style={styles.settingValue}>
        Latitude: {userLocation?.latitude || "Unknown"}, Longitude:{" "}
        {userLocation?.longitude || "Unknown"}
      </Text>
      <Button title="Update Location" onPress={updateLocation} />

      {/* Notifications */}
      <View style={styles.toggleContainer}>
        <Text style={styles.settingLabel}>Push Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      {/* Reset Data */}
      <Button title="Reset App Data" onPress={resetData} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  settingValue: {
    fontSize: 14,
    marginBottom: 16,
    color: "gray",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
  },
});
