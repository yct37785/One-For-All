import { Nav } from 'framework';
import { serviceScreenRoutes } from './ServiceRegistry';
import LocalKVStoreScreen from './LocalKVStoreScreen';
import ServiceScreen from './ServiceScreen';

/******************************************************************************************************************
 * Screen registry
 ******************************************************************************************************************/
export const serviceScreenRegistry: Nav.NavNodeMap = {
  [serviceScreenRoutes.localKVStore]: { component: LocalKVStoreScreen },
  [serviceScreenRoutes.home]: { component: ServiceScreen },
};

/******************************************************************************************************************
 * Navigator
 ******************************************************************************************************************/
export const ServiceStackNavigator: React.FC = () => (
  <Nav.StackNavigator
    initialRouteName={serviceScreenRoutes.home}
    navNodeMap={serviceScreenRegistry}
  />
);
