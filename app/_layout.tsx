// app/_layout.tsx
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Import Screens (No Tabs Folder)
import HomeScreen from "@/screens/HomeScreen";
import FiveDayScreen from "@/screens/FiveDayScreen";
import ScheduleScreen from "@/screens/ScheduleScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import InfoTabScreen from "@/screens/InfoTabScreen";

SplashScreen.preventAutoHideAsync();

// ✅ Initialize Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // ✅ Load Fonts
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../app/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // ✅ Handle Font Loading
  useEffect(() => {
    if (fontError) {
      console.error("Font loading error:", fontError);
    }
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // ✅ Show Loading Screen Until Fonts Load
  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E9088" />
      </SafeAreaView>
    );
  }

  // ✅ Main App Layout Using Bottom Tabs
  return (
    <SafeAreaProvider>
           <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: string = "home";
              if (route.name === "Home") iconName = "home";
              else if (route.name === "Info") iconName = "info-circle";
              else if (route.name === "Settings") iconName = "cog";
              return <FontAwesome name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#007BFF",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Info" component={InfoTabScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}


// ✅ Styles
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
