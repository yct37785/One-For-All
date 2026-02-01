import React, { memo, useState } from 'react';
import { Nav, UI, App } from '../../../../Logic';
import { getDemoColors } from '../../demoColors';

const TAB_CONTENT_HEIGHT = 120;

/******************************************************************************************************************
 * Tab scene factory (demo-only)
 ******************************************************************************************************************/
function createTabScenes(isDarkMode: boolean) {
  const colors = getDemoColors(isDarkMode);

  /**
   * Basic (2 tabs)
   */
  const BasicFirstTab = () => (
    <UI.Box p={2} bgColor={colors.cyan_1} flex={1}>
      <UI.Text variant='bodySmall'>Basic first tab content.</UI.Text>
    </UI.Box>
  );

  const BasicSecondTab = () => (
    <UI.Box p={2} bgColor={colors.neutral_2} flex={1}>
      <UI.Text variant='bodySmall'>Basic second tab content.</UI.Text>
    </UI.Box>
  );

  /**
   * With icons (3 tabs)
   */
  const IconHomeTab = () => (
    <UI.Box p={2} bgColor={colors.amber_1} flex={1}>
      <UI.Text variant='bodySmall'>Home tab content (with icon).</UI.Text>
    </UI.Box>
  );

  const IconSearchTab = () => (
    <UI.Box p={2} bgColor={colors.purple_1} flex={1}>
      <UI.Text variant='bodySmall'>Search tab content (with icon).</UI.Text>
    </UI.Box>
  );

  const IconProfileTab = () => (
    <UI.Box p={2} bgColor={colors.cyan_2} flex={1}>
      <UI.Text variant='bodySmall'>Profile tab content (with icon).</UI.Text>
    </UI.Box>
  );

  /**
   * Bottom-positioned tab bar (2 tabs)
   */
  const BottomFirstTab = () => (
    <UI.Box p={2} bgColor={colors.purple_2} flex={1}>
      <UI.Text variant='bodySmall'>Bottom tabs · first tab.</UI.Text>
    </UI.Box>
  );

  const BottomSecondTab = () => (
    <UI.Box p={2} bgColor={colors.purple_3} flex={1}>
      <UI.Text variant='bodySmall'>Bottom tabs · second tab.</UI.Text>
    </UI.Box>
  );

  return {
    BasicFirstTab,
    BasicSecondTab,
    IconHomeTab,
    IconSearchTab,
    IconProfileTab,
    BottomFirstTab,
    BottomSecondTab,
  };
}

/******************************************************************************************************************
 * Tabs demo
 *
 * Demonstrates:
 * - UI.TabsContainer (controlled): you own the active index state
 * - Top tab bar vs bottom tab bar
 * - Optional tab icons
 ******************************************************************************************************************/
const TabsScreen: Nav.ScreenType = () => {
  const { isDarkMode } = App.useAppSettings();
  const scenes = createTabScenes(isDarkMode);

  // controlled tab indices for each example
  const [basicIndex, setBasicIndex] = useState(0);
  const [iconIndex, setIconIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  /**
   * Basic tabs (top)
   */
  const basicRoutes = [
    { key: 'basicFirst', title: 'First' },
    { key: 'basicSecond', title: 'Second' },
  ];
  const basicSceneMap = {
    basicFirst: scenes.BasicFirstTab,
    basicSecond: scenes.BasicSecondTab,
  };

  /**
   * Tabs with icons (top)
   */
  const iconRoutes = [
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'search', title: 'Search', icon: 'magnify' },
    { key: 'profile', title: 'Profile', icon: 'account' },
  ];
  const iconSceneMap = {
    home: scenes.IconHomeTab,
    search: scenes.IconSearchTab,
    profile: scenes.IconProfileTab,
  };

  /**
   * Bottom-positioned tabs
   */
  const bottomRoutes = [
    { key: 'bottomFirst', title: 'First', icon: 'view-dashboard' },
    { key: 'bottomSecond', title: 'Second', icon: 'format-list-bulleted' },
  ];
  const bottomSceneMap = {
    bottomFirst: scenes.BottomFirstTab,
    bottomSecond: scenes.BottomSecondTab,
  };

  return (
    <Nav.ScreenLayout showTitle title='Tabs'>
      <UI.VerticalLayout constraint='scroll' flex={1} pad={2} gap={1}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          TabsContainer renders a tab bar and switches scenes based on the active tab index.
        </UI.Text>

        {/* Basic (top) */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Basic tabs</UI.Text>

        <UI.Box mt={1} h={TAB_CONTENT_HEIGHT}>
          <UI.TabsContainer
            routes={basicRoutes}
            sceneMap={basicSceneMap}
            tabIndex={basicIndex}
            onTabIdxChange={setBasicIndex}
            position='top'
          />
        </UI.Box>

        {/* With icons (top) */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Tabs with icons</UI.Text>

        <UI.Box mt={1} h={TAB_CONTENT_HEIGHT}>
          <UI.TabsContainer
            routes={iconRoutes}
            sceneMap={iconSceneMap}
            tabIndex={iconIndex}
            onTabIdxChange={setIconIndex}
            position='top'
          />
        </UI.Box>

        {/* Bottom tab bar */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Bottom tab bar</UI.Text>

        <UI.Box mt={1} h={TAB_CONTENT_HEIGHT}>
          <UI.TabsContainer
            routes={bottomRoutes}
            sceneMap={bottomSceneMap}
            tabIndex={bottomIndex}
            onTabIdxChange={setBottomIndex}
            position='bottom'
          />
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(TabsScreen);
