import React from "react";
import { Text as DefaultText, View as DefaultView, StyleSheet } from "react-native";
import theme from "@/theme"; // Import the theme
import { useColorScheme } from "react-native";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof theme.colors
) {
  const colorScheme = useColorScheme() ?? "light";
  const colorFromProps = props[colorScheme];
  const themeColors = theme.colors;

  return colorFromProps ?? themeColors[colorName];
}

export const ThemedText = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: {
  style?: any;
  lightColor?: string;
  darkColor?: string;
  [key: string]: any;
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export const ThemedView = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: {
  style?: any;
  lightColor?: string;
  darkColor?: string;
  [key: string]: any;
}) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};

const Themed = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>This is a themed component</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
  },
});

export default Themed;
