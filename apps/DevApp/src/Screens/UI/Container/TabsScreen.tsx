import React, { memo, useState } from 'react';
import { Screen, UI } from 'framework';

const TAB_CONTENT_HEIGHT = 120;

/******************************************************************************************************************
 * Tabs demo
 *
 * This screen demonstrates:
 * - UI.TabsContainer: tabbed navigation where the active tab controls which scene is shown.
 ******************************************************************************************************************/

// simple tab scenes for demos
const BasicFirstTab = () => (
  <UI.Box p={2} bgColor='#e3f2fd' flex={1}>
    <UI.Text variant='bodySmall'>Basic first tab content.</UI.Text>
  </UI.Box>
);

const BasicSecondTab = () => (
  <UI.Box p={2} bgColor='#f1f8e9' flex={1}>
    <UI.Text variant='bodySmall'>Basic second tab content.</UI.Text>
  </UI.Box>
);

const IconHomeTab = () => (
  <UI.Box p={2} bgColor='#fff3e0' flex={1}>
    <UI.Text variant='bodySmall'>Home tab with icon.</UI.Text>
  </UI.Box>
);

const IconSearchTab = () => (
  <UI.Box p={2} bgColor='#e8eaf6' flex={1}>
    <UI.Text variant='bodySmall'>Search tab with icon.</UI.Text>
  </UI.Box>
);

const IconProfileTab = () => (
  <UI.Box p={2} bgColor='#e0f7fa' flex={1}>
    <UI.Text variant='bodySmall'>Profile tab with icon.</UI.Text>
  </UI.Box>
);

const BottomFirstTab = () => (
  <UI.Box p={2} bgColor='#fce4ec' flex={1}>
    <UI.Text variant='bodySmall'>Bottom tabs · first tab.</UI.Text>
  </UI.Box>
);

const BottomSecondTab = () => (
  <UI.Box p={2} bgColor='#ede7f6' flex={1}>
    <UI.Text variant='bodySmall'>Bottom tabs · second tab.</UI.Text>
  </UI.Box>
);

const TabsScreen: Screen.ScreenType = ({}) => {
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
    basicFirst: BasicFirstTab,
    basicSecond: BasicSecondTab,
  };

  // tabs with icons (top)
  const iconRoutes = [
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'search', title: 'Search', icon: 'magnify' },
    { key: 'profile', title: 'Profile', icon: 'account' },
  ];
  const iconSceneMap = {
    home: IconHomeTab,
    search: IconSearchTab,
    profile: IconProfileTab,
  };

  // bottom-positioned tabs
  const bottomRoutes = [
    { key: 'bottomFirst', title: 'First', icon: 'view-dashboard' },
    { key: 'bottomSecond', title: 'Second', icon: 'format-list-bulleted' },
  ];
  const bottomSceneMap = {
    bottomFirst: BottomFirstTab,
    bottomSecond: BottomSecondTab,
  };

  return (
    <Screen.ScreenLayout showTitle>
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
    </Screen.ScreenLayout>
  );
};

export default memo(TabsScreen);
