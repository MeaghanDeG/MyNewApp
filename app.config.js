export default {
  expo: {
    scheme: "mynewapp", 
    name: "MyNewApp",
    slug: "mynewapp",
    version: "1.0.0",
    assetBundlePatterns: ["**/*"],
    newArchEnabled: true,
    orientation: "portrait",
    
    splash: {
      image: "./app/assets/images/static-splash.jpg",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assets: [
      "./app/assets/fonts/SpaceMono-Regular.ttf" 
    ],
    plugins: ["expo-router"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.meaghandegroot.mynewapp"
    },
    extra: {
      OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY
    }
  }
};
