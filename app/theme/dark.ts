import { DarkTheme } from "@react-navigation/native";

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#121212",
    text: "#FFF",
  },
};
