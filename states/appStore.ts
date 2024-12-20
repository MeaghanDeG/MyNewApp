import { create } from 'zustand';

// Define the structure of user preferences
interface UserPreferences {
  notificationsEnabled: boolean;
}

// Define the entire app state
interface AppState {
  currentDay: string; // State for the current day
  setCurrentDay: (day: string) => void; // Action to update the current day

  userPreferences: UserPreferences; // State for user preferences
  setUserPreferences: (preferences: Partial<UserPreferences>) => void; // Action to update preferences

  isModalVisible: boolean; // Modal visibility state
  toggleModal: () => void; // Action to toggle modal visibility
}

// Create the Zustand store
export const useAppStore = create<AppState>((set) => ({
  // Initial state for the current day
  currentDay: '',

  // Action to update the current day
  setCurrentDay: (day: string) => set({ currentDay: day }),

  // Initial state for user preferences
  userPreferences: {
    notificationsEnabled: true,
  },

  // Action to update user preferences
  setUserPreferences: (preferences: Partial<UserPreferences>) =>
    set((state) => ({
      userPreferences: {
        ...state.userPreferences,
        ...preferences,
      },
    })),

  // Initial state for modal visibility
  isModalVisible: false,

  // Action to toggle modal visibility
  toggleModal: () =>
    set((state) => ({
      isModalVisible: !state.isModalVisible,
    })),
}));
