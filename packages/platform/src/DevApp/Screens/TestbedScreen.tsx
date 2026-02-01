import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Nav, UI, App } from '../../Logic';

/******************************************************************************************************************
 * Testbed screen: used for development and testing of new UI elements
 ******************************************************************************************************************/
const TestbedScreen: Nav.ScreenType = ({}) => {
  const { theme, updateTheme } = App.useAppTheme();
  
  const options: UI.MenuOption[] = [
    { text: 'Sign in with Google', value: 'signin', icon: 'google' },
    { text: 'Sign in with Google', value: 'signin', icon: 'google', disabled: true },
  ];

  const handleSelect = async (value: string) => {
  };

  const LeftContent = () => (
    <UI.HorizontalLayout bgColor='green' flex={1} pad={1} gap={1}>
      <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: 'lime' }} />
      <UI.Text variant='labelLarge'>Testbed</UI.Text>
    </UI.HorizontalLayout>
  );

  return (
    <Nav.ScreenLayout LeftContent={<LeftContent />}>
      <UI.VerticalLayout bgColor='red' flex={1} pad={2} gap={1}>

        <UI.MenuList options={options} onSelect={handleSelect} dense showDividers />

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(TestbedScreen);
