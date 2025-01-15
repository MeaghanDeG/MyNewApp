// app/index.tsx
import React, { useState } from "react";
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen";
import { Redirect } from "expo-router";

export default function Index() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setIsSplashVisible(false);
  };

  // ✅ Show splash only when `isSplashVisible` is true
  if (isSplashVisible) {
    return <AnimatedSplashScreen onFinish={handleSplashFinish} />;
  }

  // ✅ Correct navigation after splash ends
  return <Redirect href="/HomeScreen" />;
}
