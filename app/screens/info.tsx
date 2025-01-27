import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function WinterBluesInfo() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Understanding Winter Blues</Text>
      
      <Text style={styles.paragraph}>
        Winter Blues, also known as Seasonal Affective Disorder (SAD), is a form of depression that
        occurs mostly during the fall and winter months due to reduced sunlight exposure. Symptoms
        include lethargy, fatigue, increased appetite, social withdrawal, and lack of motivation.
        It is important to recognize these symptoms early and seek appropriate interventions to
        improve quality of life during these months.
      </Text>

      <Text style={styles.subheading}>Symptoms of Winter Blues</Text>
      <Text style={styles.paragraph}>
        - Feeling tired, depressed, or sad
        {'\n'}- Increased appetite and cravings for carbohydrates and starchy foods
        {'\n'}- Weight gain and social withdrawal
        {'\n'}- Sleeping more than usual but still feeling tired
        {'\n'}- Lack of interest in usual activities, hobbies, or social interactions
        {'\n'}- Inability to concentrate, focus, or complete tasks effectively
        {'\n'}- Reduced libido and overall disinterest in intimacy
        {'\n'}- Body aches and pains without clear physical causes
      </Text>

      <Text style={styles.subheading}>Light Therapy: A Proven Solution</Text>
      <Text style={styles.paragraph}>
        Light therapy is a simple and scientifically recognized treatment for Winter Blues. It works
        by exposing the sufferer to bright light, which helps regulate brain chemicals such as
        serotonin and melatonin. For best results, start light therapy in the early autumn before
        symptoms set in. This preventive approach ensures the therapy has maximum efficacy as the
        darker months progress.
      </Text>
      <Text style={styles.paragraph}>
        - Use a lamp emitting 10,000 lux of light intensity for optimal results
        {'\n'}- Sit 16–24 inches from the lamp for 20–30 minutes daily, preferably in the morning
        {'\n'}- Regular and consistent use is crucial for maintaining a stable mood
        {'\n'}- Avoid using blue light-only devices, as their long-term effects are not yet well-documented
      </Text>

      <Text style={styles.subheading}>Managing Side Effects</Text>
      <Text style={styles.paragraph}>
        While light therapy is generally safe, some individuals may experience eye or skin
        irritation, headaches, or sensitivity, especially those with light-colored eyes or sensitive
        skin. To minimize these side effects:
        {'\n'}- Gradually introduce light therapy, starting with five minutes a day and increasing
        over time
        {'\n'}- Consult a healthcare professional if irritation persists
        {'\n'}- Be mindful of medications that increase light sensitivity, such as certain antibiotics or acne treatments
      </Text>

      <Text style={styles.subheading}>Nutrition and Exercise</Text>
      <Text style={styles.paragraph}>
        A balanced diet and regular exercise are essential for managing Winter Blues. Individuals
        often experience carbohydrate cravings, leading to weight gain during the winter months.
        Avoid excessive consumption of starchy foods and focus on high-protein and nutrient-dense
        meals to stabilize energy levels and improve mood.
      </Text>
      <Text style={styles.paragraph}>
        Regular aerobic exercise, particularly outdoors, can amplify the antidepressant effects of
        light therapy by increasing serotonin levels. If exercising outdoors is not feasible, try
        indoor activities with sufficient lighting to replicate daylight conditions. Choose
        activities you enjoy to stay motivated, such as dancing, yoga, or group fitness classes.
        Engaging with a workout partner can further enhance commitment and provide social support.
      </Text>

      <Text style={styles.subheading}>Seasonality and Psychological Factors</Text>
      <Text style={styles.paragraph}>
        The seasonal nature of Winter Blues means that symptoms typically begin in the fall and
        subside by late winter or early spring. However, for some individuals, psychological factors
        such as the stress of returning to work or school in the fall can exacerbate symptoms. It is
        essential to address these triggers alongside biological interventions like light therapy.
      </Text>
      <Text style={styles.paragraph}>
        Consult a mental health professional to explore coping mechanisms for seasonal stressors.
        They can help identify underlying psychological challenges and provide tailored strategies
        for managing them effectively.
      </Text>

      <Text style={styles.subheading}>Consulting Professionals</Text>
      <Text style={styles.paragraph}>
        If you suspect you are experiencing Winter Blues, consult a healthcare professional for a
        proper diagnosis and personalized treatment plan. Remember, depression is not a weakness of
        character but a condition linked to changes in brain chemistry. Physicians can provide
        guidance on integrating light therapy, dietary adjustments, and exercise into your daily
        routine for a holistic approach to managing symptoms.
      </Text>
      <Text style={styles.paragraph}>
        Additionally, consider speaking with a dietitian to develop a meal plan that supports
        physical and emotional health. Combining balanced nutrition with light therapy can yield
        better outcomes for many individuals.
      </Text>

      <Text style={styles.footer}>
        This information is for educational purposes only. Always consult a healthcare provider for
        personalized advice and treatment.
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
    textAlign: 'center',
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
