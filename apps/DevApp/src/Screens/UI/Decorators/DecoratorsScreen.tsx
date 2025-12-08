import React, { memo } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Decorators demo
 *
 * Decorators are lightweight, non-interactive UI elements that enhance structure,
 * grouping, and readability without affecting layout flow. They add subtle visual
 * cues to separate or organize content.
 *
 * Available decorators:
 * - Divider: a thin separator for grouping related sections
 ******************************************************************************************************************/
const DecoratorsScreen: Screen.ScreenType = () => {
  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Decorators enhance structure and clarity in your UI. They do not hold
          content or affect layout directly. Instead, they support the surrounding
          components by providing visual separation.
        </UI.Text>

        {/* Divider */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Divider</UI.Text>

        <UI.Text variant='labelMedium' color='label'>
          A thin separator used to divide related sections. Dividers help break
          content into logical groups for better readability.
        </UI.Text>

        {/* Horizontal divider demo */}
        <UI.Box mt={2}>
          <UI.Text variant='bodySmall'>Above divider (horizontal)</UI.Text>
          <UI.Divider spacing={1} />
          <UI.Text variant='bodySmall'>Below divider (horizontal)</UI.Text>
        </UI.Box>

        {/* Vertical divider demo */}
        <UI.Box mt={3}>
          <UI.Text variant='labelMedium' color='label'>
            Vertical divider inside a row
          </UI.Text>

          <UI.Box mt={2}>
            <UI.HorizontalLayout dir='row' align='center' gap={2}>
              <UI.Text variant='bodySmall'>Left</UI.Text>
              <UI.Divider orientation='vertical' spacing={1} />
              <UI.Text variant='bodySmall'>Right</UI.Text>
            </UI.HorizontalLayout>
          </UI.Box>
        </UI.Box>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(DecoratorsScreen);
