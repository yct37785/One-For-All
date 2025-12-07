import React, { memo } from 'react';
import { Screen, Manager, UI } from 'framework';
import { screenRoutes } from './ScreenRegistry';

/******************************************************************************************************************
 * Home screen – Framework showcase
 *
 * Entry point to:
 * - UI foundations (Framework/src/UI)
 * - Components (Framework/src/Component)
 * - Functionalities / managers (Framework/src/Manager)
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
    ? 'Setting up session...'
    : isAnon
      ? `Anonymous session\nuid: ${uid?.slice(0, 10)}...`
      : `Signed in with Google\nuid: ${uid?.slice(0, 10)}...\nEmail: ${email}`;

  /******************************************************************************************************************
   * Unified navigation handler
   ******************************************************************************************************************/
  const handleSelect = (routeName: string) => {
    navigation.navigate(routeName, { paramText: 'hello from home' });
  };

  /******************************************************************************************************************
   * UI section (Framework/src/UI)
   ******************************************************************************************************************/
  const testOptions = [
    {
      value: screenRoutes.testbed,
      text: 'Testbed playground',
    },
  ];

  const containerOptions = [
    { value: screenRoutes.box, text: 'Box' },
    { value: screenRoutes.collapsibles, text: 'Collapsibles' },
    { value: screenRoutes.tabs, text: 'Tabs' },
  ];

  const dataOptions = [
    { value: screenRoutes.avatar, text: 'Avatar' },
    { value: screenRoutes.chip, text: 'Chip' },
    { value: screenRoutes.list, text: 'List' },
  ];

  const decoratorsOptions = [
    { value: screenRoutes.decorators, text: 'Divider etc.' },
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
    { value: screenRoutes.text, text: 'Text' },
    { value: screenRoutes.textVariants, text: 'Highlight / Hyperlink' },
    { value: screenRoutes.icon, text: 'Icon' },
  ];

  const UI_SECTIONS = [
    { text: 'Test', icon: 'flask' },
    { text: 'Container', icon: 'crop-square' },
    { text: 'Data', icon: 'view-list' },
    { text: 'Decorators', icon: 'palette' },
    { text: 'Input', icon: 'form-textbox' },
    { text: 'Interactive', icon: 'gesture-tap' },
    { text: 'Layout', icon: 'view-grid-plus' },
    { text: 'Menu / Navigation', icon: 'dots-vertical' },
    { text: 'Modal', icon: 'message-draw' },
    { text: 'Options', icon: 'tune' },
    { text: 'Selections', icon: 'checkbox-multiple-marked' },
    { text: 'Text / Icon', icon: 'format-text' },
  ];

  const RenderUISection = memo(
    () => (
      <UI.Box>
        <UI.Box p={1}>
          <UI.Text variant='bodyMedium'>
            Reusable UI primitive elements, including layout, text, inputs etc.
          </UI.Text>
        </UI.Box>
        <UI.AccordionContainer sections={UI_SECTIONS}>
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

          {/* Decorators */}
          <UI.MenuList
            options={decoratorsOptions}
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

          {/* Text / Icon */}
          <UI.MenuList
            options={textOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />
        </UI.AccordionContainer>
      </UI.Box>
    )
  );

  /******************************************************************************************************************
   * Components section (Framework/src/Component)
   ******************************************************************************************************************/
  const RenderCompsSection = memo(
    () => (
      <UI.Box>
        <UI.Box p={1}>
          <UI.Text variant='bodyMedium'>
            Higher-level building blocks composed from UI
            primitives, such as chat interfaces, message lists etc.
          </UI.Text>
        </UI.Box>
      </UI.Box>
    )
  );

  /******************************************************************************************************************
   * Functionalities section (Framework/src/Manager)
   ******************************************************************************************************************/
  const RenderFuncsSection = memo(
    () => (
      <UI.Box>
        <UI.Box p={1}>
          <UI.Text variant='bodyMedium'>
            Managers and application flows like
            LocalDataManager, authentication, or synchronization logic etc.
          </UI.Text>
        </UI.Box>
      </UI.Box>
    )
  );

  /******************************************************************************************************************
   * Render
   ******************************************************************************************************************/
  return (
    <Screen.ScreenLayout>
      <UI.VerticalLayout constraint='scroll' gap={1}>
        {/* Hero / intro */}
        <UI.Text variant='titleLarge'>Framework Showcase</UI.Text>
        <UI.Text variant='bodyMedium'>
          Explore foundational UI elements, composite components, and
          underlying managers. Expand a section, then pick a screen to jump
          into a live demo.
        </UI.Text>

        {/* Auth status card */}
        <UI.Box mv={1}>
          <UI.VerticalLayout bgColor='#F5F5F5' gap={1}>
            <UI.Text variant='labelSmall' color='label' bold>
              Session
            </UI.Text>
            <UI.Text variant='bodySmall'>{statusText}</UI.Text>
          </UI.VerticalLayout>
        </UI.Box>

        {/* UI section */}
        <UI.CollapsibleContainer
          text='UI Foundations'
          textOpts={{ variant: 'titleMedium' }}
        >
          <RenderUISection />
        </UI.CollapsibleContainer>

        {/* Components section */}
        <UI.CollapsibleContainer
          text='Components'
          textOpts={{ variant: 'titleMedium' }}
        >
          <RenderCompsSection />
        </UI.CollapsibleContainer>

        {/* Functionalities section */}
        <UI.CollapsibleContainer
          text='Functionalities'
          textOpts={{ variant: 'titleMedium' }}
        >
          <RenderFuncsSection />
        </UI.CollapsibleContainer>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(HomeScreen);
