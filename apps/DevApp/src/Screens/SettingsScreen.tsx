import React, { memo, useCallback, useState } from 'react';
import { Switch } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { UI, Manager, Nav } from 'framework';

const SettingsScreen: React.FC = memo(() => {
  const { isDarkMode, setIsDarkMode } = Manager.useAppSettings();
  return (
    <Nav.ScreenLayout title='Settings'>
      <UI.Switch
        value={isDarkMode}
        onValueChange={setIsDarkMode}
      />
    </Nav.ScreenLayout>
  );
});

export default SettingsScreen;
