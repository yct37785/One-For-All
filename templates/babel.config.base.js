module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env', // so you can `import { API_KEY } from '@env'`
          path: '.env',
          safe: false,
          allowUndefined: true,
        },
      ],
      // must be LAST to ensure transforms run after everything else
      'react-native-reanimated/plugin'
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
