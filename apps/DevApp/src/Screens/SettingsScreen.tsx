import React, { memo, useCallback, useState } from 'react';
import { UI, Manager, Nav } from 'framework';

const SettingsScreen: React.FC = memo(() => {
  const { theme, updateTheme } = Manager.useAppTheme();
  return (
    <Nav.ScreenLayout title='Settings'>
      <UI.Button onPress={() => updateTheme({ colorsLight: { onSurface: '#ff0000ff' } })}>
        Test Update Primary Color
      </UI.Button>
      <UI.Text color={theme.colors.onSurface}>asdasdasdasd</UI.Text>
    </Nav.ScreenLayout>
  );
});

export default SettingsScreen;
