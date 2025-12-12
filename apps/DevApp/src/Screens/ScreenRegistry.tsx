import { Nav } from 'framework';
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
  ui_box: 'ui_box',
  ui_collapsibles: 'ui_collapsibles',
  ui_tabs: 'ui_tabs',
  ui_avatar: 'ui_avatar',
  ui_chip: 'ui_chip',
  ui_list: 'ui_list',
  ui_decorators: 'ui_decorators',
  ui_input: 'ui_input',
  ui_buttons: 'ui_buttons',
  ui_touchable: 'ui_touchable',
  ui_layouts: 'ui_layouts',
  ui_menulist: 'ui_menulist',
  ui_modals: 'ui_modals',
  ui_nestedOptions: 'ui_nestedOptions',
  ui_selections: 'ui_selections',
  ui_icon: 'ui_icon',
  ui_text: 'ui_text',
  ui_textVariants: 'ui_textVariants',
  f_localData: 'f_localData',
} as const;

/******************************************************************************************************************
 * Screen registry (except HomeScreen)
 ******************************************************************************************************************/
export const screenRegistry: Nav.NavNodeMap = {
  [screenRoutes.testbed]: { component: TestbedScreen },
  [screenRoutes.ui_box]: { component: BoxScreen },
  [screenRoutes.ui_collapsibles]: { component: CollapsiblesScreen },
  [screenRoutes.ui_tabs]: { component: TabsScreen },
  [screenRoutes.ui_avatar]: { component: AvatarScreen },
  [screenRoutes.ui_chip]: { component: ChipScreen },
  [screenRoutes.ui_list]: { component: ListScreen },
  [screenRoutes.ui_decorators]: { component: DecoratorsScreen },
  [screenRoutes.ui_input]: { component: InputScreen },
  [screenRoutes.ui_buttons]: { component: ButtonsScreen },
  [screenRoutes.ui_touchable]: { component: TouchableScreen },
  [screenRoutes.ui_layouts]: { component: LayoutsScreen },
  [screenRoutes.ui_menulist]: { component: MenuListScreen },
  [screenRoutes.ui_modals]: { component: ModalsScreen },
  [screenRoutes.ui_nestedOptions]: { component: NestedOptionsScreen },
  [screenRoutes.ui_selections]: { component: SelectionsScreen },
  [screenRoutes.ui_icon]: { component: IconScreen },
  [screenRoutes.ui_text]: { component: TextScreen },
  [screenRoutes.ui_textVariants]: { component: TextVariantsScreen },
  [screenRoutes.f_localData]: { component: LocalDataManagerScreen },
};

// test nested navigator navNodeMap
export const uiStackNodeMap: Nav.NavNodeMap = {
  'nested_box': { component: BoxScreen },
  'nested_collapsibles': { component: CollapsiblesScreen  },
  'nested_tabs': { component: TabsScreen },
};