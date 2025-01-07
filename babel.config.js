// babel.config.js
module.exports = function (api) {
  api.cache(true); // Caches the config for faster builds
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // ✅ Path Aliasing Setup
      [
        "module-resolver",
        {
          alias: {
            "@": "./app",  // ✅ Ensure it points to the `app` directory
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],
      // ✅ Environment Variable Support
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          allowUndefined: true,
          safe: false,
        },
      ],
    ],
  };
};
