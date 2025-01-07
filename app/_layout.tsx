// app/_layout.tsx
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

// Custom Hooks and Themes
import { useColorScheme } from "../app/components/useColorScheme";
import { CustomDarkTheme, CustomLightTheme } from "../app/theme";

// ✅ Prevent splash screen from hiding before assets load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // ✅ Load Fonts
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // ✅ Log font errors
  useEffect(() => {
    if (fontError) {
      console.error("Font loading error:", fontError);
    }
  }, [fontError]);

  // ✅ Hide splash screen after fonts load
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // ✅ Show a loading indicator while fonts are loading
  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E9088" />
      </SafeAreaView>
    );
  }

  // ✅ Main App Layout with Stack Navigator and Theming
  return (
    <SafeAreaProvider>
      <ThemeProvider
        value={colorScheme === "dark" ? CustomDarkTheme : CustomLightTheme}
      >
        <SafeAreaView style={styles.safeArea}>
          <Stack
            screenOptions={{
              headerShown: true, // ✅ Combined from both versions
            }}
          />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8E1",
  },
});
