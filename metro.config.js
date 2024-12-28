const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    blockList: [
      /.*\/node_modules\/.*\/node_modules\/react-native\/.*/,
      /.*\/Library\/Containers\/developer\.apple\.wwdc-Release\/.*/,
    ],
  },
};
