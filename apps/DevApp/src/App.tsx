import { Root, Screen, Navigator } from 'framework';
// screens
import HomeScreen from './Screens/HomeScreen';
import { screenRegistry } from './Screens/ScreenRegistry';
// layout
import { DefaultLeftContent, DefaultRightContent } from './ScreenLayout';

/******************************************************************************************************************
 * Screen setup
 ******************************************************************************************************************/
export const screenMap: Screen.ScreenMap = {
  home: HomeScreen,
  ...screenRegistry,
};

const RootNavigator = (
  <Navigator
    initialRouteName='home'
    screenMap={screenMap}
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
