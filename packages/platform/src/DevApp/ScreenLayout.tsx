import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import { Nav, App, UI } from '../Logic';

/******************************************************************************************************************
 * AppBar: default left content
 ******************************************************************************************************************/
export const DefaultLeftContent = memo(() => {
  return (<UI.Box flex={1}>
  </UI.Box>)
});

/******************************************************************************************************************
 * AppBar: default right content
 ******************************************************************************************************************/
export const DefaultRightContent = memo(() => {
  const { isDarkMode, setIsDarkMode } = App.useAppSettings();
  return (<UI.Box flex={1} justify='center'>
    <UI.Switch
      value={isDarkMode}
      onValueChange={setIsDarkMode}
    />
  </UI.Box>)
});