import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import { Nav, Manager, UI } from 'framework';

/******************************************************************************************************************
 * AppBar: default left content
 ******************************************************************************************************************/
export const DefaultLeftContent = memo(() => {
  return (<View style={{ flex: 1, backgroundColor: 'red' }}>
    <UI.Text>Left content</UI.Text>
  </View>)
});

/******************************************************************************************************************
 * AppBar: default right content
 ******************************************************************************************************************/
export const DefaultRightContent = memo(() => {
  return (<View style={{ flex: 1, backgroundColor: 'green' }}>
    <UI.Text>Right content</UI.Text>
  </View>)
});