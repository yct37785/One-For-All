import { Root, Nav } from 'framework';
// screens
import HomeScreen from './Screens/HomeScreen';
import { screenRegistry, screenRoutes, uiStackNodeMap } from './Screens/ScreenRegistry';
// layout
import { DefaultLeftContent, DefaultRightContent } from './ScreenLayout';

// test nested navigator
const UiNestedNavigator: React.FC = () => (
  <Nav.StackNavigator
    initialRouteName='nested_box'
    navNodeMap={uiStackNodeMap}
    headerShown={false}
  />
);

/******************************************************************************************************************
 * Screen setup
 ******************************************************************************************************************/
export const navNodeMap: Nav.NavNodeMap = {
  home: { component: HomeScreen },
  testNestedNav: { component: UiNestedNavigator },
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
