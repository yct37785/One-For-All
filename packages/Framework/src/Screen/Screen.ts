import type { ParamListBase, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type React from 'react';

/******************************************************************************************************************
 * Base props each screen receives.
 *
 * @template P - Param list (must extend ParamListBase)
 * @template N - Route name (key of P)
 *
 * @property navigation - React Navigation stack navigation object for the current route.
 *                        Provides methods such as `navigate`, `goBack`, and `setParams`.
 * @property route      - React Navigation route object containing the current route name and `params`.
 *                        Used to access screen-specific parameters or metadata.
 ******************************************************************************************************************/
export type ScreenProps<
  P extends ParamListBase = ParamListBase,
  N extends keyof P & string = string
> = {
  navigation: NativeStackNavigationProp<P, N>;
  route: RouteProp<P, N>;
};

/******************************************************************************************************************
 * Type for each screen in consumer app.
 ******************************************************************************************************************/
export type ScreenType = React.FC<ScreenProps>;

/******************************************************************************************************************
 * Schema for the screen map:
 * - A dictionary mapping screen names to React functional components.
 * - This is passed into the Root component to register all screens.
 *
 * @property [screenName] - a route name mapped to a React.FC that consumes ScreenProps
 * 
 * @usage
 * ```tsx
 * const screenMap: ScreenMap = {
 *   Home: HomeScreen,
 *   Details: DetailsScreen
 * }
 * ```
 ******************************************************************************************************************/
export type ScreenMap = Record<string, React.FC<ScreenProps>>;
