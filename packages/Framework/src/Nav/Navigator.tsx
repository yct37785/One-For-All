import React, { memo } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavBar, BottomNavBarItem } from './BottomNavBar';
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
 * This adapter ensures all screens and nested navigators receive a consistent API:
 * - navigate
 * - goBack
 * - param
 *
 * @param Component   - ScreenType or preconfigured navigator component to render
 * @param navigation  - React Navigation navigation object for the current route
 * @param route       - React Navigation route object (used for extracting params)
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
 * Thin wrapper around React Navigation's native stack navigator.
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
 * Converts React Navigation tab state into BottomNavBar items using NavNodeMap metadata.
 * Handles tab press events and synchronizes selection state with the navigator.
 *
 * @param state       - React Navigation tab state (routes + active index)
 * @param navigation  - React Navigation navigation object for emitting tab events
 * @param navNodeMap  - Route metadata map used to derive labels, icons, and disabled state
 ******************************************************************************************************************/
const RenderBottomNavBar: React.FC<any> = ({ state, navigation, navNodeMap }) => {
  const items: BottomNavBarItem[] = state.routes.map((route: any) => {
    const node = navNodeMap[route.name];

    return {
      value: route.name,
      text: node?.label ?? route.name,
      textOpts: node?.labelOpts,
      icon: node?.icon,
      iconOpts: node?.iconOpts,
      disabled: node?.disabled,
    };
  });

  const selectedValue = state.routes[state.index]?.name;

  function onSelect(routeName: string): void {
    const routeIndex = state.routes.findIndex((r: any) => r.name === routeName);
    const routeKey = state.routes[routeIndex]?.key;

    if (routeIndex < 0 || !routeKey) return;

    const isFocused = state.index === routeIndex;

    const event = navigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  }

  return (
    <BottomNavBar
      items={items}
      selectedValue={selectedValue}
      onSelect={onSelect}
    />
  );
};

/******************************************************************************************************************
 * Thin wrapper around React Navigation's bottom tabs navigator.
 ******************************************************************************************************************/
export const BottomTabsNavigator: React.FC<NavigatorProps> = memo(
  ({ initialRouteName, navNodeMap, headerShown = false }) => {
    return (
      <Tabs.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown }}
        tabBar={(props) => (
          <RenderBottomNavBar
            {...props}
            navNodeMap={navNodeMap}
          />
        )}
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
