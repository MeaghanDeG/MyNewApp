import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";

// Prevent the static splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

type CustomSplashScreenProps = {
  onFinish: () => void;
};

export default function CustomSplashScreen({ onFinish }: CustomSplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync(); // Hide static splash screen
      onFinish(); // Signal that the splash screen is complete
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/splash-animated.gif")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Match your static splash screen's background color
  },
  image: {
    width: 200,
    height: 200,
  },
});
