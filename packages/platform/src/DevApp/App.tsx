import React from 'react';
import { Root, Nav } from 'framework';
// screens
import TestbedScreen from './Screens/TestbedScreen';
import SettingsScreen from './Screens/SettingsScreen';
// navigators
import { UIStackNavigator } from './Screens/UI/UIElemsNavigator';
import { ServiceStackNavigator } from './Screens/Service/ServiceNavigator';
// layout
import { DefaultLeftContent, DefaultRightContent } from './ScreenLayout';

/******************************************************************************************************************
 * Root bottom tabs
 *
 * - Main: existing StackNavigator
 * - Two dummy tabs: reuse existing screens for now
 ******************************************************************************************************************/
export const rootTabsNodeMap: Nav.NavNodeMap = {
  // UI elems stack
  ui_elems: {
    component: UIStackNavigator,
    label: 'UI',
    icon: 'shape',
  },

  // service stack
  func: {
    component: ServiceStackNavigator,
    label: 'Services',
    icon: 'engine',
  },

  // test bed screen
  testbed: {
    component: TestbedScreen,
    label: 'Testbed',
    icon: 'flask',
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
    initialRouteName='ui_elems'
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
      myTheme={{
        // colorsLight: { primary: 'green' },
        // colorsDark: { primary: 'yellow' },
      }}
    />
  );
}
