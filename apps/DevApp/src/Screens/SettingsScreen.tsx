import React, { memo, useCallback, useState } from 'react';
import { UI, Manager, Nav } from 'framework';

const SettingsScreen: React.FC = memo(() => {
  const { updateTheme } = Manager.useAppTheme();
  return (
    <Nav.ScreenLayout title='Settings'>
      <UI.Button onPress={() => updateTheme({ colorsLight: { onSurface: '#ff0000ff' } })}>
        Test Update Primary Color
      </UI.Button>
      <UI.Text variant='headlineMedium'>asdasdsad</UI.Text>
      <UI.Text color='onSurface' variant='headlineMedium'>asdasdsad</UI.Text>
      <UI.Text color='error' highlightColor='inverseOnSurface' variant='headlineMedium'>asdasdsad</UI.Text>
      <UI.Text color='yellow' highlightColor='red' variant='displayMedium'>asdasdsad</UI.Text>
    </Nav.ScreenLayout>
  );
});

export default SettingsScreen;
