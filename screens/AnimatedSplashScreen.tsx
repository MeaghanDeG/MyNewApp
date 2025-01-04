import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Image } from "react-native";

export default function AnimatedSplashScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // ✅ Correct useRef for persistence

  useEffect(() => {
    const animation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    });

    // Start animation and run onFinish after delay
    animation.start(() => {
      const timeoutId = setTimeout(() => {
        onFinish();
      }, 1000); // ✅ Delayed completion by 1 second

      // Cleanup timeout when component unmounts
      return () => clearTimeout(timeoutId);
    });
  }, [fadeAnim, onFinish]); // ✅ Cleaned up dependency array

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={require("../assets/images/splash-icon.gif")} 
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    flex: 1,
    justifyContent: "center", 
  },
  logo: {
    height: 200,
    width: 200,
  },
});
