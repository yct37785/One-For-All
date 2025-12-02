import { Screen } from 'framework';
// test bed
import TestbedScreen from './TestbedScreen';
// container
import BoxScreen from './Container/BoxScreen';
import CollapsiblesScreen from './Container/CollapsiblesScreen';
import TabsScreen from './Container/TabsScreen';
// data
import ListScreen from './Data/ListScreen';
// input
import InputScreen from './Input/InputScreen';
// interactive
import InteractivesScreen from './Interactive/InteractivesScreen';
// layout
import LayoutsScreen from './Layout/LayoutsScreen';
// menu
import MenuListScreen from './Menu/MenuListScreen';
// misc
import MiscScreen from './Misc/MiscScreen';
// modal
import ModalsScreen from './Modal/ModalsScreen';
// options
import OptionsScreen from './Options/OptionsScreen';
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
  list: 'list',
  input: 'input',
  interactives: 'interactives',
  layouts: 'layouts',
  menulist: 'menulist',
  misc: 'misc',
  modals: 'modals',
  options: 'options',
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
  [screenRoutes.list]: ListScreen,
  [screenRoutes.input]: InputScreen,
  [screenRoutes.interactives]: InteractivesScreen,
  [screenRoutes.layouts]: LayoutsScreen,
  [screenRoutes.menulist]: MenuListScreen,
  [screenRoutes.misc]: MiscScreen,
  [screenRoutes.modals]: ModalsScreen,
  [screenRoutes.options]: OptionsScreen,
  [screenRoutes.selections]: SelectionsScreen,
  [screenRoutes.text]: TextScreen,
  [screenRoutes.visuals]: VisualsScreen,
};
