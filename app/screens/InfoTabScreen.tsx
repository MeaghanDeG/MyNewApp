// app/screens/InfoTabScreen.tsx
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

export default function InfoTabScreen() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionName: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ✅ Question Section */}
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => toggleSection("Question")}
      >
        <Text style={styles.headerText}>❓ Question & Answers</Text>
      </TouchableOpacity>
      {expandedSection === "Question" && (
        <View style={styles.content}>
          <QuestionAnswer />
        </View>
      )}

      {/* ✅ FAQ Section */}
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => toggleSection("FAQ")}
      >
        <Text style={styles.headerText}>📚 Frequently Asked Questions</Text>
      </TouchableOpacity>
      {expandedSection === "FAQ" && (
        <View style={styles.content}>
          <FAQ />
        </View>
      )}

      {/* ✅ Info Section */}
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => toggleSection("Info")}
      >
        <Text style={styles.headerText}>ℹ️ General Information</Text>
      </TouchableOpacity>
      {expandedSection === "Info" && (
        <View style={styles.content}>
          <Info />
        </View>
      )}

      {/* ✅ Resources Section */}
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => toggleSection("Resources")}
      >
        <Text style={styles.headerText}>📖 Resources & References</Text>
      </TouchableOpacity>
      {expandedSection === "Resources" && (
        <View style={styles.content}>
          <Resources />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: "#FFF8E1",
  },
  accordionHeader: {
    padding: 16,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    marginVertical: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 16,
  },
});
