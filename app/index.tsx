import React, { useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, SafeAreaView } from "react-native"; // ✅ View & Text removed since they aren't used
import AnimatedSplashScreen from "../screens/AnimatedSplashScreen";

// Custom SafeAreaView styling
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    flex: 1,
    justifyContent: "center",
  },
  safeArea: {
    backgroundColor: "#FFF8E1",
    flex: 1, // Matches your app theme
  },
});

export default function Index() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setIsSplashVisible(false);
  };

  if (isSplashVisible) {
    return <AnimatedSplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {/* Expo Router Stack for navigation */}
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
