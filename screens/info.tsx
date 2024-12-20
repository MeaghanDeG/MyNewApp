import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function InfoScreen() {
  console.log(styles); 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>SAD Lamps: A Guide</Text>
      <Text style={styles.paragraph}>
        Seasonal Affective Disorder (SAD) lamps are specially designed light
        therapy devices that can help manage symptoms of depression caused by
        reduced sunlight exposure during the winter months. They mimic natural
        light and are a popular solution for mild seasonal depression as they
        are easy to use, widely available, and drug-free.
      </Text>
      
      <Text style={styles.subheading}>How Do They Work?</Text>
      <Text style={styles.paragraph}>
        SAD lamps emit bright light that stimulates the production of serotonin,
        a chemical in the brain that affects mood. Regular use can help improve
        your overall well-being. They are thought to improve the sleep/wake
        cycle, also known as circadian rhythm, when used regularly and at the
        same time every day.
      </Text>
      
      <Text style={styles.subheading}>Who Shouldn't Use One?</Text>
      <Text style={styles.paragraph}>
        Always check with your doctor before beginning any treatment. Some
        medications can make you sensitive to sunlight or affect Vitamin D
        production and regulation. Eyes should be protected. If you are
        diagnosed as Bipolar, be advised that using the lamp may induce a manic
        episode.
      </Text>
      
      <Text style={styles.subheading}>Tips for Effective Use</Text>
      <Text style={styles.paragraph}>
        - Use your SAD lamp for 20–30 minutes daily in the morning.
        {"\n"}- Place it 16–24 inches away from your face.
        {"\n"}- Ensure it emits 10,000 lux of light intensity.
      </Text>
      
      <Text style={styles.footer}>
        Always consult a healthcare professional to determine if a SAD lamp is
        suitable for your needs. The lamp cannot be used as a substitute for
        daylight.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  footer: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  },
});
