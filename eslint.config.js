import globals from "globals";
import pluginJs from "@eslint/js";
import * as tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactNative from "eslint-plugin-react-native";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,  // ✅ Fixed parser definition here
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        jest: true,
      },
    },
    plugins: {
      react: pluginReact,
      "react-native": pluginReactNative,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "react-native/no-color-literals": "off",
      "react-native/no-inline-styles": "off",
      "react-native/no-unused-styles": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
    },
  },

  // ✅ JavaScript Rules
  {
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },

  // ✅ TypeScript Rules (Corrected without arrays)
  {
    languageOptions: {
      parser: tseslint.parser,  // ✅ Fixed parser definition here
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // ✅ React Rules (Flattened)
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
    },
  },

  // ✅ React Native Rules (Flattened)
  {
    rules: {
      ...pluginReactNative.configs.all.rules,
    },
  },
];
