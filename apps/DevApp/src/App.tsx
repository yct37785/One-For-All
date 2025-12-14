import React from 'react';
import { Root, Nav } from 'framework';
// screens
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import { screenRegistry } from './Screens/ScreenRegistry';
// layout
import { DefaultLeftContent, DefaultRightContent } from './ScreenLayout';

/******************************************************************************************************************
 * Main stack (existing behavior)
 ******************************************************************************************************************/
export const mainStackNodeMap: Nav.NavNodeMap = {
  home: { component: HomeScreen },
  ...screenRegistry,
};

const MainStackNavigator: React.FC = () => (
  <Nav.StackNavigator
    initialRouteName='home'
    navNodeMap={mainStackNodeMap}
  />
);

/******************************************************************************************************************
 * Root bottom tabs
 *
 * - Main: existing StackNavigator
 * - Two dummy tabs: reuse existing screens for now
 ******************************************************************************************************************/
export const rootTabsNodeMap: Nav.NavNodeMap = {
  // main stack
  main: {
    component: MainStackNavigator,
    label: 'Main',
    icon: 'home-variant',
  },

  // dummy tab #1 (reuse an existing page)
  explore: {
    component: mainStackNodeMap['ui_list']?.component ?? MainStackNavigator,
    label: 'Explore',
    icon: 'compass',
  },

  // settings screen
  settings: {
    component: SettingsScreen,
    label: 'Settings',
    icon: 'cog',
  },
};

const RootNavigator = (
  <Nav.BottomTabsNavigator
    initialRouteName='main'
    navNodeMap={rootTabsNodeMap}
    headerShown={false}
  />
);

/******************************************************************************************************************
 * App with default layout
 ******************************************************************************************************************/
export default function App() {
  return (
    <Root
      rootNavigator={RootNavigator}
      defaultScreenLayoutProps={{
        showTitle: true,
        LeftContent: <DefaultLeftContent />,
        RightContent: <DefaultRightContent />,
      }}
    />
  );
}
