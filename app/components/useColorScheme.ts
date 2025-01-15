// app/components/useColorScheme.ts
import { useColorScheme as _useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

// ✅ Custom Hook to Get the Color Scheme
export function useColorScheme() {
  return _useColorScheme() || "light";  // Default to light mode if none detected
}

// ✅ Custom Dark Theme
export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#121212",
    text: "#FFFFFF",
  },
};

// ✅ Custom Light Theme
export const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFF8E1",
    text: "#333333",
  },
};

export default useColorScheme;  