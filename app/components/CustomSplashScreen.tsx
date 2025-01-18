import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync(); // Prevent splash screen from auto-hiding

type CustomSplashScreenProps = {
  onFinish: () => void;
};

export default function CustomSplashScreen({ onFinish }: CustomSplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync(); // Hide the splash screen
      onFinish(); // Trigger the onFinish callback
    }, 3000); // Wait for 3 seconds

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/splash-animated.gif")} // Reference the GIF
        style={styles.image}
        resizeMode="contain" // Adjust the image scaling
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Match the splash background color
  },
  image: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
  },
});
