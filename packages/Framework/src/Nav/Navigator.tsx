import React, { memo } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextProps } from '../UI/Text/Text';
import { IconProps } from '../UI/Text/Icon';
import { ScreenType } from './Screen';

const Stack = createNativeStackNavigator<ParamListBase>();
const Tabs = createBottomTabNavigator<ParamListBase>();

/******************************************************************************************************************
 * NavNodeItem
 *
 * A single route entry in the nav map.
 *
 * Notes:
 * - `component` is required for both StackNavigator and BottomTabsNavigator.
 * - `label` / `labelOpts` / `icon` / `iconOpts` / `disabled` are tab-bar concerns.
 *
 * @property component    - ScreenType or preconfigured nested navigator
 * @property label?       - Tab label
 * @property labelOpts?   - Tab label styling overrides
 * @property icon?        - Tab icon source
 * @property iconOpts?    - Tab icon styling overrides
 * @property disabled?    - Disable interaction (tab bar)
 ******************************************************************************************************************/
export type NavNodeItem = {
  component: ScreenType<any> | React.FC;
  label?: string;
  labelOpts?: TextProps;
  icon?: string;
  iconOpts?: IconProps;
  disabled?: boolean;
};

/******************************************************************************************************************
 * NavNodeMap
 *
 * Route registry keyed by route name.
 ******************************************************************************************************************/
export type NavNodeMap = Record<string, NavNodeItem>;

/******************************************************************************************************************
 * Navigator props.
 *
 * @property initialRouteName  - Initial route name for the navigator
 * @property navNodeMap        - Mapping of route names to node items
 * @property headerShown?      - Controls header visibility for all screens
 ******************************************************************************************************************/
export type NavigatorProps = {
  initialRouteName: string;
  navNodeMap: NavNodeMap;
  headerShown?: boolean;
};

/******************************************************************************************************************
 * Render a single NavNode (screen or nested navigator) with our standardized Screen props injected:
 * - navigate
 * - goBack
 * - param
 ******************************************************************************************************************/
function renderNavNode(
  Component: ScreenType<any> | React.FC,
  navigation: any,
  route: any
): React.ReactElement {
  // Component can be either a ScreenType or a preconfigured navigator; at runtime
  // both are just function components, so we can treat them uniformly.
  const Comp = Component as React.ComponentType<any>;

  return (
    <Comp
      // simple navigate helper exposed to screens
      navigate={(routeName: string, params?: any) =>
        navigation.navigate(routeName as never, params as never)
      }
      // goBack helper
      goBack={() => navigation.goBack()}
      // pass through route params
      param={route?.params}
    />
  );
}

/******************************************************************************************************************
 * StackNavigator
 *
 * Thin wrapper around React Navigation's native stack navigator:
 * - Injects `navigate`, `goBack`, and `param` props into each ScreenType
 * - Allows nested navigators by using a preconfigured navigator component as `component`
 * - Ignores tab-specific metadata (label/icon/etc)
 ******************************************************************************************************************/
export const StackNavigator: React.FC<NavigatorProps> = memo(
  ({ initialRouteName, navNodeMap, headerShown = false }) => {
    return (
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown }}
      >
        {Object.entries(navNodeMap).map(([name, item]) => (
          <Stack.Screen name={name} key={name}>
            {({ navigation, route }) =>
              renderNavNode(item.component, navigation, route)
            }
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    );
  }
);

/******************************************************************************************************************
 * BottomTabsNavigator
 *
 * Thin wrapper around React Navigation's bottom tab navigator:
 * - Uses the same NavNodeMap shape as StackNavigator
 * - Injects `navigate`, `goBack`, and `param` props into each ScreenType
 * - Allows nesting by passing a preconfigured navigator component as `component`
 *
 * Note:
 * - Tab metadata (label/icon/etc) will be used when we wire BottomTabsNavigator
 *   to BottomNavBar as a custom tab bar.
 ******************************************************************************************************************/
export const BottomTabsNavigator: React.FC<NavigatorProps> = memo(
  ({ initialRouteName, navNodeMap, headerShown = false }) => {
    return (
      <Tabs.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown }}
      >
        {Object.entries(navNodeMap).map(([name, item]) => (
          <Tabs.Screen name={name} key={name}>
            {({ navigation, route }) =>
              renderNavNode(item.component, navigation, route)
            }
          </Tabs.Screen>
        ))}
      </Tabs.Navigator>
    );
  }
);
