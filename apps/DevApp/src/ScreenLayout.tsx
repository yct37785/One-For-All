import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import { Switch, useTheme, Text } from 'react-native-paper';

/******************************************************************************************************************
 * AppBar: default left content
 ******************************************************************************************************************/
export const DefaultLeftContent = memo(() => {
  return (<View style={{ flex: 1, backgroundColor: 'red' }}>
    <Text>Left content</Text>
  </View>)
});

/******************************************************************************************************************
 * AppBar: default right content
 ******************************************************************************************************************/
export const DefaultRightContent = memo(() => {
  return (<View style={{ flex: 1, backgroundColor: 'green' }}>
    <Text>Right content</Text>
  </View>)
});