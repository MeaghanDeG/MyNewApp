import React, { useEffect } from "react";
import { initializeDatabase } from "./util/storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./tabs/home";
import ScheduleTab from "./tabs/schedule";

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    initializeDatabase(); // Initialize the SQLite database
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Schedule" component={ScheduleTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

