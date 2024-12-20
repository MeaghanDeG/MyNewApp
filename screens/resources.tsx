import React from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";

export default function Resources() {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(() =>
      alert("Unable to open link. Please check your connection or try again later.")
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Helpful Resources</Text>

      <TouchableOpacity onPress={() => handleLinkPress("https://example.com/light-therapy")}>
        <Text style={styles.link}>Light Therapy Information</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLinkPress("https://example.com/sad-lamp")}>
        <Text style={styles.link}>SAD Lamp Recommendations</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLinkPress("https://example.com/mental-health")}>
        <Text style={styles.link}>Mental Health Tips</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9", // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  link: {
    fontSize: 16,
    color: "#1E90FF", // Blue link color
    textDecorationLine: "underline",
    marginBottom: 15,
  },
});
