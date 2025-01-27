import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the static splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

type CustomSplashScreenProps = {
  onFinish: () => void;
};

const CustomSplashScreen = ({ onFinish }: CustomSplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync(); // Hide static splash screen
      onFinish(); // Notify the splash is complete
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash-animated.gif')} // Replace with your GIF/image
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default CustomSplashScreen; // Use default export
