// deps
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
// screen typing and layout
import { ScreenMap } from '../Screen/Screen';
import { ScreenLayoutProps, ScreenLayoutContext } from '../Screen/ScreenLayout';
// core
import React, { memo, useEffect, useState } from 'react';
import { View, StatusBar, Platform, LogBox } from 'react-native';
// UI
import {
  Provider as PaperProvider,
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme
} from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
// nav
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ParamListBase
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// data storage
import { useLocalData, LocalDataProvider } from '../Manager/LocalDataManager';
// Firebase
import { getApp } from '@react-native-firebase/app';
// utils
import { doLog } from '../Util/General';
import { logColors } from '../Const';

LogBox.ignoreAllLogs();

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

const Stack = createNativeStackNavigator<ParamListBase>();

/******************************************************************************************************************
 * Root component props.
 *
 * @property DEFAULT_SCREEN   - Initial route name for the stack navigator
 * @property screenMap        - Mapping of route names to screen components
 * @property defaultScreenLayoutProps   - app wide screen layout (AppBar left content etc)
 ******************************************************************************************************************/
export type RootProps = {
  DEFAULT_SCREEN: string;
  screenMap: ScreenMap;
  defaultScreenLayoutProps: ScreenLayoutProps;
};

/******************************************************************************************************************
 * RootApp
 *
 * Single gate that:
 *  1) Waits for LocalData to load and reads `isDarkMode`.
 *  2) Chooses Paper MD3 theme + adapted React Navigation theme (no custom theme).
 *  3) Mounts providers and NavigationContainer.
 *
 * NOTE:
 *  - Hooks are always called in the same order; we avoid early returns before hooks.
 *  - We gate effect work with `if (!isLoaded) return;` and gate UI via conditional JSX.
 *  - Put all providers here.
 ******************************************************************************************************************/
const RootApp: React.FC<RootProps> = ({ DEFAULT_SCREEN, screenMap, defaultScreenLayoutProps }) => {
  const { getItem } = useLocalData();
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * Load isDarkMode from storage on mount.
   */
  useEffect(() => {
    (async () => {
      const stored = await getItem<boolean>('isDarkMode');
      setIsDarkMode(!!stored);
    })();
  }, [getItem]);

  /**
   * Nav and status bar config.
   */
  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync(isDarkMode ? 'light' : 'dark');
      // optional:
      // NavigationBar.setVisibilityAsync('visible');
      // StatusBar.setBackgroundColor(navTheme.colors.background);
    }
  }, [isDarkMode]);

  /**
   * Firebase pulse check.
   */
  useEffect(() => {
    try {
      const firebaseApp = getApp();
      const { projectId } = firebaseApp.options;
      doLog('root', 'Firebase pulse check', `Loaded with projectId: ${logColors.green}${projectId}`);
    } catch (err) {
      doLog('root', 'Firebase pulse check', `NOT ready (native config missing?): ${String(err)}`);
    }
  }, []);

  // pick theme
  const paperTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
  const navTheme = isDarkMode ? NavDark : NavLight;

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <PaperProvider theme={paperTheme}>
          <MenuProvider>
            <ScreenLayoutContext.Provider value={defaultScreenLayoutProps}>
              <NavigationContainer theme={navTheme}>
                <Stack.Navigator
                  initialRouteName={DEFAULT_SCREEN}
                  screenOptions={{ headerShown: false }}
                >
                  {Object.entries(screenMap).map(([name, Component]) => (
                    <Stack.Screen name={name} key={name}>
                      {({ navigation, route }) => (
                        <Component
                          // simple navigate helper exposed to screens
                          navigate={(routeName: string, params?: any) =>
                            navigation.navigate(routeName as never, params as never)
                          }
                          // goBack helper
                          goBack={() => navigation.goBack()}
                          // pass through route params as a single `param` prop
                          param={route?.params}
                        />
                      )}
                    </Stack.Screen>
                  ))}
                </Stack.Navigator>
              </NavigationContainer>
            </ScreenLayoutContext.Provider>
          </MenuProvider>
        </PaperProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};

/******************************************************************************************************************
 * App entry: provide LocalData context around RootApp and export the wrapped app entry.
 ******************************************************************************************************************/
const AppEntry: React.FC<RootProps> = (props) => {
  return (
    <LocalDataProvider>
      <RootApp {...props} />
    </LocalDataProvider>
  );
};

export default memo(AppEntry);
