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

  const handleResponse = (response: string, question: string) => {
    const content = response === "yes"
      ? `You answered "Yes" to: ${question}`
      : `You answered "No" to: ${question}`;
    setModalContent(content);
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

      {/* Questions */}
      <View style={styles.card}>
        <Text style={styles.heading}>Have you used a SAD lamp in the past?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.yesButton]}
            onPress={() =>
              handleResponse(
                "yes",
                "Have you used a SAD lamp in the past?"
              )
            }
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.noButton]}
            onPress={() =>
              handleResponse(
                "no",
                "Have you used a SAD lamp in the past?"
              )
            }
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>
          When do you usually prefer to use a SAD lamp, if ever?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.morningButton]}
            onPress={() =>
              handleResponse(
                "Morning",
                "When do you usually prefer to use a SAD lamp, if ever?"
              )
            }
          >
            <Text style={styles.buttonText}>Morning</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.otherButton]}
            onPress={() =>
              handleResponse(
                "Other",
                "When do you usually prefer to use a SAD lamp, if ever?"
              )
            }
          >
            <Text style={styles.buttonText}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Are you having any problems with your eyesight? Are you finding your
          eyes sensitive to sunlight?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.yesButton]}
            onPress={() =>
              handleResponse(
                "yes",
                "Are you having any problems with your eyesight? Are you finding your eyes sensitive to sunlight?"
              )
            }
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.noButton]}
            onPress={() =>
              handleResponse(
                "no",
                "Are you having any problems with your eyesight? Are you finding your eyes sensitive to sunlight?"
              )
            }
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Have you ever been diagnosed as bipolar or as having manic episodes?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.yesButton]}
            onPress={() =>
              handleResponse(
                "yes",
                "Have you ever been diagnosed as bipolar or as having manic episodes?"
              )
            }
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.noButton]}
            onPress={() =>
              handleResponse(
                "no",
                "Have you ever been diagnosed as bipolar or as having manic episodes?"
              )
            }
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Are you under the care of a physician or recently discharged from the
          hospital?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.yesButton]}
            onPress={() =>
              handleResponse(
                "yes",
                "Are you under the care of a physician or recently discharged from the hospital?"
              )
            }
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.noButton]}
            onPress={() =>
              handleResponse(
                "no",
                "Are you under the care of a physician or recently discharged from the hospital?"
              )
            }
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Are you taking any medication that makes you sensitive to sunlight or
          contraindicated for sunlight exposure?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.yesButton]}
            onPress={() =>
              handleResponse(
                "yes",
                "Are you taking any medication that makes you sensitive to sunlight or contraindicated for sunlight exposure?"
              )
            }
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.noButton]}
            onPress={() =>
              handleResponse(
                "no",
                "Are you taking any medication that makes you sensitive to sunlight or contraindicated for sunlight exposure?"
              )
            }
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    width: Dimensions.get("window").width * 0.9,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalCard: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    width: Dimensions.get("window").width * 0.8,
  },
  modalOverlay: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
  },
  modalText: {
    color: "#444",
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  morningButton: {
    backgroundColor: "#1E9088",
  },
  noButton: {
    backgroundColor: "#1E9088",
  },
  otherButton: {
    backgroundColor: "#1E9088",
  },
  yesButton: {
    backgroundColor: "#1E9088",
  },
});
