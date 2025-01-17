import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { theme } from "@/theme"; // Import your theme object

// Import Screens
import HomeScreen from "@/screens/HomeScreen";
import InfoTabScreen from "@/screens/InfoTabScreen";
import FiveDayScreen from "@/screens/FiveDayScreen";
import ScheduleScreen from "@/screens/ScheduleScreen";
import { useRouter, Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const router = useRouter();

  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../app/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

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

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = "home";
              if (route.name === "Home") iconName = "home";
              else if (route.name === "Info") iconName = "info-circle";
              else if (route.name === "FiveDay") iconName = "calendar";
              else if (route.name === "Schedule") iconName = "clock";
              return <FontAwesome name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.primaryText,
            tabBarInactiveTintColor: theme.colors.secondaryText,
            tabBarStyle: {
              backgroundColor: theme.colors.background,
              borderTopColor: theme.colors.border,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Info" component={InfoTabScreen} />
          <Tab.Screen name="FiveDay" component={FiveDayScreen} />
          <Tab.Screen name="Schedule" component={ScheduleScreen} />
        </Tab.Navigator>

        {/* Floating Settings Icon */}
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => router.push("/screens/SettingsScreen")}
        >
          <FontAwesome name="cog" size={24} color={theme.colors.primaryText} />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background, // Use background from theme
    paddingTop: theme.spacing.large, // Add large padding at the top
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background, // Use background from theme
  },
  floatingButton: {
    position: "absolute",
    bottom: theme.spacing.large,
    right: theme.spacing.large,
    backgroundColor: theme.colors.primary, // Primary button background
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.medium,
    shadowColor: theme.colors.border,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
