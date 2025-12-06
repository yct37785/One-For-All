import { Screen } from 'framework';
// test bed
import TestbedScreen from './TestbedScreen';
// container
import BoxScreen from './Container/BoxScreen';
import CollapsiblesScreen from './Container/CollapsiblesScreen';
import TabsScreen from './Container/TabsScreen';
// data
import AvatarScreen from './Data/AvatarScreen';
import ChipScreen from './Data/ChipScreen';
import ListScreen from './Data/ListScreen';
// decorators
import DecoratorsScreen from './Decorators/DecoratorsScreen';
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
import IconScreen from './Text/IconScreen';
import TextScreen from './Text/TextScreen';
import TextVariantsScreen from './Text/TextVariantsScreen';

/******************************************************************************************************************
 * Screen routes
 ******************************************************************************************************************/
export const screenRoutes = {
  testbed: 'testbed',
  box: 'box',
  collapsibles: 'collapsibles',
  tabs: 'tabs',
  avatar: 'avatar',
  chip: 'chip',
  list: 'list',
  decorators: 'decorators',
  input: 'input',
  buttons: 'buttons',
  touchable: 'touchable',
  layouts: 'layouts',
  menulist: 'menulist',
  modals: 'modals',
  nestedOptions: 'nestedOptions',
  selections: 'selections',
  icon: 'icon',
  text: 'text',
  textVariants: 'textVariants',
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
  [screenRoutes.chip]: ChipScreen,
  [screenRoutes.list]: ListScreen,
  [screenRoutes.decorators]: DecoratorsScreen,
  [screenRoutes.input]: InputScreen,
  [screenRoutes.buttons]: ButtonsScreen,
  [screenRoutes.touchable]: TouchableScreen,
  [screenRoutes.layouts]: LayoutsScreen,
  [screenRoutes.menulist]: MenuListScreen,
  [screenRoutes.modals]: ModalsScreen,
  [screenRoutes.nestedOptions]: NestedOptionsScreen,
  [screenRoutes.selections]: SelectionsScreen,
  [screenRoutes.icon]: IconScreen,
  [screenRoutes.text]: TextScreen,
  [screenRoutes.textVariants]: TextVariantsScreen,
};
