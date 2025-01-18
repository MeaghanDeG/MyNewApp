import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { Asset } from "expo-asset"; // Import Asset from Expo
import CustomSplashScreen from "@/components/CustomSplashScreen";
import theme from "@/theme";

// Import Screens
import HomeScreen from "@/screens/HomeScreen";
import InfoTabScreen from "@/screens/InfoTabScreen";
import FiveDayScreen from "@/screens/FiveDayScreen";
import ScheduleScreen from "@/screens/ScheduleScreen";

const Tab = createBottomTabNavigator();

// Define Icon Names
type IconNames = "home" | "info-circle" | "calendar" | "marker";

export default function Layout() {
  const [isAppReady, setAppReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Preload assets, including splash-animated.gif
        await Asset.loadAsync(require("@/assets/images/splash-animated.gif"));

        // Simulate additional resource loading if needed
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setAppReady(true);
      } catch (e) {
        console.error("Error loading resources:", e);
      }
    };

    loadResources();
  }, []);

  if (!isAppReady) {
    return <CustomSplashScreen onFinish={() => setAppReady(true)} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <Tab.Navigator
          screenOptions={({ route }) => {
            let iconName: IconNames = "home"; // Default icon

            // Map route names to FontAwesome icons
            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Info":
                iconName = "info-circle";
                break;
              case "FiveDay":
                iconName = "marker"; 
                break;
              case "Schedule":
                iconName = "calendar";
                break;
              default:
                break;
            }

            return {
              tabBarIcon: ({ color, size }) => (
                <FontAwesome icon={iconName} size={size} color={color} />
              ),
              headerShown: false,
              tabBarActiveTintColor: theme.colors.primaryText,
              tabBarInactiveTintColor: theme.colors.secondaryText,
              tabBarStyle: {
                backgroundColor: theme.colors.background,
                borderTopColor: theme.colors.border,
              },
            };
          }}
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
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.large,
  },
  floatingButton: {
    position: "absolute",
    top: theme.spacing.large, // Adjust position to avoid overlapping tabs
    right: theme.spacing.large,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.medium,
    shadowColor: theme.colors.border,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
