import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007BFF", // Active tab color
        tabBarInactiveTintColor: "#8e8e8e", // Inactive tab color
        tabBarStyle: {
          backgroundColor: "#f9f9f9", // Light background for the tab bar
          height: 60, // Adjust the height of the tab bar
        },
        tabBarLabelStyle: {
          fontSize: 12, // Adjust font size of tab labels
          paddingBottom: 5, // Padding to center labels
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />

      {/* Info Tab */}
      <Tabs.Screen
        name="InfoTabScreen"
        options={{
          title: "Info",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="info-circle" size={24} color={color} />
          ),
        }}
      />

      {/* Schedule Tab */}
      <Tabs.Screen
        name="Schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="FiveDayScreen"
        options={{
          title: "5-Day Forecast",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="sun-o" size={24} color={color} /> // Sun icon
    ),
  }}
/>

      {/* Settings Tab */}
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cog" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
