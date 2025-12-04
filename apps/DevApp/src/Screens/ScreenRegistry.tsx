import { Screen } from 'framework';
// test bed
import TestbedScreen from './TestbedScreen';
// container
import BoxScreen from './Container/BoxScreen';
import CollapsiblesScreen from './Container/CollapsiblesScreen';
import TabsScreen from './Container/TabsScreen';
// data
import AvatarScreen from './Data/AvatarScreen';
import ListScreen from './Data/ListScreen';
// input
import InputScreen from './Input/InputScreen';
// interactive
import ButtonsScreen from './Interactive/ButtonsScreen';
import TouchableScreen from './Interactive/TouchableScreen';
// layout
import LayoutsScreen from './Layout/LayoutsScreen';
// menu
import MenuListScreen from './Menu/MenuListScreen';
// modal
import ModalsScreen from './Modal/ModalsScreen';
// options
import NestedOptionsScreen from './Options/NestedOptionsScreen';
// selections
import SelectionsScreen from './Selections/SelectionsScreen';
// text
import TextScreen from './Text/TextScreen';
// visuals
import VisualsScreen from './Visuals/VisualsScreen';

/******************************************************************************************************************
 * Screen routes
 ******************************************************************************************************************/
export const screenRoutes = {
  testbed: 'testbed',
  box: 'box',
  collapsibles: 'collapsibles',
  tabs: 'tabs',
  avatar: 'avatar',
  list: 'list',
  input: 'input',
  buttons: 'buttons',
  touchable: 'touchable',
  layouts: 'layouts',
  menulist: 'menulist',
  modals: 'modals',
  nestedOptions: 'nestedOptions',
  selections: 'selections',
  text: 'text',
  visuals: 'visuals',
} as const;

/******************************************************************************************************************
 * Screen registry (except home screen)
 ******************************************************************************************************************/
export const screenRegistry: Screen.ScreenMap = {
  [screenRoutes.testbed]: TestbedScreen,
  [screenRoutes.box]: BoxScreen,
  [screenRoutes.collapsibles]: CollapsiblesScreen,
  [screenRoutes.tabs]: TabsScreen,
  [screenRoutes.avatar]: AvatarScreen,
  [screenRoutes.list]: ListScreen,
  [screenRoutes.input]: InputScreen,
  [screenRoutes.buttons]: ButtonsScreen,
  [screenRoutes.touchable]: TouchableScreen,
  [screenRoutes.layouts]: LayoutsScreen,
  [screenRoutes.menulist]: MenuListScreen,
  [screenRoutes.modals]: ModalsScreen,
  [screenRoutes.nestedOptions]: NestedOptionsScreen,
  [screenRoutes.selections]: SelectionsScreen,
  [screenRoutes.text]: TextScreen,
  [screenRoutes.visuals]: VisualsScreen,
};
