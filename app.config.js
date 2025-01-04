export default {
  expo: {
    name: "MyNewApp",
    slug: "MyNewApp",
    entryPoint: "./node_modules/expo-router/entry.js",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true, // ✅ Removed the misplaced closing bracket
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.meaghandeg.MyNewApp"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: ["expo-router", "expo-font", "expo-asset"],
    extra: {
      OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY,
      eas: {
        projectId: "4e0779ac-183b-4dc2-897e-2c53142cd35d"
      }
    },
    experiments: {
      
      typedRoutes: true
    }
  }
};
