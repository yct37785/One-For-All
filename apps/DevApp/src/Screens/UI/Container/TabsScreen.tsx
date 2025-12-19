import React, { memo, useState } from 'react';
import { Nav, UI, Manager } from 'framework';
import { getDemoColors } from '../../demoColors';

const TAB_CONTENT_HEIGHT = 120;

/******************************************************************************************************************
 * Tab scene factory
 ******************************************************************************************************************/
function createTabScenes(isDarkMode: boolean) {
  const colors = getDemoColors(isDarkMode);

  // simple tab scenes for demos
  const BasicFirstTab = () => (
    <UI.Box p={2} bgColor={colors.skyBg} flex={1}>
      <UI.Text variant='bodySmall'>Basic first tab content.</UI.Text>
    </UI.Box>
  );

  const BasicSecondTab = () => (
    <UI.Box p={2} bgColor={colors.neutralAlt} flex={1}>
      <UI.Text variant='bodySmall'>Basic second tab content.</UI.Text>
    </UI.Box>
  );

  const IconHomeTab = () => (
    <UI.Box p={2} bgColor={colors.orangeBg} flex={1}>
      <UI.Text variant='bodySmall'>Home tab with icon.</UI.Text>
    </UI.Box>
  );

  const IconSearchTab = () => (
    <UI.Box p={2} bgColor={colors.purpleBg} flex={1}>
      <UI.Text variant='bodySmall'>Search tab with icon.</UI.Text>
    </UI.Box>
  );

  const IconProfileTab = () => (
    <UI.Box p={2} bgColor={colors.cyanBg} flex={1}>
      <UI.Text variant='bodySmall'>Profile tab with icon.</UI.Text>
    </UI.Box>
  );

  const BottomFirstTab = () => (
    <UI.Box p={2} bgColor={colors.purpleA} flex={1}>
      <UI.Text variant='bodySmall'>Bottom tabs · first tab.</UI.Text>
    </UI.Box>
  );

  const BottomSecondTab = () => (
    <UI.Box p={2} bgColor={colors.purpleB} flex={1}>
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
 * This screen demonstrates:
 * - UI.TabsContainer: tabbed navigation where the active tab controls which scene is shown.
 ******************************************************************************************************************/
const TabsScreen: Nav.ScreenType = ({}) => {
  const { isDarkMode } = Manager.useAppSettings();
  const { theme } = Manager.useAppTheme();
  const scenes = createTabScenes(isDarkMode);

  // controlled tab indices for each example
  const [basicIndex, setBasicIndex] = useState(0);
  const [iconIndex, setIconIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  // basic tabs (top)
  const basicRoutes = [
    { key: 'basicFirst', title: 'First' },
    { key: 'basicSecond', title: 'Second' },
  ];
  const basicSceneMap = {
    basicFirst: scenes.BasicFirstTab,
    basicSecond: scenes.BasicSecondTab,
  };

  // tabs with icons (top)
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

  // bottom-positioned tabs
  const bottomRoutes = [
    { key: 'bottomFirst', title: 'First', icon: 'view-dashboard' },
    { key: 'bottomSecond', title: 'Second', icon: 'format-list-bulleted' },
  ];
  const bottomSceneMap = {
    bottomFirst: scenes.BottomFirstTab,
    bottomSecond: scenes.BottomSecondTab,
  };

  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Header */}
        <UI.Text variant='bodyMedium'>
          TabsContainer manages tabbed content where the active tab determines which scene is rendered.
        </UI.Text>

        {/* TabsContainer · basic (top) */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TabsContainer · basic (top)</UI.Text>

        <UI.Box mt={1} style={{ height: TAB_CONTENT_HEIGHT }}>
          <UI.TabsContainer
            routes={basicRoutes}
            sceneMap={basicSceneMap}
            tabIndex={basicIndex}
            onTabIdxChange={setBasicIndex}
            position='top'
          />
        </UI.Box>

        {/* TabsContainer · with icons (top) */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TabsContainer · with icons</UI.Text>

        <UI.Box mt={1} style={{ height: TAB_CONTENT_HEIGHT }}>
          <UI.TabsContainer
            routes={iconRoutes}
            sceneMap={iconSceneMap}
            tabIndex={iconIndex}
            onTabIdxChange={setIconIndex}
            position='top'
          />
        </UI.Box>

        {/* TabsContainer · bottom tab bar */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TabsContainer · bottom</UI.Text>

        <UI.Box mt={1} style={{ height: TAB_CONTENT_HEIGHT }}>
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
