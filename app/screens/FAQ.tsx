import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const FAQ = () => {
  const faqData = [
    {
      question: "How long does it take for a SAD lamp to work?",
      answer:
        "Many people notice improvements in their mood after a few days to a week of regular use, but it may vary based on individual needs and consistency.",
    },
    {
      question: "Can I use a SAD lamp while doing other activities?",
      answer:
        "Yes, SAD lamps are designed to be used during activities like reading, working, or eating breakfast, as long as you’re sitting close enough.",
    },
    {
      question: "Can SAD lamps cause eye damage?",
      answer:
        "Most certified SAD lamps are UV-free and safe for the eyes when used as directed. If you experience discomfort, consult an eye doctor.",
    },
    {
      question: "What’s the best time of year to start using a SAD lamp?",
      answer:
        "It's recommended to begin using a SAD lamp in the fall, before symptoms of seasonal depression become severe, and continue through early spring.",
    },
    {
      question: "How do I know if a SAD lamp is effective for me?",
      answer:
        "Track your mood and energy levels after regular use for 1–2 weeks. If you don’t notice improvement, consider adjusting usage or consulting a professional.",
    },
    {
      question: "Do SAD lamps increase Vitamin D?",
      answer:
        "No, SAD lamps do not raise Vitamin D levels. They stimulate the circadian nervous system to regulate melatonin production but do not emit ultraviolet light used for synthesizing Vitamin D.",
    },
    {
      question: "Is there such a thing as too much SAD lamp light?",
      answer:
        "Yes, excessive exposure can cause headaches, eye strain, and sleep disruptions. Avoid using it too close to bedtime, and always follow the recommended usage guidelines.",
    },
    {
      question: "Do SAD lamps work on plants?",
      answer:
        "No, SAD lamps are not suitable for plants. They provide light for humans in the full spectrum but lack the specific wavelengths required for plant growth.",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      {faqData.map((faq, index) => (
        <View key={index} style={styles.faqItem}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  answer: {
    color: "#555",
    fontSize: 16,
    lineHeight: 22,
  },
  container: {
    backgroundColor: "#FFF8E1",
    padding: 16, // Soft yellow morning light color
  },
  faqItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  question: {
    color: "#FFA726",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8, // Sunshine-inspired orange
  },
  title: {
    color: "#333",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default FAQ;

