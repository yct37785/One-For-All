import { Nav } from 'framework';
// container
import LocalDataManagerScreen from './LocalDataManagerScreen';
import FuncScreen from './FuncScreen';

/******************************************************************************************************************
 * Screen routes
 ******************************************************************************************************************/
export const funcScreenRoutes = {
  localDataManager: 'func_local_data',
  home: 'func_home'
} as const;

/******************************************************************************************************************
 * Screen registry (except home screen)
 ******************************************************************************************************************/
export const funcScreenRegistry: Nav.NavNodeMap = {
  [funcScreenRoutes.localDataManager]: { component: LocalDataManagerScreen },
  [funcScreenRoutes.home]: { component: FuncScreen },
};
