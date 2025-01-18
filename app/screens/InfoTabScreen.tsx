import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  ScrollView,
} from "react-native";
import FAQ from "@/screens/FAQ";
import Info from "@/screens/info";
import Resources from "@/screens/resources";
import QuestionAnswer from "@/screens/questionAnswer";
import theme  from "@/theme";

export function InfoTabScreen() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionName: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {[
        { name: "Question", title: "❓ Question & Answers", content: <QuestionAnswer /> },
        { name: "FAQ", title: "📚 Frequently Asked Questions", content: <FAQ /> },
        { name: "Info", title: "ℹ️ General Information", content: <Info /> },
        { name: "Resources", title: "📖 Resources & References", content: <Resources /> },
      ].map((section) => (
        <React.Fragment key={section.name}>
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection(section.name)}
            accessibilityRole="button"
            accessibilityLabel={`Toggle ${section.title}`}
            accessibilityState={{ expanded: expandedSection === section.name }}
          >
            <Text style={styles.headerText}>{section.title}</Text>
          </TouchableOpacity>
          {expandedSection === section.name && (
            <View style={styles.content}>{section.content}</View>
          )}
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
  accordionHeader: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.small,
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
  },
});

export default InfoTabScreen;

