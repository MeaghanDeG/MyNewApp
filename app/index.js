import React from "react"; // ✅ Fixed
import { View, Text } from "react-native";
import "expo-router/entry";

export default function Home() {
  return (
    <View>
      <Text>Welcome to My App!</Text>
    </View>
  );
}
