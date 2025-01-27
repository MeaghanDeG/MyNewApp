import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import theme from "@/theme"; // Ensure you have this imported for consistency.

const FAQ = () => {
  const faqData = [
    {
      question: "How long does it take for a SAD lamp to work?",
      answer:
        "Many people notice improvements in their mood after a few days to a week of regular use. Consistency is key, as individual responses may vary. Ensure you are using the lamp as directed, ideally in the morning for about 20–30 minutes daily. For some, it may take up to two weeks to feel significant changes. If there’s no improvement after this period, consulting a healthcare provider is recommended.",
    },
    {
      question: "Can I use a SAD lamp while doing other activities?",
      answer:
        "Yes, SAD lamps are designed to integrate seamlessly into your daily routine. You can use them while reading, working, eating breakfast, or performing other tasks. Just ensure the lamp is positioned at an appropriate distance (16–24 inches) and angled toward your face for maximum benefit. Avoid looking directly into the light to prevent eye strain.",
    },
    {
      question: "Can SAD lamps cause eye damage?",
      answer:
        "Most certified SAD lamps are UV-free and designed to be safe for the eyes when used as directed. However, improper use or prolonged exposure can cause discomfort, such as eye strain or headaches. If you experience any discomfort, reduce your session duration or consult an eye specialist. Always ensure the lamp meets safety standards and emits UV-free light.",
    },
    {
      question: "What’s the best time of year to start using a SAD lamp?",
      answer:
        "The ideal time to start using a SAD lamp is in the early fall, before symptoms of seasonal depression become severe. By beginning treatment proactively, you can mitigate the onset of fatigue, low mood, and other symptoms. Use the lamp consistently through the winter months and taper off as daylight hours naturally increase in early spring.",
    },
    {
      question: "How do I know if a SAD lamp is effective for me?",
      answer:
        "Track your mood, energy levels, and sleep patterns over the first 1–2 weeks of consistent use. Many users report feeling more alert, energetic, and positive after regular sessions. If you don’t notice improvement, try adjusting your usage schedule or duration. For persistent symptoms, consult a healthcare professional to explore alternative treatments or verify your SAD diagnosis.",
    },
    {
      question: "Do SAD lamps increase Vitamin D?",
      answer:
        "No, SAD lamps do not increase Vitamin D levels. Unlike sunlight, these lamps are designed to mimic natural light without emitting UV rays necessary for Vitamin D synthesis. If you’re concerned about Vitamin D deficiency, consider dietary sources like fortified foods, fatty fish, or supplements. Consult your doctor for appropriate testing and recommendations.",
    },
    {
      question: "Is there such a thing as too much SAD lamp light?",
      answer:
        "Yes, overexposure to SAD lamp light can lead to side effects such as headaches, irritability, eye strain, or disrupted sleep patterns. Limit usage to the recommended 20–30 minutes daily, ideally in the morning. Avoid using the lamp too late in the day, as it may interfere with your natural sleep-wake cycle. Always follow manufacturer guidelines.",
    },
    {
      question: "Do SAD lamps work on plants?",
      answer:
        "No, SAD lamps are not suitable for plants. They are designed for human use and emit light in the full spectrum to regulate mood and circadian rhythms. Plants require specific wavelengths, such as those provided by grow lights, to support photosynthesis and growth. Use a dedicated grow light for your plants.",
    },
    {
      question: "Are there any alternatives to SAD lamps?",
      answer:
        "Yes, alternatives to SAD lamps include dawn simulators, which gradually increase light intensity to mimic a natural sunrise, and spending more time outdoors during daylight hours. Other options include maintaining a regular exercise routine, practicing mindfulness or meditation, and considering cognitive behavioral therapy (CBT) tailored for seasonal affective disorder. Consult a professional to determine the best combination of treatments for you.",
    },
  ];


  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      {faqData.map((faq, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.faqItem,
            expandedIndex === index && styles.faqItemExpanded,
          ]}
          onPress={() => toggleExpand(index)}
        >
          <Text style={styles.question}>{faq.question}</Text>
          {expandedIndex === index && (
            <Text style={styles.answer}>{faq.answer}</Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.large,
    fontWeight: "bold",
    marginBottom: theme.spacing.medium,
    textAlign: "center",
  },
  faqItem: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    shadowColor: theme.colors.border,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  faqItemExpanded: {
    backgroundColor: theme.colors.cardBackground, // Slightly lighter background for expanded items
    borderColor: theme.colors.primaryText,
  },
  question: {
    color: theme.colors.primaryText,
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
  },
  answer: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.small,
    lineHeight: 22,
    marginTop: theme.spacing.small,
  },
});

export default FAQ;
