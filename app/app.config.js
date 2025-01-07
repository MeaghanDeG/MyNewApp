export default {
  expo: {
    name: "MyNewApp",
    slug: "MyNewApp",
    
    version: "1.0.0",
    icon: "./app/assets/images/icon.png", // ✅ Ensure this path is correct
    orientation: "portrait",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true, // ✅ Using the New Architecture (Hermes enabled)
    
    ios: {
      supportsTablet: true, // ✅ Keep this if you support tablets
      bundleIdentifier: "com.meaghandeg.MyNewApp",
      icon: "./app/assets/images/icon.png",  // ✅ Explicitly adding icon for iOS
    },

    // ✅ Removed Android settings as you are only targeting iOS

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png", // ✅ Verify path
    },

    // ✅ Plugins for Expo Router and Fonts (No EAS Plugins Included)
    plugins: ["expo-router", "expo-font", "expo-asset"],

    // ✅ Extra Variables for OpenWeather API Key (No EAS Project ID)
    extra: {
      OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY,
    },

    // ✅ Experimental Features (Optional)
    experiments: {
      typedRoutes: true,
    },
  },
};
