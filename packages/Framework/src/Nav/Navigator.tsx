import React, { memo } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenType } from './Screen';

const Stack = createNativeStackNavigator<ParamListBase>();

/******************************************************************************************************************
 * NavNodeMap
 *
 * A route registry where each entry can be either:
 * - a ScreenType (leaf screen), or
 * - a preconfigured navigator component (nested navigator)
 ******************************************************************************************************************/
export type NavNodeMap = Record<string, ScreenType<any> | React.FC>;

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
 * StackNavigator
 *
 * Thin wrapper around React Navigation's native navigator:
 * - Injects `navigate`, `goBack`, and `param` props into each ScreenType
 * - Allows nested navigators by accepting React.FC values in navNodeMap
 * - Hides React Navigation types from screen implementations
 *
 * @usage
 * ```tsx
 * const navNodeMap: NavNodeMap = {
 *   home: HomeScreen,
 *   nested: NestedNavigator, // preconfigured nested navigator
 * };
 *
 * const AppNavigator: React.FC = () => (
 *   <StackNavigator
 *     initialRouteName="home"
 *     headerShown={false}
 *     navNodeMap={navNodeMap}
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
        {Object.entries(navNodeMap).map(([name, Node]) => {
          // Node can be either a ScreenType or a preconfigured navigator; at runtime
          // both are just function components, so we can treat them uniformly.
          const Component = Node as React.ComponentType<any>;

          return (
            <Stack.Screen name={name} key={name}>
              {({ navigation, route }) => (
                <Component
                  // simple navigate helper exposed to screens
                  navigate={(routeName: string, params?: any) =>
                    navigation.navigate(routeName as never, params as never)
                  }
                  // goBack helper
                  goBack={() => navigation.goBack()}
                  // pass through route params
                  param={route?.params}
                />
              )}
            </Stack.Screen>
          );
        })}
      </Stack.Navigator>
    );
  }
);
