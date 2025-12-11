import React from 'react';

/******************************************************************************************************************
 * Navigation helpers.
 *
 * @property ScreenNavigate  - Navigate to a route with optional params
 * @property ScreenGoBack    - Go back to the previous screen in the stack
 ******************************************************************************************************************/
export type ScreenNavigate = (routeName: string, params?: any) => void;
export type ScreenGoBack = () => void;

/******************************************************************************************************************
 * Screen props.
 *
 * @property navigate  - Simple navigation helper; wraps React Navigation's navigate()
 * @property goBack    - Go back helper; wraps React Navigation's goBack()
 * @property param?    - Optional route parameters passed from the navigator
 ******************************************************************************************************************/
export type ScreenProps<P = any> = {
  navigate: ScreenNavigate;
  goBack: ScreenGoBack;
  param?: P;
};

/******************************************************************************************************************
 * Screen type and registry.
 *
 * @property ScreenType  - Functional component type for a screen
 * @property ScreenMap   - Mapping of route names to screen components
 ******************************************************************************************************************/
export type ScreenType<P = any> = React.FC<ScreenProps<P>>;
export type ScreenMap = Record<string, ScreenType<any>>;
