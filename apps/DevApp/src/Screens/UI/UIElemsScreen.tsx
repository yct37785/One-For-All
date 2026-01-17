import React, { memo } from 'react';
import { Nav, Manager, UI } from 'framework';
import { uiScreenRoutes } from './UIElemRegistry';

/******************************************************************************************************************
 * UI elements showcase screen: Framework/src/UI
 ******************************************************************************************************************/
const UIElemsScreen: Nav.ScreenType = ({ navigate }) => {
  const { isDarkMode } = Manager.useAppSettings();
  const { theme } = Manager.useAppTheme();

  /******************************************************************************************************************
   * UI section (Framework/src/UI)
   ******************************************************************************************************************/
  const UI_containerOptions = [
    { value: uiScreenRoutes.box, text: 'Box' },
    { value: uiScreenRoutes.collapsibles, text: 'Collapsibles' },
    { value: uiScreenRoutes.tabs, text: 'Tabs' },
  ];

  const UI_dataOptions = [
    { value: uiScreenRoutes.avatar, text: 'Avatar' },
    { value: uiScreenRoutes.chip, text: 'Chip' },
    { value: uiScreenRoutes.list, text: 'List' },
  ];

  const UI_decoratorsOptions = [
    { value: uiScreenRoutes.decorators, text: 'Divider etc.' },
  ];

  const UI_inputOptions = [
    { value: uiScreenRoutes.input, text: 'Input' },
  ];

  const UI_interactiveOptions = [
    { value: uiScreenRoutes.buttons, text: 'Buttons' },
    { value: uiScreenRoutes.touchable, text: 'Touchable' },
  ];

  const UI_layoutOptions = [
    { value: uiScreenRoutes.layouts, text: 'Layouts' },
  ];

  const UI_menuOptions = [
    { value: uiScreenRoutes.menulist, text: 'Menu List' },
  ];

  const UI_modalOptions = [
    { value: uiScreenRoutes.dialog, text: 'Dialog' },
    { value: uiScreenRoutes.popup, text: 'Popup' },
  ];

  const UI_optionsOptions = [
    { value: uiScreenRoutes.flatOptions, text: 'Flat options' },
    { value: uiScreenRoutes.nestedOptions, text: 'Nested options' },
  ];

  const UI_selectionsOptions = [
    { value: uiScreenRoutes.selections, text: 'Selections and toggles' },
  ];

  const UI_textOptions = [
    { value: uiScreenRoutes.icon, text: 'Icon' },
    { value: uiScreenRoutes.text, text: 'Text' },
    { value: uiScreenRoutes.textVariants, text: 'Text variants' },
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

  /******************************************************************************************************************
   * Render
   ******************************************************************************************************************/
  return (
    <Nav.ScreenLayout title='UI elements'>
      <UI.VerticalLayout constraint='scroll' gap={1}>

        <UI.Box p={1}>
          <UI.Text variant='titleLarge'>UI Elements Showcase</UI.Text>
          <UI.Text variant='bodyMedium' top={1}>
            Reusable UI primitive elements, including layout, text, inputs etc.
          </UI.Text>
        </UI.Box>

        <UI.Box>
          <UI.AccordionContainer sections={UI_SECTIONS}>
            {UI_SECTION_CONFIG.map((section, idx) => (
              <UI.MenuList
                key={section.header.text}
                options={section.options}
                onSelect={(routeName) => navigate(routeName)}
                showDividers
                align='center'
              />
            ))}
          </UI.AccordionContainer>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(UIElemsScreen);
