// app/components/AnimatedSplashScreen.tsx
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

// ✅ Ensure this path matches your project structure
import splashImage from "@/assets/images/splash-animated.gif";

type AnimatedSplashScreenProps = {
  onFinish: () => void;
};

const AnimatedSplashScreen = ({ onFinish }: AnimatedSplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Hides splash screen after a delay
    }, 3000); // ✅ Adjust delay as needed
    return () => clearTimeout(timer); 
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", 
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default AnimatedSplashScreen;

