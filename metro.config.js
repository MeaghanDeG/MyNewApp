const { getDefaultConfig } = require("@expo/metro-config");  
const exclusionList = require("metro-config/src/defaults/exclusionList");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    blockList: exclusionList([
      /.*\/node_modules\/.*\/node_modules\/react-native\/.*/,
      /.*\/Library\/Containers\/developer\.apple\.wwdc-Release\/.*/,
      /.*\/\.expo\/.*/,
      /.*\/\.vscode\/.*/,
      /missing-asset-registry-path/,
    ]),
    sourceExts: [...defaultConfig.resolver.sourceExts, "ts", "tsx", "jsx", "js", "json", "svg"],
  },
  transformer: {
    ...defaultConfig.transformer,
    assetPlugins: ["expo-asset/tools/hashAssetFiles"],
    unstable_allowRequireContext: true,
  },
  watchFolders: [], // Prevents extra directories from being watched
  server: {
    useGlobalHotkey: false,  // Disables global hotkey watching
  },
  reporter: {
    update: () => {}, // Suppresses unnecessary logs and warnings
  }
};