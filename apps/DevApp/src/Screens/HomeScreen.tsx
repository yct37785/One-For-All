import React, { memo } from 'react';
import { Screen, Manager, UI } from 'framework';
import { screenRoutes } from './ScreenRegistry';

/******************************************************************************************************************
 * Home screen – UI demo hub
 ******************************************************************************************************************/
const HomeScreen: Screen.ScreenType = ({ navigation }) => {
  const { user } = Manager.useAuth();
  const isAnon = !!user?.isAnonymous || !user;
  const uid = user?.uid;
  const email = user?.email ?? '';

  /******************************************************************************************************************
   * Auth status text
   ******************************************************************************************************************/
  const statusText = !user
    ? 'Setting up session…'
    : isAnon
      ? `Anonymous session\nuid: ${uid?.slice(0, 10)}…`
      : `Signed in with Google\nuid: ${uid?.slice(0, 10)}…\nEmail: ${email}`;

  /******************************************************************************************************************
   * Menu options per section (values are route names)
   ******************************************************************************************************************/
  const testOptions = [
    {
      value: screenRoutes.testbed,
      text: 'Testbed playground'
    },
  ];

  const containerOptions = [
    { value: screenRoutes.box, text: 'Box' },
    { value: screenRoutes.collapsibles, text: 'Collapsibles' },
    { value: screenRoutes.tabs, text: 'Tabs' },
  ];

  const dataOptions = [
    { value: screenRoutes.avatar, text: 'Avatar' },
    { value: screenRoutes.list, text: 'List' },
  ];

  const inputOptions = [
    { value: screenRoutes.input, text: 'Input' },
  ];

  const interactiveOptions = [
    { value: screenRoutes.buttons, text: 'Buttons' },
    { value: screenRoutes.touchable, text: 'Touchable' },
  ];

  const layoutOptions = [
    { value: screenRoutes.layouts, text: 'Layouts' },
  ];

  const menuOptions = [
    { value: screenRoutes.menulist, text: 'Menu List' },
  ];

  const modalOptions = [
    { value: screenRoutes.modals, text: 'Dialogs & popups' },
  ];

  const optionsOptions = [
    { value: screenRoutes.nestedOptions, text: 'Nested options' },
  ];

  const selectionsOptions = [
    { value: screenRoutes.selections, text: 'Pickers & selections' },
  ];

  const textOptions = [
    { value: screenRoutes.text, text: 'Text, HighlightText, Icon' },
  ];

  const visualsOptions = [
    { value: screenRoutes.visuals, text: 'Avatar, Divider, etc.' },
  ];

  /******************************************************************************************************************
   * Unified navigation handler
   ******************************************************************************************************************/
  const handleSelect = (routeName: string) => {
    navigation.navigate(routeName, { paramText: 'hello from home' });
  };

  /******************************************************************************************************************
   * Accordion headers
   ******************************************************************************************************************/
  const SECTIONS = [
    { text: 'Test', icon: 'flask' },
    { text: 'Container', icon: 'crop-square' },
    { text: 'Data', icon: 'view-list' },
    { text: 'Input', icon: 'form-textbox' },
    { text: 'Interactive', icon: 'gesture-tap' },
    { text: 'Layout', icon: 'view-grid-plus' },
    { text: 'Menu / Navigation', icon: 'dots-vertical' },
    { text: 'Modal', icon: 'message-draw' },
    { text: 'Options', icon: 'tune' },
    { text: 'Selections', icon: 'checkbox-multiple-marked' },
    { text: 'Text / Icon', icon: 'format-text' },
    { text: 'Visuals', icon: 'palette' },
  ];

  return (
    <Screen.ScreenLayout>
      <UI.VerticalLayout constraint='scroll' gap={2}>
        {/* Hero / intro */}
        <UI.Box mb={1}>
          <UI.Text variant='titleLarge'>UI Component Gallery</UI.Text>
          <UI.Text variant='bodySmall'>
            Browse all UI demo screens grouped by category. Tap any row to jump
            straight into a live example.
          </UI.Text>
        </UI.Box>

        {/* Auth status card */}
        <UI.Box mv={1}>
          <UI.VerticalLayout bgColor='#F5F5F5' gap={1}>
            <UI.Text variant='labelSmall' color='label' bold>
              Session
            </UI.Text>
            <UI.Text variant='bodySmall'>{statusText}</UI.Text>
          </UI.VerticalLayout>
        </UI.Box>

        {/* Sectioned navigation using Accordion + MenuList */}
        <UI.AccordionContainer sections={SECTIONS}>
          {/* Test */}
          <UI.MenuList
            options={testOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />

          {/* Container */}
          <UI.MenuList
            options={containerOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />

          {/* Data */}
          <UI.MenuList
            options={dataOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />

          {/* Input */}
          <UI.MenuList
            options={inputOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />

          {/* Interactive */}
          <UI.MenuList
            options={interactiveOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />

          {/* Layout */}
          <UI.MenuList
            options={layoutOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />

          {/* Menu / Navigation */}
          <UI.MenuList
            options={menuOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />

          {/* Modal */}
          <UI.MenuList
            options={modalOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />

          {/* Options */}
          <UI.MenuList
            options={optionsOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />

          {/* Selections */}
          <UI.MenuList
            options={selectionsOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />

          {/* Text */}
          <UI.MenuList
            options={textOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />

          {/* Visuals */}
          <UI.MenuList
            options={visualsOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />
        </UI.AccordionContainer>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(HomeScreen);
