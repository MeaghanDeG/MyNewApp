import React, { useRef, useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import FAQ from "@/screens/FAQ";
import Info from "@/screens/info";
import Resources from "@/screens/resources";
import QuestionAnswer from "@/screens/questionAnswer";

export default function InfoTabScreen() {
  const scrollViewRef = useRef<ScrollView>(null);

  // Section refs
  const questionRef = useRef<View>(null);
  const faqRef = useRef<View>(null);
  const infoRef = useRef<View>(null);
  const resourcesRef = useRef<View>(null);

  const [activeTab, setActiveTab] = useState("Question"); // Tracks which tab is active

  // Scroll to specific section
  const scrollToSection = (ref: React.RefObject<View>) => {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      scrollViewRef.current?.scrollTo({ y: pageY - 150, animated: true }); // Adjust offset for header height
    });
  };

  // Update active tab based on scroll position
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY < 400) {
      setActiveTab("Question");
    } else if (offsetY >= 400 && offsetY < 800) {
      setActiveTab("FAQ");
    } else if (offsetY >= 800 && offsetY < 1200) {
      setActiveTab("Info");
    } else {
      setActiveTab("Resources");
    }
  };

  return (
    <View style={styles.container}>
      {/* Permanent Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}></Text>
      </View>

      {/* Sticky Tabs */}
      <View style={styles.stickyTabs}>
        <TouchableOpacity
          onPress={() => scrollToSection(questionRef)}
          style={[styles.tab, activeTab === "Question" && styles.activeTab]}
        >
          <Text
            style={[styles.tabText, activeTab === "Question" && styles.activeTabText]}
          >
            Question
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => scrollToSection(faqRef)}
          style={[styles.tab, activeTab === "FAQ" && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === "FAQ" && styles.activeTabText]}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => scrollToSection(infoRef)}
          style={[styles.tab, activeTab === "Info" && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === "Info" && styles.activeTabText]}>
            Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => scrollToSection(resourcesRef)}
          style={[styles.tab, activeTab === "Resources" && styles.activeTab]}
        >
          <Text
            style={[styles.tabText, activeTab === "Resources" && styles.activeTabText]}
          >
            Resources
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Question Section */}
        <View ref={questionRef} style={[styles.section, styles.sectionBuffer]}>
          <QuestionAnswer />
        </View>

        {/* FAQ Section */}
        <View ref={faqRef} style={[styles.section, styles.sectionBuffer]}>
          <FAQ />
        </View>

        {/* Info Section */}
        <View ref={infoRef} style={[styles.section, styles.sectionBuffer]}>
          <Info />
        </View>

        {/* Resources Section */}
        <View ref={resourcesRef} style={[styles.section, styles.sectionBuffer]}>
          <Resources />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#007BFF",
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  stickyTabs: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensure it stays on top of content
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#007BFF",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  activeTabText: {
    color: "#fff",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    padding: 20,
    minHeight: Dimensions.get("window").height - 200, // Adjust for header + tabs height
  },
  sectionBuffer: {
    marginTop: 20, // Adds a buffer at the top of each section
    backgroundColor: "#f9f9f9", // Adds light background to match screens
  },
});
