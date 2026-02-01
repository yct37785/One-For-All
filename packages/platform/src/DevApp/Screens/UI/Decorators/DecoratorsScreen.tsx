import React, { memo } from 'react';
import { Nav, UI, App } from 'framework';

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
const DecoratorsScreen: Nav.ScreenType = ({}) => {
  
  return (
    <Nav.ScreenLayout showTitle title='Decorators'>
      <UI.VerticalLayout constraint='scroll' flex={1} pad={2} gap={1}>

        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Decorators add visual separation and grouping. They just help the UI read better.
        </UI.Text>

        {/* Divider */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Divider</UI.Text>

        <UI.LabelText>
          Dividers help break content into logical groups for better readability.
        </UI.LabelText>

        {/* Horizontal divider demo */}
        <UI.Box mt={2}>
          <UI.Text variant='bodySmall'>Above divider (horizontal)</UI.Text>
          <UI.Divider spacing={1} />
          <UI.Text variant='bodySmall'>Below divider (horizontal)</UI.Text>
        </UI.Box>

        {/* Vertical divider demo */}
        <UI.Box mt={3}>
          <UI.LabelText>
            Vertical divider inside a row
          </UI.LabelText>

          <UI.Box mt={2}>
            <UI.HorizontalLayout align='center' flex={1} pad={1} gap={2}>
              <UI.Text variant='bodySmall'>Left</UI.Text>
              <UI.Divider orientation='vertical' spacing={1} />
              <UI.Text variant='bodySmall'>Right</UI.Text>
            </UI.HorizontalLayout>
          </UI.Box>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(DecoratorsScreen);
