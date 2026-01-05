import { Nav } from 'framework';
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
import DialogScreen from './Modal/DialogScreen';
import PopupScreen from './Modal/PopupScreen';
// options
import NestedOptionsScreen from './Options/NestedOptionsScreen';
// selections
import SelectionsScreen from './Selections/SelectionsScreen';
// text
import IconScreen from './Text/IconScreen';
import TextScreen from './Text/TextScreen';
import TextVariantsScreen from './Text/TextVariantsScreen';
// home
import UIElemsScreen from './UIElemsScreen';

/******************************************************************************************************************
 * Screen routes
 ******************************************************************************************************************/
export const uiScreenRoutes = {
  box: 'ui_box',
  collapsibles: 'ui_collapsibles',
  tabs: 'ui_tabs',
  avatar: 'ui_avatar',
  chip: 'ui_chip',
  list: 'ui_list',
  decorators: 'ui_decorators',
  input: 'ui_input',
  buttons: 'ui_buttons',
  touchable: 'ui_touchable',
  layouts: 'ui_layouts',
  menulist: 'ui_menulist',
  dialog: 'ui_dialog',
  popup: 'ui_popup',
  nestedOptions: 'ui_nestedOptions',
  selections: 'ui_selections',
  icon: 'ui_icon',
  text: 'ui_text',
  textVariants: 'ui_textVariants',
  home: 'ui_home'
} as const;

/******************************************************************************************************************
 * Screen registry (except home screen)
 ******************************************************************************************************************/
export const uiScreenRegistry: Nav.NavNodeMap = {
  [uiScreenRoutes.box]: { component: BoxScreen },
  [uiScreenRoutes.collapsibles]: { component: CollapsiblesScreen },
  [uiScreenRoutes.tabs]: { component: TabsScreen },
  [uiScreenRoutes.avatar]: { component: AvatarScreen },
  [uiScreenRoutes.chip]: { component: ChipScreen },
  [uiScreenRoutes.list]: { component: ListScreen },
  [uiScreenRoutes.decorators]: { component: DecoratorsScreen },
  [uiScreenRoutes.input]: { component: InputScreen },
  [uiScreenRoutes.buttons]: { component: ButtonsScreen },
  [uiScreenRoutes.touchable]: { component: TouchableScreen },
  [uiScreenRoutes.layouts]: { component: LayoutsScreen },
  [uiScreenRoutes.menulist]: { component: MenuListScreen },
  [uiScreenRoutes.dialog]: { component: DialogScreen },
  [uiScreenRoutes.popup]: { component: PopupScreen },
  [uiScreenRoutes.nestedOptions]: { component: NestedOptionsScreen },
  [uiScreenRoutes.selections]: { component: SelectionsScreen },
  [uiScreenRoutes.icon]: { component: IconScreen },
  [uiScreenRoutes.text]: { component: TextScreen },
  [uiScreenRoutes.textVariants]: { component: TextVariantsScreen },
  [uiScreenRoutes.home]: { component: UIElemsScreen },
};
