import React, { memo, useMemo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useAppTheme } from '../../Manager/App/AppThemeManager';
import { Icon } from '../Text/Icon';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

/******************************************************************************************************************
 * Describe the route object for each tab in the tabs container.
 *
 * @property key    - Unique identifier for the tab
 * @property title  - Display title for the tab
 * @property icon   - Optional material community icon name
 *
 * @usage
 * ```ts
 * const routes: TabRouteProps[] = [{ key: 'home', title: 'home', icon: 'home' }]
 * ```
 ******************************************************************************************************************/
export type TabRouteProps = {
  key: string;
  title?: string;
  icon?: string;
};

/******************************************************************************************************************
 * Tabs scene map (headless)
 *
 * A mapping of route keys → scene components, compatible with react-native-tab-view's SceneMap().
 *
 * @example
 * const scenes: TabsSceneMap = {
 *   music: MusicRoute,
 *   albums: AlbumsRoute,
 * };
 ******************************************************************************************************************/
export type TabsSceneMap<T extends string = string> = Record<T, React.ComponentType<unknown>>;

/******************************************************************************************************************
 * A container for managing tabbed navigation where content changes based on the selected tab.
 * 
 * @property routes         - Array of tab definitions (see TabRouteProps)
 * @property sceneMap       - Function that renders a scene for a given route (see TabsSceneMap)
 * @property tabIndex       - Index of the active tab
 * @property onTabIdxChange - Callback when the active tab changes
 * @property position       - Tab bar position
 * @property style?         - Optional wrapper style for the tab view
 ******************************************************************************************************************/
export type TabsContainerProps = {
  routes: TabRouteProps[];
  sceneMap: TabsSceneMap;
  tabIndex: number;
  onTabIdxChange: (index: number) => void;
  position: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
};

export const TabsContainer: React.FC<TabsContainerProps> = memo(
  ({ routes, sceneMap, tabIndex, onTabIdxChange, position, style }) => {
    const { theme } = useAppTheme();
    
    /**
     * Memoized scene map
     */
    const renderScene = useMemo(() => SceneMap(sceneMap as any), [sceneMap]);

    const ripple = theme.dark ? theme.design.rippleColorForDark : theme.design.rippleColorForLight;
    const onSurface = theme.colors.onSurface;

    /**
     * Lazy placeholder
     */
    const renderLazyPlaceholder = () => <View style={{ flex: 1 }} />;

    /**************************************************************************************************************
     * tab icon renderer
     **************************************************************************************************************/
    const renderIcon = ({
      route,
      color,
    }: {
      route: TabRouteProps;
      focused: boolean;
      color: string;
    }) =>
      route.icon ? (
        <Icon source={route.icon} variant='xs' color={color} />
      ) : null;

    /**************************************************************************************************************
     * TabBar renderer (stable)
     **************************************************************************************************************/
    const renderTabBar = (props: any) => (
      <TabBar
        {...props}
        pressColor={ripple}
        indicatorStyle={{ backgroundColor: theme.colors.primary }}
        style={{
          backgroundColor: theme.colors.surface,
          elevation: theme.dark ? 0 : 2,
          borderBottomWidth: theme.dark ? 0.5 : 0,
          borderBottomColor: theme.dark ? theme.colors.outlineVariant : 'transparent',
        }}
        activeColor={onSurface}
        inactiveColor={onSurface}
        labelStyle={theme.fonts?.labelMedium ?? undefined}
      />
    );

    return (
      <TabView
        lazy
        commonOptions={{
          icon: ({ route, focused, color }) =>
            renderIcon({ route: route as TabRouteProps, focused, color }),
        }}
        navigationState={{ index: tabIndex, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        renderLazyPlaceholder={renderLazyPlaceholder}
        onIndexChange={onTabIdxChange}
        tabBarPosition={position}
        style={style}
      />
    );
  }
);
