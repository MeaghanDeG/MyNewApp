import React, { useEffect } from "react";
import { View, StyleSheet, Animated, Image } from "react-native";

export default function AnimatedSplashScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = new Animated.Value(0); // Initial opacity is 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in to opacity 1
      duration: 2000, // 2 seconds duration
      useNativeDriver: true,
    }).start(() => {
      // After animation, call the onFinish callback
      setTimeout(() => {
        onFinish();
      }, 1000); // Wait 1 second before finishing
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={require("../assets/images/splash-icon.gif")} // Animated GIF or your animation file
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8E1", // Matches the static splash screen background
  },
  logo: {
    width: 200,
    height: 200,
  },
});

