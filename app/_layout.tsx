import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import { Slot, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomSplashScreen from "@/components/CustomSplashScreen";
import theme from "@/theme";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();


export default function Layout() {
  const [isAppReady, setAppReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Preload assets, including static splash and animated GIF
        await Asset.loadAsync([
          require("@/assets/images/static-splash.jpg"),
          require("@/assets/images/splash-animated.gif"),
        ]);

        // Simulate additional resource loading if needed
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setAppReady(true);
      } catch (e) {
        console.error("Error loading resources:", e);
      }
    };

    loadResources();
  }, []);

  // Show custom splash screen until resources are loaded
  if (!isAppReady) {
    return <CustomSplashScreen onFinish={() => setAppReady(true)} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {/* Render current route content */}
        <Slot />

        {/* Floating Settings Icon */}
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => router.push("/settings")}
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
    top: theme.spacing.large,
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
