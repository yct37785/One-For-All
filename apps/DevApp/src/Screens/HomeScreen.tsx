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
  const UI_containerOptions = [
    { value: screenRoutes.ui_box, text: 'Box' },
    { value: screenRoutes.ui_collapsibles, text: 'Collapsibles' },
    { value: screenRoutes.ui_tabs, text: 'Tabs' },
  ];

  const UI_dataOptions = [
    { value: screenRoutes.ui_avatar, text: 'Avatar' },
    { value: screenRoutes.ui_chip, text: 'Chip' },
    { value: screenRoutes.ui_list, text: 'List' },
  ];

  const UI_decoratorsOptions = [
    { value: screenRoutes.ui_decorators, text: 'Divider etc.' },
  ];

  const UI_inputOptions = [
    { value: screenRoutes.ui_input, text: 'Input' },
  ];

  const UI_interactiveOptions = [
    { value: screenRoutes.ui_buttons, text: 'Buttons' },
    { value: screenRoutes.ui_touchable, text: 'Touchable' },
  ];

  const UI_layoutOptions = [
    { value: screenRoutes.ui_layouts, text: 'Layouts' },
  ];

  const UI_menuOptions = [
    { value: screenRoutes.ui_menulist, text: 'Menu List' },
  ];

  const UI_modalOptions = [
    { value: screenRoutes.ui_modals, text: 'Dialogs & popups' },
  ];

  const UI_optionsOptions = [
    { value: screenRoutes.ui_nestedOptions, text: 'Nested options' },
  ];

  const UI_selectionsOptions = [
    { value: screenRoutes.ui_selections, text: 'Pickers & selections' },
  ];

  const UI_textOptions = [
    { value: screenRoutes.ui_text, text: 'Text' },
    { value: screenRoutes.ui_textVariants, text: 'Highlight / Hyperlink' },
    { value: screenRoutes.ui_icon, text: 'Icon' },
  ];

  /******************************************************************************************************************
   * UI sections + mapped options
   ******************************************************************************************************************/
  const UI_SECTION_CONFIG = [
    { header: { text: 'Container',      icon: 'crop-square' },                 options: UI_containerOptions },
    { header: { text: 'Data',           icon: 'view-list' },                   options: UI_dataOptions },
    { header: { text: 'Decorators',     icon: 'palette' },                     options: UI_decoratorsOptions },
    { header: { text: 'Input',          icon: 'form-textbox' },                options: UI_inputOptions },
    { header: { text: 'Interactive',    icon: 'gesture-tap' },                 options: UI_interactiveOptions },
    { header: { text: 'Layout',         icon: 'view-grid-plus' },              options: UI_layoutOptions },
    { header: { text: 'Menu / Navigation', icon: 'dots-vertical' },            options: UI_menuOptions },
    { header: { text: 'Modal',          icon: 'message-draw' },                options: UI_modalOptions },
    { header: { text: 'Options',        icon: 'tune' },                        options: UI_optionsOptions },
    { header: { text: 'Selections',     icon: 'checkbox-multiple-marked' },    options: UI_selectionsOptions },
    { header: { text: 'Text / Icon',    icon: 'format-text' },                 options: UI_textOptions },
  ];

  const UI_SECTIONS = UI_SECTION_CONFIG.map(s => s.header);

  const RenderUISection = memo(
    () => (
      <UI.Box>
        <UI.Box p={1}>
          <UI.Text variant='bodyMedium'>
            Reusable UI primitive elements, including layout, text, inputs etc.
          </UI.Text>
        </UI.Box>

        <UI.AccordionContainer sections={UI_SECTIONS}>
          {UI_SECTION_CONFIG.map((section, idx) => (
            <UI.MenuList
              key={section.header.text}
              options={section.options}
              onSelect={handleSelect}
              showDividers
              align='center'
            />
          ))}
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

  const FUNC_SECTION_CONFIG = [
    { header: { text: 'Local Data', icon: 'database' },   options: localDataOptions },
    { header: { text: 'Firebase',   icon: 'cloud-sync' }, options: firebaseOptions },
  ];

  const FUNC_SECTIONS = FUNC_SECTION_CONFIG.map(s => s.header);

  const RenderFuncsSection = memo(
    () => (
      <UI.Box>
        <UI.Box p={1}>
          <UI.Text variant='bodyMedium'>
            Managers and application flows like data storage, authentication, or synchronization logic etc.
          </UI.Text>
        </UI.Box>

        <UI.AccordionContainer sections={FUNC_SECTIONS}>
          {FUNC_SECTION_CONFIG.map(section => (
            <UI.MenuList
              key={section.header.text}
              options={section.options}
              onSelect={handleSelect}
              showDividers
              align='center'
            />
          ))}
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
