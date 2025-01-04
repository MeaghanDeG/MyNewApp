import { getDefaultConfig } from "expo/metro-config";
import exclusionList from "metro-config/src/defaults/exclusionList";

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    blockList: exclusionList([
      /.*\/node_modules\/.*\/node_modules\/react-native\/.*/,
      /.*\/Library\/Containers\/developer\.apple\.wwdc-Release\/.*/,
      /.*\/\.expo\/.*/,
      /.*\/\.vscode\/.*/,
      /missing-asset-registry-path/, // Block the missing registry path error
    ]),
    sourceExts: [...defaultConfig.resolver.sourceExts, "ts", "tsx", "jsx", "js", "json", "svg"],
  },
  transformer: {
    ...defaultConfig.transformer,
    assetPlugins: ["expo-asset/tools/hashAssetFiles"],
    unstable_allowRequireContext: true, // ✅ Retained as it’s necessary for some Metro builds
  },
};

export default config; // ✅ Exporting as ESM
