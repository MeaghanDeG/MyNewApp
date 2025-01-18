// app/components/InteractiveButton.tsx
import React, { useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";
import * as Animatable from "react-native-animatable";
import theme  from "@/theme"; // Adjust the path to your theme file

type InteractiveButtonProps = {
  onPress: (event: GestureResponderEvent) => void; // Function triggered on press
  title: string; // Text for the button
  style?: object; // Optional custom styles
};

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  onPress,
  title,
  style,
}) => {
  const buttonRef = useRef<Animatable.View>(null); // Ref for the button animation

  const handlePress = (event: GestureResponderEvent) => {
    if (buttonRef.current) {
      buttonRef.current.animate("bounce", 300); // Trigger bounce animation
    }
    onPress(event); // Trigger the provided onPress function with the event
  };

  return (
    <Animatable.View ref={buttonRef} animation="bounceIn" duration={500}>
      <TouchableOpacity style={[styles.button, style]} onPress={handlePress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary, // Use primary color from theme
    borderRadius: theme.spacing.small,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    alignItems: "center",
    marginVertical: theme.spacing.small,
    shadowColor: theme.colors.border,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: theme.colors.primaryText, // Use primary text color from theme
    fontWeight: "bold",
    fontSize: theme.fontSizes.medium,
  },
});

export default InteractiveButton;