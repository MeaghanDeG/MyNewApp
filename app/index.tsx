import React from "react";
import { Redirect } from "expo-router";


import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync(); // Prevent static splash screen from auto-hiding




export default function Index() {
  return <Redirect href="/HomeScreen" />;
}

export { SplashScreen };