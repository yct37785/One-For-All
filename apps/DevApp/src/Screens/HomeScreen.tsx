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
  const containerOptions = [
    { value: screenRoutes.ui_box, text: 'Box' },
    { value: screenRoutes.ui_collapsibles, text: 'Collapsibles' },
    { value: screenRoutes.ui_tabs, text: 'Tabs' },
  ];

  const dataOptions = [
    { value: screenRoutes.ui_avatar, text: 'Avatar' },
    { value: screenRoutes.ui_chip, text: 'Chip' },
    { value: screenRoutes.ui_list, text: 'List' },
  ];

  const decoratorsOptions = [
    { value: screenRoutes.ui_decorators, text: 'Divider etc.' },
  ];

  const inputOptions = [
    { value: screenRoutes.ui_input, text: 'Input' },
  ];

  const interactiveOptions = [
    { value: screenRoutes.ui_buttons, text: 'Buttons' },
    { value: screenRoutes.ui_touchable, text: 'Touchable' },
  ];

  const layoutOptions = [
    { value: screenRoutes.ui_layouts, text: 'Layouts' },
  ];

  const menuOptions = [
    { value: screenRoutes.ui_menulist, text: 'Menu List' },
  ];

  const modalOptions = [
    { value: screenRoutes.ui_modals, text: 'Dialogs & popups' },
  ];

  const optionsOptions = [
    { value: screenRoutes.ui_nestedOptions, text: 'Nested options' },
  ];

  const selectionsOptions = [
    { value: screenRoutes.ui_selections, text: 'Pickers & selections' },
  ];

  const textOptions = [
    { value: screenRoutes.ui_text, text: 'Text' },
    { value: screenRoutes.ui_textVariants, text: 'Highlight / Hyperlink' },
    { value: screenRoutes.ui_icon, text: 'Icon' },
  ];

  const UI_SECTIONS = [
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
  const localDataOptions = [
    { value: screenRoutes.f_localData, text: 'Local Data Manager' },
  ];

  const firebaseOptions = [
    { value: screenRoutes.ui_avatar, text: 'Placeholder' },
  ];

  const FUNC_SECTIONS = [
    { text: 'Local Data', icon: 'database' },
    { text: 'Firebase', icon: 'cloud-sync' },
  ];

  const RenderFuncsSection = memo(
    () => (
      <UI.Box>
        <UI.Box p={1}>
          <UI.Text variant='bodyMedium'>
            Managers and application flows like data storage, authentication, or synchronization logic etc.
          </UI.Text>
        </UI.Box>
        <UI.AccordionContainer sections={FUNC_SECTIONS}>

          {/* Local data */}
          <UI.MenuList
            options={localDataOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />

          {/* Firebase */}
          <UI.MenuList
            options={firebaseOptions}
            onSelect={handleSelect}
            showDividers
            align='center'
          />
        </UI.AccordionContainer>
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

        {/* Test */}
        <UI.MenuList
          options={[{
            value: screenRoutes.testbed,
            text: 'Testbed playground',
            icon: 'flask'
          }]}
          onSelect={handleSelect}
          showDividers
          align='start'
        />

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
