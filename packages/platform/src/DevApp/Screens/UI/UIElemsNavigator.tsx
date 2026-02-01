import React from 'react';
import { Nav } from '../../../Logic';
import { uiScreenRoutes } from './UIElemRegistry';
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
import FABScreen from './Interactive/FABScreen';
import TouchableScreen from './Interactive/TouchableScreen';
// layout
import LayoutsScreen from './Layout/LayoutsScreen';
// menu
import MenuListScreen from './Menu/MenuListScreen';
// modal
import DialogScreen from './Modal/DialogScreen';
import PopupScreen from './Modal/PopupScreen';
// options
import FlatOptionsScreen from './Options/FlatOptionsScreen';
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
 * Screen registry
 ******************************************************************************************************************/
const uiScreenRegistry: Nav.NavNodeMap = {
  [uiScreenRoutes.box]: { component: BoxScreen },
  [uiScreenRoutes.collapsibles]: { component: CollapsiblesScreen },
  [uiScreenRoutes.tabs]: { component: TabsScreen },
  [uiScreenRoutes.avatar]: { component: AvatarScreen },
  [uiScreenRoutes.chip]: { component: ChipScreen },
  [uiScreenRoutes.list]: { component: ListScreen },
  [uiScreenRoutes.decorators]: { component: DecoratorsScreen },
  [uiScreenRoutes.input]: { component: InputScreen },
  [uiScreenRoutes.buttons]: { component: ButtonsScreen },
  [uiScreenRoutes.fab]: { component: FABScreen },
  [uiScreenRoutes.touchable]: { component: TouchableScreen },
  [uiScreenRoutes.layouts]: { component: LayoutsScreen },
  [uiScreenRoutes.menulist]: { component: MenuListScreen },
  [uiScreenRoutes.dialog]: { component: DialogScreen },
  [uiScreenRoutes.popup]: { component: PopupScreen },
  [uiScreenRoutes.flatOptions]: { component: FlatOptionsScreen },
  [uiScreenRoutes.nestedOptions]: { component: NestedOptionsScreen },
  [uiScreenRoutes.selections]: { component: SelectionsScreen },
  [uiScreenRoutes.icon]: { component: IconScreen },
  [uiScreenRoutes.text]: { component: TextScreen },
  [uiScreenRoutes.textVariants]: { component: TextVariantsScreen },
  [uiScreenRoutes.home]: { component: UIElemsScreen },
};

/******************************************************************************************************************
 * Navigator
 ******************************************************************************************************************/
export const UIStackNavigator: React.FC = () => (
  <Nav.StackNavigator
    initialRouteName={uiScreenRoutes.home}
    navNodeMap={uiScreenRegistry}
  />
);
