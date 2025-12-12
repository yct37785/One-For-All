import { Root, Nav } from 'framework';
// screens
import HomeScreen from './Screens/HomeScreen';
import { screenRegistry, screenRoutes } from './Screens/ScreenRegistry';
// layout
import { DefaultLeftContent, DefaultRightContent } from './ScreenLayout';

/******************************************************************************************************************
 * Screen setup
 ******************************************************************************************************************/
export const navNodeMap: Nav.NavNodeMap = {
  home: { component: HomeScreen },
  ...screenRegistry,
};

const RootNavigator = (
  <Nav.StackNavigator
    initialRouteName='home'
    navNodeMap={navNodeMap}
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
        showTitle: true, // screens can set true to show title
        LeftContent: <DefaultLeftContent />,
        RightContent: <DefaultRightContent />
      }}
    />
  );
}
