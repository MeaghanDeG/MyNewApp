// app/components/Themed.tsx (Fixed Default Export and Theming)
import React from "react";
import { Text as DefaultText, View as DefaultView, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { useColorScheme } from "./useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];
  return colorFromProps ?? Colors[theme][colorName];
}

export const ThemedText = ({ style, lightColor, darkColor, ...otherProps }: any) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export const ThemedView = ({ style, lightColor, darkColor, ...otherProps }: any) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");
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
    padding: 20,
    borderRadius: 10
  }
});

export default Themed;
