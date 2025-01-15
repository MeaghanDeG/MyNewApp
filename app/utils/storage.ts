import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Unified Storage Keys
export const KEYS = {
  SCHEDULES: "schedules",
  CURRENT_DAY: "currentDay",
  USER_PREFERENCES: "userPreferences",
};

// ✅ Type Definitions
export type Schedule = {
  id: string;
  date: string;
  description: string;
  startTime: string;
  endTime: string;
};

interface UserPreferences {
  notificationsEnabled: boolean;
}

// ✅ Save Data to AsyncStorage
export const saveData = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving data to ${key}:`, error);
  }
};

// ✅ Load Data from AsyncStorage
export const loadData = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error loading data from ${key}:`, error);
    return null;
  }
};

// ✅ Clear All AsyncStorage Data
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
    console.log("All data cleared.");
  } catch (error) {
    console.error("Error clearing all data:", error);
  }
};

// ✅ Save a Schedule (For a Specific Date)
export const saveSchedule = async (date: string, schedule: Schedule): Promise<void> => {
  try {
    const schedules = (await loadData(KEYS.SCHEDULES)) || {};
    if (!schedules[date]) {
      schedules[date] = [];
    }
    schedules[date].push({ ...schedule, id: Date.now().toString() });
    await saveData(KEYS.SCHEDULES, schedules);
    console.log("✅ Schedule saved successfully!");
  } catch (error) {
    console.error("Error saving schedule:", error);
  }
};

// Fetch all schedules from AsyncStorage
export const fetchSchedules = async (): Promise<{ [key: string]: any[] }> => {
  try {
    const data = await AsyncStorage.getItem("schedules");
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return {};
  }
};

// ✅ Delete a Specific Schedule by ID
export const deleteSchedule = async (date: string, id: string): Promise<void> => {
  try {
    const schedules = await loadData(KEYS.SCHEDULES);
    if (schedules[date]) {
      schedules[date] = schedules[date].filter((s: Schedule) => s.id !== id);
      await saveData(KEYS.SCHEDULES, schedules);
      console.log("✅ Schedule deleted successfully!");
    }
  } catch (error) {
    console.error("Error deleting schedule:", error);
  }
};

// ✅ Save User Preferences
export const setUserPreferences = async (preferences: Partial<UserPreferences>): Promise<void> => {
  try {
    const existingPreferences = await loadData(KEYS.USER_PREFERENCES) || {};
    const updatedPreferences = { ...existingPreferences, ...preferences };
    await saveData(KEYS.USER_PREFERENCES, updatedPreferences);
  } catch (error) {
    console.error("Error saving user preferences:", error);
  }
};

// ✅ Fetch User Preferences
export const getUserPreferences = async (): Promise<UserPreferences> => {
  try {
    return (await loadData(KEYS.USER_PREFERENCES)) || { notificationsEnabled: true };
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    return { notificationsEnabled: true };
  }
};

// ✅ Exporting everything together for convenience
export default {
  saveData,
  loadData,
  clearAllData,
  saveSchedule,
  fetchSchedules,
  deleteSchedule,
  setUserPreferences,
  getUserPreferences,
  KEYS,
};
