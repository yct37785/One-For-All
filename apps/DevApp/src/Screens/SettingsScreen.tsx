import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Switch, useTheme, Text } from 'react-native-paper';
import { Nav, Manager, UI } from 'framework';

/******************************************************************************************************************
 * Settings
 ******************************************************************************************************************/
const SettingsScreen: Nav.ScreenType = ({ }) => {
  const { isDarkMode, setIsDarkMode } = Manager.useAppSettings();

  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
        />
      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(SettingsScreen);
