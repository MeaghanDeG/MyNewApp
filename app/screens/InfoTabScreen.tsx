import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
} from "react-native";
import FAQ from "@/screens/FAQ";
import Info from "@/screens/info";
import Resources from "@/screens/resources";
import QuestionAnswer from "@/screens/questionAnswer";
import theme from "@/theme";

const InfoTabScreen = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Function to handle accordion toggle
  const toggleSection = (sectionName: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Define accordion sections */}
      {[
        { name: "Questions", title: "❓ Questions & Answers", content: <QuestionAnswer /> },
        { name: "FAQ", title: "📚 Frequently Asked Questions", content: <FAQ /> },
        { name: "Info", title: "ℹ️ General Information", content: <Info /> },
        { name: "Resources", title: "📖 Resources & References", content: <Resources /> },
      ].map((section) => (
        <React.Fragment key={section.name}>
          {/* Accordion Header */}
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection(section.name)}
          >
            <Text style={styles.headerText}>{section.title}</Text>
          </TouchableOpacity>
          {/* Accordion Content (only show if expanded) */}
          {expandedSection === section.name && (
            <View style={styles.content}>{section.content}</View>
          )}
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  accordionHeader: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.small,
    elevation: 2, // For shadow effect
  },
  headerText: {
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
    color: theme.colors.secondaryText,
  },
  content: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.medium,
    elevation: 1,
  },
});

export default InfoTabScreen;
