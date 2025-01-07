// app/index.tsx
import React, { useState } from "react";
import AnimatedSplashScreen from "./components/AnimatedSplashScreen";
import { Redirect } from "expo-router";

export default function Index() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setIsSplashVisible(false);
  };

  if (isSplashVisible) {
    return <AnimatedSplashScreen onFinish={handleSplashFinish} />;
  }

  // Redirect to the home screen after the splash screen
  return <Redirect href="../home" />;
}
