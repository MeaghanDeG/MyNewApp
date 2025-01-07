import AsyncStorage from "@react-native-async-storage/async-storage";

// Type definition for a Schedule
export type Schedule = {
  id?: string;         // Unique identifier (can use UUID for generation)
  date: string;        // Date in "YYYY-MM-DD" format
  description: string; // Description of the schedule
  startTime: string;   // Start time in "HH:MM" format
  endTime: string;     // End time in "HH:MM" format
};

// Key for schedules in AsyncStorage
const STORAGE_KEY = "schedules";

// General-purpose: Save any data to AsyncStorage
export const saveData = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`Data saved under key: ${key}`);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

// General-purpose: Load any data from AsyncStorage
export const loadData = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error loading data:", error);
    return null;
  }
};

// General-purpose: Clear all AsyncStorage data
export const clearData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
    console.log("All data cleared.");
  } catch (error) {
    console.error("Error clearing data:", error);
  }
};

// Save a new schedule for a specific date
export const saveSchedule = async (date: string, schedule: Schedule): Promise<void> => {
  try {
    const existingData = await loadData(STORAGE_KEY);
    const schedules = existingData || {};

    if (!schedules[date]) {
      schedules[date] = [];
    }

    schedules[date].push({ ...schedule, id: Date.now().toString() }); // Assign a unique ID
    await saveData(STORAGE_KEY, schedules);
    console.log("Schedule saved successfully.");
  } catch (error) {
    console.error("Error saving schedule:", error);
    throw error;
  }
};

// Fetch all schedules for a specific date
export const fetchSchedules = async (date: string): Promise<Schedule[]> => {
  try {
    const existingData = await loadData(STORAGE_KEY);
    const schedules = existingData || {};
    return schedules[date] || [];
  } catch (error) {
    console.error("Error fetching schedules:", error);
    throw error;
  }
};

// Update an existing schedule by its ID
export const updateSchedule = async (
  date: string,
  updatedSchedule: Schedule
): Promise<void> => {
  try {
    const existingData = await loadData(STORAGE_KEY);
    const schedules = existingData || {};

    if (schedules[date]) {
      schedules[date] = schedules[date].map((schedule: Schedule) =>
        schedule.id === updatedSchedule.id ? updatedSchedule : schedule
      );
      await saveData(STORAGE_KEY, schedules);
      console.log("Schedule updated successfully.");
    }
  } catch (error) {
    console.error("Error updating schedule:", error);
    throw error;
  }
};

// Delete a specific schedule by ID
export const deleteSchedule = async (date: string, id: string): Promise<void> => {
  try {
    const existingData = await loadData(STORAGE_KEY);
    const schedules = existingData || {};

    if (schedules[date]) {
      schedules[date] = schedules[date].filter((schedule: Schedule) => schedule.id !== id);

      if (schedules[date].length === 0) {
        delete schedules[date]; // Remove the date key if no schedules remain
      }

      await saveData(STORAGE_KEY, schedules);
      console.log("Schedule deleted successfully.");
    }
  } catch (error) {
    console.error("Error deleting schedule:", error);
    throw error;
  }
};

// Clear all schedules
export const clearSchedules = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log("All schedules cleared.");
  } catch (error) {
    console.error("Error clearing schedules:", error);
    throw error;
  }
};
