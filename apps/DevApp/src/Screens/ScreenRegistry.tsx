import { Screen } from 'framework';
// test bed
import TestbedScreen from './TestbedScreen';
/**
 * UI
 */
// container
import BoxScreen from './UI/Container/BoxScreen';
import CollapsiblesScreen from './UI/Container/CollapsiblesScreen';
import TabsScreen from './UI/Container/TabsScreen';
// data
import AvatarScreen from './UI/Data/AvatarScreen';
import ChipScreen from './UI/Data/ChipScreen';
import ListScreen from './UI/Data/ListScreen';
// decorators
import DecoratorsScreen from './UI/Decorators/DecoratorsScreen';
// input
import InputScreen from './UI/Input/InputScreen';
// interactive
import ButtonsScreen from './UI/Interactive/ButtonsScreen';
import TouchableScreen from './UI/Interactive/TouchableScreen';
// layout
import LayoutsScreen from './UI/Layout/LayoutsScreen';
// menu
import MenuListScreen from './UI/Menu/MenuListScreen';
// modal
import ModalsScreen from './UI/Modal/ModalsScreen';
// options
import NestedOptionsScreen from './UI/Options/NestedOptionsScreen';
// selections
import SelectionsScreen from './UI/Selections/SelectionsScreen';
// text
import IconScreen from './UI/Text/IconScreen';
import TextScreen from './UI/Text/TextScreen';
import TextVariantsScreen from './UI/Text/TextVariantsScreen';
/**
 * Functionality
 */
import LocalDataManagerScreen from './Functionality/LocalDataManagerScreen';

/******************************************************************************************************************
 * Screen routes
 ******************************************************************************************************************/
export const screenRoutes = {
  testbed: 'testbed',
  ui_box: 'box',
  ui_collapsibles: 'collapsibles',
  ui_tabs: 'tabs',
  ui_avatar: 'avatar',
  ui_chip: 'chip',
  ui_list: 'list',
  ui_decorators: 'decorators',
  ui_input: 'input',
  ui_buttons: 'buttons',
  ui_touchable: 'touchable',
  ui_layouts: 'layouts',
  ui_menulist: 'menulist',
  ui_modals: 'modals',
  ui_nestedOptions: 'nestedOptions',
  ui_selections: 'selections',
  ui_icon: 'icon',
  ui_text: 'text',
  ui_textVariants: 'textVariants',
  f_localData: 'localData',
} as const;

/******************************************************************************************************************
 * Screen registry (except home screen)
 ******************************************************************************************************************/
export const screenRegistry: Screen.ScreenMap = {
  [screenRoutes.testbed]: TestbedScreen,
  [screenRoutes.ui_box]: BoxScreen,
  [screenRoutes.ui_collapsibles]: CollapsiblesScreen,
  [screenRoutes.ui_tabs]: TabsScreen,
  [screenRoutes.ui_avatar]: AvatarScreen,
  [screenRoutes.ui_chip]: ChipScreen,
  [screenRoutes.ui_list]: ListScreen,
  [screenRoutes.ui_decorators]: DecoratorsScreen,
  [screenRoutes.ui_input]: InputScreen,
  [screenRoutes.ui_buttons]: ButtonsScreen,
  [screenRoutes.ui_touchable]: TouchableScreen,
  [screenRoutes.ui_layouts]: LayoutsScreen,
  [screenRoutes.ui_menulist]: MenuListScreen,
  [screenRoutes.ui_modals]: ModalsScreen,
  [screenRoutes.ui_nestedOptions]: NestedOptionsScreen,
  [screenRoutes.ui_selections]: SelectionsScreen,
  [screenRoutes.ui_icon]: IconScreen,
  [screenRoutes.ui_text]: TextScreen,
  [screenRoutes.ui_textVariants]: TextVariantsScreen,
  [screenRoutes.f_localData]: LocalDataManagerScreen,
};
