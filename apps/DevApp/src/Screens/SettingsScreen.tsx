import React, { memo, useCallback, useState } from 'react';
import { Switch } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { UI, Manager, Nav } from 'framework';

const SettingsScreen: React.FC = memo(() => {
  const { isDarkMode, setIsDarkMode } = Manager.useAppSettings();
  //const [isDarkMode, setIsDarkMode] = useState(false);

  // changes cause Switch to remount
  const [switchKey, setSwitchKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      // screen became focused > force a fresh Switch instance
      setSwitchKey(k => k + 1);
      return () => {};
    }, [])
  );

  return (
    <Nav.ScreenLayout title='Settings'>
      <Switch
        key={`settings-switch-${switchKey}`}
        value={isDarkMode}
        onValueChange={setIsDarkMode}
      />
    </Nav.ScreenLayout>
  );
});

export default SettingsScreen;
