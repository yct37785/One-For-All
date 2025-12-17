// deps
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
// screen typing and layout
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { ScreenLayoutProps, ScreenLayoutContext } from '../Nav/ScreenLayout';
// core
import React, { memo, useEffect, useState } from 'react';
import { View, StatusBar, Platform, LogBox, StyleSheet } from 'react-native';
// theme
import { Provider as PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { MyTheme } from '../Theme/Theme.types';
import { AppThemeProvider, useAppTheme } from '../Manager/AppThemeManager';
// UI & layout
import { MenuProvider } from 'react-native-popup-menu';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
// nav
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
// data storage
import { LocalDataProvider } from '../Manager/LocalDataManager';
// Firebase
import { getApp } from '@react-native-firebase/app';
// managers
import { AppSettingsProvider, useAppSettings } from '../Manager/AppSettingsManager';
// utils
import { doLog } from '../Util/General';
import { logColors } from '../Const';

LogBox.ignoreAllLogs();
const SAFE_AREA_EDGES: Edge[] = ['left', 'right', 'bottom'];

// mode
console.log('DEV MODE:', __DEV__);

/******************************************************************************************************************
 * Navigation theme adaptation (Paper ↔ React Navigation).
 * Keep these at module scope so they’re stable across renders.
 ******************************************************************************************************************/
const { LightTheme: NavLight, DarkTheme: NavDark } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

/******************************************************************************************************************
 * PaperBridge
 *
 * - Bridges AppThemeManager -> PaperProvider.
 * - Bridges any other nav/UI providers.
 ******************************************************************************************************************/
const PaperBridge: React.FC<{
  rootNavigator: React.ReactNode;
  defaultScreenLayoutProps: ScreenLayoutProps;
  navTheme: any;
}> = ({ rootNavigator, defaultScreenLayoutProps, navTheme }) => {
  const { theme } = useAppTheme();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={navTheme}>
        <MenuProvider>
          <ScreenLayoutContext.Provider value={defaultScreenLayoutProps}>
            <SafeAreaView edges={SAFE_AREA_EDGES} style={styles.content}>
              {rootNavigator}
            </SafeAreaView>
          </ScreenLayoutContext.Provider>
        </MenuProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

/******************************************************************************************************************
 * Root component props.
 *
 * @property rootNavigator    - Root navigator component defined by the end user app
 * @property defaultScreenLayoutProps  - App wide screen layout (AppBar left content etc)
 * @property myTheme?         - Custom theme
 ******************************************************************************************************************/
export type RootProps = {
  rootNavigator: React.ReactNode;
  defaultScreenLayoutProps: ScreenLayoutProps;
  myTheme?: MyTheme;
};

/******************************************************************************************************************
 * RootApp
 *
 * Single gate that:
 *  2) Chooses Paper MD3 theme + adapted React Navigation theme (no custom theme).
 *  3) Mounts providers and NavigationContainer.
 *
 * NOTE:
 *  - Hooks are always called in the same order; we avoid early returns before hooks.
 *  - We gate effect work with `if (!isLoaded) return;` and gate UI via conditional JSX.
 *  - Put all providers here.
 ******************************************************************************************************************/
const RootApp: React.FC<RootProps> = ({ rootNavigator, defaultScreenLayoutProps, myTheme }) => {
  const { isDarkMode } = useAppSettings();
  const navTheme = isDarkMode ? NavDark : NavLight;

  /****************************************************************************************************************
   * Nav and status bar config.
   ****************************************************************************************************************/
  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync(isDarkMode ? 'light' : 'dark');
    }
  }, [isDarkMode]);

  /****************************************************************************************************************
   * Firebase pulse check.
   ****************************************************************************************************************/
  useEffect(() => {
    try {
      const firebaseApp = getApp();
      const { projectId } = firebaseApp.options;
      doLog('root', 'Firebase pulse check', `Loaded with projectId: ${logColors.green}${projectId}`);
    } catch (err) {
      doLog('root', 'Firebase pulse check', `NOT ready (native config missing?): ${String(err)}`);
    }
  }, []);

  return (
    <AppThemeProvider isDarkMode={isDarkMode} myTheme={myTheme}>
      <PaperBridge
        rootNavigator={rootNavigator}
        defaultScreenLayoutProps={defaultScreenLayoutProps}
        navTheme={navTheme}
      />
    </AppThemeProvider>
  );
};

/******************************************************************************************************************
 * App entry: provide context around RootApp and export the wrapped app entry.
 ******************************************************************************************************************/
const AppEntry: React.FC<RootProps> = (props) => {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <LocalDataProvider>
          <AppSettingsProvider>
            <RootApp {...props} />
          </AppSettingsProvider>
        </LocalDataProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};

export default memo(AppEntry);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  content: {
    flex: 1,
  }
});