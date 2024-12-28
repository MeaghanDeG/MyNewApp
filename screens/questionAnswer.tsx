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
