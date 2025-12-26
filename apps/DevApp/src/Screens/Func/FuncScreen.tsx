import React, { memo } from 'react';
import { Nav, Manager, UI } from 'framework';
import { funcScreenRoutes } from './FuncRegistry';

/******************************************************************************************************************
 * Functionality showcase screen: Framework/src/Manager
 ******************************************************************************************************************/
const FuncScreen: Nav.ScreenType = ({ navigate }) => {
  const { isDarkMode } = Manager.useAppSettings();
  const { theme } = Manager.useAppTheme();

  /******************************************************************************************************************
   * Func section (Framework/src/UI)
   ******************************************************************************************************************/
  const func_localStorageOptions = [
    { value: funcScreenRoutes.localDataManager, text: 'Local Data Manager' },
  ];

  /******************************************************************************************************************
   * UI sections + mapped options
   ******************************************************************************************************************/
  const FUNC_SECTION_CONFIG = [
    { header: { text: 'Local Storage',      icon: 'database' },               options: func_localStorageOptions },
  ];

  const FUNC_SECTIONS = FUNC_SECTION_CONFIG.map(s => s.header);

  /******************************************************************************************************************
   * Render
   ******************************************************************************************************************/
  return (
    <Nav.ScreenLayout>
      <UI.VerticalLayout constraint='scroll' gap={1}>

        <UI.Box p={1}>
          <UI.Text variant='titleLarge'>Functionality Showcase</UI.Text>
          <UI.Text variant='bodyMedium' topPx={2}>
            Managers and application flows like data storage, authentication, or synchronization logic etc.
          </UI.Text>
        </UI.Box>

        <UI.Box>
          <UI.AccordionContainer sections={FUNC_SECTIONS}>
            {FUNC_SECTION_CONFIG.map((section, idx) => (
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

export default memo(FuncScreen);
