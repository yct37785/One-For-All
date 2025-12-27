import { Nav } from 'framework';
// container
import LocalKVStoreManagerScreen from './LocalKVStoreManagerScreen';
import FuncScreen from './FuncScreen';

/******************************************************************************************************************
 * Screen routes
 ******************************************************************************************************************/
export const funcScreenRoutes = {
  localKVStoreManager: 'func_local_kv_store',
  home: 'func_home'
} as const;

/******************************************************************************************************************
 * Screen registry (except home screen)
 ******************************************************************************************************************/
export const funcScreenRegistry: Nav.NavNodeMap = {
  [funcScreenRoutes.localKVStoreManager]: { component: LocalKVStoreManagerScreen },
  [funcScreenRoutes.home]: { component: FuncScreen },
};
