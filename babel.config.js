module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin", // Reanimated plugin must be standalone
      [
        "module-resolver",
        {
          alias: {
            "@": "./app", // Define the alias for your app folder
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"], // Optional extensions for resolving files
        },
      ],
    ],
  };
};
