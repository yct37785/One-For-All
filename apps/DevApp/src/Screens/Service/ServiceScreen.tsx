import React, { memo } from 'react';
import { Nav, App, UI } from 'framework';
import { serviceScreenRoutes } from './ServiceRegistry';

/******************************************************************************************************************
 * Service showcase screen: Framework/src/Manager
 ******************************************************************************************************************/
const ServiceScreen: Nav.ScreenType = ({ navigate }) => {
  const { isDarkMode } = App.useAppSettings();
  const { theme } = App.useAppTheme();

  /******************************************************************************************************************
   * Func section (Framework/src/UI)
   ******************************************************************************************************************/
  const serv_localDataOptions = [
    { value: serviceScreenRoutes.localKVStore, text: 'Local KV Store Service' },
  ];

  /******************************************************************************************************************
   * UI sections + mapped options
   ******************************************************************************************************************/
  const SERV_SECTION_CONFIG = [
    { header: { text: 'Local Data',      icon: 'database' },               options: serv_localDataOptions },
  ];

  const SERV_SECTIONS = SERV_SECTION_CONFIG.map(s => s.header);

  /******************************************************************************************************************
   * Render
   ******************************************************************************************************************/
  return (
    <Nav.ScreenLayout title='Functionality'>
      <UI.VerticalLayout constraint='scroll' flex={1} pad={2} gap={1}>

        <UI.Text variant='bodyMedium'>
          Application services like data storage, authentication, or synchronization logic etc.
        </UI.Text>

        <UI.Box mt={1}>
          <UI.AccordionContainer sections={SERV_SECTIONS}>
            {SERV_SECTION_CONFIG.map((section, idx) => (
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

export default memo(ServiceScreen);
