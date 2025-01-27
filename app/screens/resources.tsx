import React from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import theme from "@/theme";

export default function Resources() {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(() =>
      alert("Unable to open link. Please check your connection or try again later.")
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Helpful Resources</Text>

      {/* Link 1 */}
      <TouchableOpacity
        onPress={() =>
          handleLinkPress("https://www.nimh.nih.gov/health/publications/seasonal-affective-disorder")
        }
      >
        <Text style={styles.link}>
          Seasonal Affective Disorder - National Institute for Mental Health
        </Text>
      </TouchableOpacity>

      {/* Link 2 */}
      <TouchableOpacity
        onPress={() =>
          handleLinkPress(
            "https://day-lights.com/blogs/the-brighter-side/buyers-guide-how-to-choose-a-light-therapy-lamp"
          )
        }
      >
        <Text style={styles.link}>SAD Lamp Recommendations</Text>
      </TouchableOpacity>

      {/* Link 3 */}
      <TouchableOpacity
        onPress={() =>
          handleLinkPress("https://www.bupa.co.uk/newsroom/ourviews/seasonal-affective-disorder")
        }
      >
        <Text style={styles.link}>Mental Health Tips</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background, // Light blue background
    flexGrow: 1,
    padding: theme.spacing.medium,
  },
  link: {
    fontSize: theme.fontSizes.medium,
    color: "#000000", // Explicitly set the link color to black
    textDecorationLine: "underline",
    marginBottom: theme.spacing.medium,
  },
  title: {
    color: "#000000", // Explicitly set the title color to black
    fontSize: theme.fontSizes.large,
    fontWeight: "bold",
    marginBottom: theme.spacing.large,
    textAlign: "center",
  },
});

