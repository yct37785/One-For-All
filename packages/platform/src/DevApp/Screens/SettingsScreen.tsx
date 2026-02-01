import React, { memo, useCallback, useState } from 'react';
import { UI, App, Nav } from '../../Logic';

const SettingsScreen: React.FC = memo(() => {
  const { theme, updateTheme } = App.useAppTheme();
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
