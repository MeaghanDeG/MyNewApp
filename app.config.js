export default {
    expo: {
      name: "MyNewApp",
      slug: "MyNewApp",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/app-icon.png",
      scheme: "myapp",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      splash: {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.meaghandeg.MyNewApp",
         "icon": "./assets/images/app-icon.png"
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#ffffff",
        },
        package: "com.meaghandeg.MyNewApp",
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
      },
      plugins: [
        "expo-router",
        "expo-font",
      ],
      extra: {
        OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY,
      },
      experiments: {
        typedRoutes: true,
      },
    },
  };
  