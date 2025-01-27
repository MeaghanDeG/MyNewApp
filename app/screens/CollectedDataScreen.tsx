import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { loadData } from "@/utils/storage";

const CollectedDataScreen = () => {
  const [collectedData, setCollectedData] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    const fetchCollectedData = async () => {
      const data = await loadData("schedules");
      setCollectedData(data || {}); // Ensure collectedData is an object
    };

    fetchCollectedData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Collected Data</Text>
      {Object.keys(collectedData).length > 0 ? (
        Object.entries(collectedData).map(([date, schedules]) => (
          <View key={date} style={styles.card}>
            <Text style={styles.cardText}>Date: {date}</Text>
            {schedules.map((schedule, index) => (
              <View key={index} style={styles.scheduleItem}>
                <Text style={styles.cardText}>
                  {schedule.startTime} - {schedule.endTime}: {schedule.description}
                </Text>
              </View>
            ))}
          </View>
        ))
      ) : (
        <Text>No data collected yet.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  scheduleItem: {
    marginTop: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: "#007bff",
  },
});

export default CollectedDataScreen;
