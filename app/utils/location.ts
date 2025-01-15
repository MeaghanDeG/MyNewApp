// app/utils/location.ts
import * as ExpoLocation from "expo-location";
import { Alert } from "react-native";

/**
 * Fetches the user's current location.
 * If Expo Go is detected or permission is denied, defaults to Vancouver, BC.
 */
export const getCurrentLocation = async (): Promise<{ latitude: number; longitude: number }> => {
  try {
    // Check if running on Expo Go
    const isExpoGo = !__DEV__ || process.env.EXPO_PUBLIC_USE_DEFAULT_LOCATION === "true";

    if (isExpoGo) {
      console.warn("Using default location for Vancouver, BC (Expo Go restriction)");
      return {
        latitude: 49.2827, // Vancouver, BC coordinates
        longitude: -123.1207,
      };
    }

    // Request permission to access location
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Using default Vancouver, BC coordinates due to denied permissions."
      );
      return {
        latitude: 49.2827, // Default Vancouver coordinates
        longitude: -123.1207,
      };
    }

    // Fetch current location if permissions granted
    const currentLocation = await ExpoLocation.getCurrentPositionAsync({
      accuracy: ExpoLocation.Accuracy.High,
    });

    return {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    };
  } catch (error) {
    console.error("Error fetching location, defaulting to Vancouver:", error);
    return {
      latitude: 49.2827, // Vancouver, BC coordinates
      longitude: -123.1207,
    };
  }
};

export default getCurrentLocation;
