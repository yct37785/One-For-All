import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Nav, Manager, UI } from 'framework';

/******************************************************************************************************************
 * Settings
 ******************************************************************************************************************/
const SettingsScreen: Nav.ScreenType = ({ }) => {

  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout>
        <UI.Text>Settings Screen</UI.Text>
      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(SettingsScreen);
