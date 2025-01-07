import * as Location from "expo-location";
import { Alert } from "react-native";

export const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location permissions are required to fetch weather and daylight data."
      );
      throw new Error("Location permission not granted");
    }
    const currentLocation = await Location.getCurrentPositionAsync({});
    return {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    };
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error;
  }
};
