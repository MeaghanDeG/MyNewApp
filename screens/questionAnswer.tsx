import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";

export default function QuestionAnswer() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");

  const handleUsedLampResponse = (response: string) => {
    setModalContent(
      response === "yes"
        ? "Great! Here's some information to refer to, and some FAQs you might find interesting."
        : "No worries! This is a guide to help you through common questions and some information you might find interesting."
    );
    setModalVisible(true);
  };

  const handlePreferredTimeResponse = (response: string) => {
    setModalContent(
      response === "Morning"
        ? "Great! That's the ideal time to use one!"
        : "Morning is thought to be the best time, but if your schedule can't accommodate that, better than never for sure!"
    );
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Card 1: Question about SAD Lamp */}
      <View style={styles.card}>
        <Text style={styles.heading}>Have you used a SAD lamp in the past?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.yesButton]}
            onPress={() => handleUsedLampResponse("yes")}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.noButton]}
            onPress={() => handleUsedLampResponse("no")}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Card 2: Question about Preferred Time */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          What time of day do you think you'll use your SAD lamp?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.morningButton]}
            onPress={() => handlePreferredTimeResponse("Morning")}
          >
            <Text style={styles.buttonText}>Morning</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.otherButton]}
            onPress={() => handlePreferredTimeResponse("Other")}
          >
            <Text style={styles.buttonText}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginBottom: 20,
    width: Dimensions.get("window").width * 0.9,
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  yesButton: {
    backgroundColor: "#1E9088",
  },
  noButton: {
    backgroundColor: "#1E9088",
  },
  morningButton: {
    backgroundColor: "#1E9088",
  },
  otherButton: {
    backgroundColor: "#1E9088",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    width: Dimensions.get("window").width * 0.8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    color: "#444",
  },
  closeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
