import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"; // To control the static splash screen
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screens/HomeScreen";
import FiveDayScreen from "@/screens/FiveDayScreen";
import CollectedDataScreen from "@/screens/CollectedDataScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import ScheduleScreen from "@/screens/ScheduleScreen";
import InfoTabScreen from "@/screens/InfoTabScreen";
import CustomSplashScreen from "@/components/CustomSplashScreen";
import { Ionicons } from "@expo/vector-icons";

// Navigation setup
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ✅ Tabs (Bottom Navigation)
const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case "Home":
            iconName = "home-outline";
            break;
          case "Forecast":
            iconName = "cloud-outline";
            break;
          case "Schedule":
            iconName = "calendar-outline";
            break;
          case "Info":
            iconName = "information-circle-outline";
            break;
          case "Settings":
            iconName = "settings-outline";
            break;
          default:
            iconName = "help-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#006a55",
      tabBarInactiveTintColor: "#002740",
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Forecast" component={FiveDayScreen} />
    <Tab.Screen name="Schedule" component={ScheduleScreen} />
    <Tab.Screen name="Info Section" component={InfoTabScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

// ✅ Main Navigation Stack
const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="MainTabs"
      component={Tabs}
      options={{ headerShown: false }} // Hide headers for tabs
    />
    <Stack.Screen name="CollectedDataScreen" component={CollectedDataScreen} />
  </Stack.Navigator>
);

// ✅ App Layout with Splash Screen and Font Loading
const AppLayout = () => {
  const [isSplashComplete, setSplashComplete] = useState(false);

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "SpaceMono-Regular": require("./assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    // Prevent static splash screen from hiding until fonts are ready
    const prepareSplashScreen = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    prepareSplashScreen();
  }, []);

  useEffect(() => {
    // Hide splash screen once everything is ready
    if (fontsLoaded && isSplashComplete) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isSplashComplete]);

  // Show the custom splash screen while preparing the app
  if (!fontsLoaded || !isSplashComplete) {
    return <CustomSplashScreen onFinish={() => setSplashComplete(true)} />;
  }

  // Return the main navigation once ready
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
      <MainStack /> {/* Main Navigation */}
    </>
  );
};

export default AppLayout;
