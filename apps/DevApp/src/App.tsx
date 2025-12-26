import React from 'react';
import { Root, Nav } from 'framework';
// screens
import SettingsScreen from './Screens/SettingsScreen';
// registries
import { uiScreenRoutes, uiScreenRegistry } from './Screens/UI/UIElemRegistry';
import { funcScreenRoutes, funcScreenRegistry } from './Screens/Func/FuncRegistry';
// layout
import { DefaultLeftContent, DefaultRightContent } from './ScreenLayout';

/******************************************************************************************************************
 * Stacks
 ******************************************************************************************************************/
const UIStackNavigator: React.FC = () => (
  <Nav.StackNavigator
    initialRouteName={uiScreenRoutes.home}
    navNodeMap={uiScreenRegistry}
  />
);

const FuncStackNavigator: React.FC = () => (
  <Nav.StackNavigator
    initialRouteName={funcScreenRoutes.home}
    navNodeMap={funcScreenRegistry}
  />
);

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

  // functionality stack
  func: {
    component: FuncStackNavigator,
    label: 'Functions',
    icon: 'engine',
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
