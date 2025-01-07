import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Image } from "react-native";
import splashAnimated from "../assets/images/splash-animated.gif"; // ✅ Updated path and name

export default function AnimatedSplashScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    });

    animation.start(() => {
      const timeoutId = setTimeout(onFinish, 1000);
      return () => clearTimeout(timeoutId);
    });
  }, [fadeAnim, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image source={splashAnimated} style={styles.logo} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#FFF8E1",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
