// app/states/appStore.ts (Using AsyncStorage)
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the structure of user preferences
interface UserPreferences {
  notificationsEnabled: boolean;
}

// Storage keys for easy management
const CURRENT_DAY_KEY = "currentDay";
const USER_PREFERENCES_KEY = "userPreferences";
const MODAL_VISIBILITY_KEY = "isModalVisible";

// ✅ Save Current Day
export const setCurrentDay = async (day: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(CURRENT_DAY_KEY, day);
  } catch (error) {
    console.error("Error saving current day:", error);
  }
};

// ✅ Get Current Day
export const getCurrentDay = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(CURRENT_DAY_KEY);
  } catch (error) {
    console.error("Error loading current day:", error);
    return null;
  }
};

// ✅ Save User Preferences (Partial for flexibility)
export const setUserPreferences = async (
  preferences: Partial<UserPreferences>
): Promise<void> => {
  try {
    const existingPreferences = await getUserPreferences();
    const updatedPreferences = {
      ...existingPreferences,
      ...preferences,
    };
    await AsyncStorage.setItem(
      USER_PREFERENCES_KEY,
      JSON.stringify(updatedPreferences)
    );
  } catch (error) {
    console.error("Error saving user preferences:", error);
  }
};

// ✅ Get User Preferences
export const getUserPreferences = async (): Promise<UserPreferences> => {
  try {
    const preferences = await AsyncStorage.getItem(USER_PREFERENCES_KEY);
    return preferences
      ? JSON.parse(preferences)
      : { notificationsEnabled: true }; // Default state
  } catch (error) {
    console.error("Error loading user preferences:", error);
    return { notificationsEnabled: true }; // Return default if error
  }
};

// ✅ Save Modal Visibility State
export const setModalVisibility = async (isVisible: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(MODAL_VISIBILITY_KEY, JSON.stringify(isVisible));
  } catch (error) {
    console.error("Error saving modal visibility:", error);
  }
};

// ✅ Get Modal Visibility State
export const getModalVisibility = async (): Promise<boolean> => {
  try {
    const visibility = await AsyncStorage.getItem(MODAL_VISIBILITY_KEY);
    return visibility ? JSON.parse(visibility) : false;
  } catch (error) {
    console.error("Error loading modal visibility:", error);
    return false;
  }
};
