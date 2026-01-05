import { Nav } from 'framework';
import { funcScreenRoutes } from './FuncRegistry';
import LocalKVStoreManagerScreen from './LocalKVStoreManagerScreen';
import FuncScreen from './FuncScreen';

/******************************************************************************************************************
 * Screen registry
 ******************************************************************************************************************/
export const funcScreenRegistry: Nav.NavNodeMap = {
  [funcScreenRoutes.localKVStoreManager]: { component: LocalKVStoreManagerScreen },
  [funcScreenRoutes.home]: { component: FuncScreen },
};

/******************************************************************************************************************
 * Navigator
 ******************************************************************************************************************/
export const FuncStackNavigator: React.FC = () => (
  <Nav.StackNavigator
    initialRouteName={funcScreenRoutes.home}
    navNodeMap={funcScreenRegistry}
  />
);
