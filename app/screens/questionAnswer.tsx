import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Animated,
} from "react-native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { InteractiveButton } from "../components/InteractiveButton";
import theme from "@/theme";

export function QuestionAnswer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [showIntermediatePopup, setShowIntermediatePopup] = useState(false);
  const [finalPopupMessage, setFinalPopupMessage] = useState<string | null>(
    null
  );

  const intermediateAnimation = useRef(new Animated.Value(0)).current;
  const finalAnimation = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  const animatePopup = (animation: Animated.Value, visible: boolean): void => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animatePopup(intermediateAnimation, showIntermediatePopup);
  }, [showIntermediatePopup]);

  useEffect(() => {
    animatePopup(finalAnimation, showFinalPopup);
  }, [showFinalPopup]);

  type Question = {
    id: number;
    question: string;
    answers: string[];
    condition?: () => boolean;
    onSelect: (response: string) => void;
  };

  const questions: Question[] = [
    {
      id: 0,
      question: "Have you used a SAD lamp in the past?",
      answers: ["Yes", "No"],
      onSelect: (response: string) => {
        setAnswers((prev) => ({ ...prev, [0]: response }));
        if (response === "No") {
          setPopupMessage(
            "No worries! This app will get you set up with customisable tools in Settings. Enlighten yourself with our information and explore the links !"
          );
          setShowIntermediatePopup(true);
        } else {
          setCurrentQuestionIndex(1); // Proceed to Question 1
        }
      },
    },
    {
      id: 1,
      question: "How often do you use your SAD lamp?",
      answers: ["Everyday", "At Times"],
      condition: () => answers[0] === "Yes",
      onSelect: (response: string) => {
        setAnswers((prev) => ({ ...prev, [1]: response }));
        setPopupMessage(
          "Everyday use of your SAD lamp is thought to be the most beneficial"
        );
        setCurrentQuestionIndex(2);
      },
    },
    {
      id: 2,
      question: "When do you usually prefer to use a SAD lamp?",
      answers: ["Morning", "Anytime"],
      condition: () => answers[0] === "Yes",
      onSelect: (response: string) => {
        setAnswers((prev) => ({ ...prev, [2]: response }));
        setPopupMessage(
          "In the morning OR when you wake up is thought to be ideal"
        );
        setShowIntermediatePopup(true);
      },
    },
    {
      id: 4,
      question: "Are you finding your eyes sensitive to sunlight?",
      answers: ["Yes", "No"],
      onSelect: (response: string) => {
        setAnswers((prev) => ({ ...prev, [4]: response }));
        setCurrentQuestionIndex(5);
      },
    },
    {
      id: 5,
      question:
        "Have you ever been diagnosed as bipolar or having manic episodes?",
      answers: ["Yes", "No"],
      onSelect: (response: string) => {
        setAnswers((prev) => ({ ...prev, [5]: response }));
        setCurrentQuestionIndex(6);
      },
    },
    {
      id: 6,
      question:
        "Are you under the care of a physician or recently discharged from the hospital?",
      answers: ["Yes", "No"],
      onSelect: (response: string) => {
        setAnswers((prev) => ({ ...prev, [6]: response }));
        setCurrentQuestionIndex(7);
      },
    },
    {
      id: 7,
      question:
        "Are you taking any medication that makes you sensitive to sunlight or contraindicated for sunlight exposure?",
      answers: ["Yes", "No"],
      onSelect: (response: string) => {
        setAnswers((prev) => ({ ...prev, [7]: response }));
        const anyYes = [4, 5, 6, 7].some(
          (key) => answers[key] === "Yes" || response === "Yes"
        );
        setFinalPopupMessage(
          anyYes
            ? "Please explore the information carefully as using a SAD lamp might not be right for you. They don't exactly mimic sunlight, just a heads up!"
            : "Good to Go, Let's Get Started!"
        );
        setShowFinalPopup(true);
      },
    },
  ];

  const memoizedQuestions = useMemo(() => {
    return questions.filter((q) => !q.condition || q.condition());
  }, [answers]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={memoizedQuestions} // Use memoizedQuestions here
        keyExtractor={(item) => item.id.toString()}
        nestedScrollEnabled
        renderItem={({ item }) => {
          const isAnswered = answers[item.id] !== undefined;
          const isCurrent = item.id === currentQuestionIndex;

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                isAnswered && !isCurrent ? styles.answeredCard : null,
              ]}
            >
              {isAnswered && !isCurrent ? (
                <BlurView intensity={50} style={styles.blur}>
                  <Text style={styles.fadedHeading}>{item.question}</Text>
                  <Text style={styles.answerText}>
                     {answers[item.id]}
                  </Text>
                </BlurView>
              ) : (
                <>
                  <Text style={styles.heading}>{item.question}</Text>
                  <View style={styles.buttonContainer}>
                    {item.answers.map((answer) => (
                      <InteractiveButton
                        key={answer}
                        title={answer}
                        onPress={() => item.onSelect(answer)}
                      />
                    ))}
                  </View>
                </>
              )}
            </View>
          );
        }}
        contentContainerStyle={styles.scrollContainer}
      />

      {/* Intermediate Modal */}
      <Modal visible={showIntermediatePopup} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>{popupMessage}</Text>
            <InteractiveButton
              title="Continue"
              onPress={() => {
                setShowIntermediatePopup(false);
                setCurrentQuestionIndex(4);
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Final Modal */}
      <Modal visible={showFinalPopup} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>{finalPopupMessage}</Text>
            <InteractiveButton
              title="OK"
              onPress={() => {
                setShowFinalPopup(false); // Close the modal
                router.push("/info"); // Navigate to info.tsx
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    padding: theme.spacing.medium,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.spacing.small,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    shadowColor: theme.colors.border,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  answeredCard: {
    transform: [{ scale: 0.85 }],
    opacity: 0.6,
    backgroundColor: "transparent",
  },
  answerText: {
    opacity: 0.6,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.secondaryText,
    marginTop: 1,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  heading: {
    fontSize: theme.fontSizes.large,
    color: theme.colors.text,
  },
  fadedHeading: {
    fontSize: theme.fontSizes.large,
    color: theme.colors.fadedText,
  },
  message: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.large,
    borderRadius: theme.spacing.small,
  },
  popupText: {
    color: theme.colors.text,
  },
});
export default QuestionAnswer;
