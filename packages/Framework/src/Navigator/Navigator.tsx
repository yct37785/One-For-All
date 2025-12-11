import React, { memo } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenMap } from '../Screen/Screen';

const Stack = createNativeStackNavigator<ParamListBase>();

/******************************************************************************************************************
 * Navigator props.
 *
 * @property initialRouteName  - Initial route name for the stack navigator
 * @property headerShown?      - Controls header visibility for all screens; defaults to false
 * @property screenMap         - Mapping of route names to Screen components
 ******************************************************************************************************************/
export type NavigatorProps = {
  initialRouteName: string;
  headerShown?: boolean;
  screenMap: ScreenMap;
};

/******************************************************************************************************************
 * Navigator
 *
 * Thin wrapper around React Navigation's native navigator:
 * - Injects `navigate`, `goBack`, and `param` props into each Screen
 * - Hides React Navigation types from screen implementations
 *
 * Example (in end user app):
 * ```tsx
 * const AppNavigator: React.FC = () => (
 *   <Navigator
 *     initialRouteName="Home"
 *     headerShown={false}
 *     screenMap={screenMap}
 *   />
 * );
 * ```
 ******************************************************************************************************************/
const Navigator: React.FC<NavigatorProps> =
  ({ initialRouteName, headerShown = false, screenMap }) => {
    return (
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown }}
      >
        {Object.entries(screenMap).map(([name, Component]) => (
          <Stack.Screen name={name} key={name}>
            {({ navigation, route }) => (
              <Component
                // simple navigate helper exposed to screens
                navigate={(routeName: string, params?: any) =>
                  navigation.navigate(routeName as never, params as never)
                }
                // goBack helper
                goBack={() => navigation.goBack()}
                // pass through route params as a single `param` prop
                param={route?.params}
              />
            )}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    );
  };

export default memo(Navigator);