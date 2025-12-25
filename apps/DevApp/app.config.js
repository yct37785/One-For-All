import withBaseConfig from '../../templates/app.config.base.js';

export default ({ config }) =>
  withBaseConfig({
    config: {
      ...config,
      expo: {
        name: "DevApp",
        slug: "devapp",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        newArchEnabled: true,
        splash: {
          image: "./assets/splash-icon.png",
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        },
        ios: {
          supportsTablet: true
        },
        android: {
          adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff"
          },
          edgeToEdgeEnabled: true,
          predictiveBackGestureEnabled: false,
          package: "com.anonymous.devapp"
        },
        web: {
          favicon: "./assets/favicon.png"
        }
      },
    },
  });