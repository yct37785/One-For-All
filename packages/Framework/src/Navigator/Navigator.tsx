import React, { memo } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenType } from '../Screen/Screen';

const Stack = createNativeStackNavigator<ParamListBase>();

/******************************************************************************************************************
 * Navigator and screen registry:
 * - ScreenType
 * - NavigatorType
 ******************************************************************************************************************/
export type NavNodeMap = Record<string, ScreenType<any>>;

/******************************************************************************************************************
 * Navigator props.
 *
 * @property initialRouteName  - Initial route name for the stack navigator
 * @property navNodeMap        - Mapping of route names to Navigator and Screen components
 * @property headerShown?      - Controls header visibility for all screens
 ******************************************************************************************************************/
export type NavigatorProps = {
  initialRouteName: string;
  navNodeMap: NavNodeMap;
  headerShown?: boolean;
};

/******************************************************************************************************************
 * Navigator
 *
 * Thin wrapper around React Navigation's native navigator:
 * - Injects `navigate`, `goBack`, and `param` props into each Screen
 * - Hides React Navigation types from screen implementations
 *
 * Example (in end user app):
 * ```tsx
 * const AppNavigator: React.FC = () => (
 *   <Navigator
 *     initialRouteName="Home"
 *     headerShown={false}
 *     screenMap={screenMap}
 *   />
 * );
 * ```
 ******************************************************************************************************************/
export const StackNavigator: React.FC<NavigatorProps> = memo(
  ({ initialRouteName, navNodeMap, headerShown = false }) => {
    return (
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown }}
      >
        {Object.entries(navNodeMap).map(([name, Component]) => (
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
    );
  });