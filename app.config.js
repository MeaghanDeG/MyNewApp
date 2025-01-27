import "dotenv/config";

export default {
  expo: {
    scheme: "mynewapp",
    name: "MyNewApp",
    slug: "mynewapp",
    version: "1.0.0",
    assetBundlePatterns: ["**/*"],
    newArchEnabled: true,
    orientation: "portrait",
    icon: "./app/assets/images/icon.png",
    splash: {
      image: "./app/assets/images/static-splash.jpg",
      resizeMode: "cover",
      backgroundColor: "#ffffff",
    },
    assets: ["./app/assets/fonts/SpaceMono-Regular.ttf"],
    plugins: ["expo-router"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.meaghandegroot.mynewapp",
    },
    extra: {
      OPENWEATHERMAP_API_KEY: "0f01e6ac2625fdfa2f971fe70b725c67"
    },
  },
};

