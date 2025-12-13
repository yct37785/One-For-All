import React, { memo } from 'react';
import { Nav, UI } from 'framework';

/******************************************************************************************************************
 * Icon demo
 *
 * This screen showcases the Icon component:
 * - Prefixed size variants (xs, sm, md, lg, xl)
 * - Semantic theme colors and custom colors
 * - Using icons inline and inside simple containers
 ******************************************************************************************************************/
const IconScreen: Nav.ScreenType = ({}) => {
  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Icon provides theme-aware vector icons with prefixed size variants and
          semantic colors. Use it to reinforce actions, statuses, or supporting
          visuals alongside text or buttons.
        </UI.Text>

        {/* Size variants */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Size variants</UI.Text>

        <UI.Text variant='labelMedium' color='label'>
          Use the variant prop to pick predefined icon sizes.
        </UI.Text>

        <UI.Box mt={2}>
          <UI.HorizontalLayout dir='row' gap={2} align='center'>
            <UI.Icon source='star' variant='xs' />
            <UI.Icon source='star' variant='sm' />
            <UI.Icon source='star' variant='md' />
            <UI.Icon source='star' variant='lg' />
            <UI.Icon source='star' variant='xl' />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Colors */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Colors</UI.Text>

        <UI.Text variant='labelMedium' color='label'>
          color uses theme tokens, customColor accepts any raw color string.
        </UI.Text>

        <UI.Box mt={2}>
          <UI.HorizontalLayout dir='row' gap={2} align='center'>
            <UI.Icon source='heart' color='default' />
            <UI.Icon source='heart' color='label' />
            <UI.Icon source='heart' color='primary' />
            <UI.Icon source='heart' color='secondary' />
            <UI.Icon source='heart' color='error' />
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Icon source='palette' customColor='#8e24aa' />
          <UI.Text variant='labelSmall' color='label'>
            Custom purple (#8e24aa)
          </UI.Text>
        </UI.Box>

        {/* Icons inside containers */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Icons inside containers</UI.Text>

        <UI.Text variant='labelMedium' color='label'>
          Icons can be composed with Box to create simple decorated blocks.
        </UI.Text>

        <UI.Box mt={2}>
          <UI.HorizontalLayout dir='row' gap={2} align='center'>
            <UI.Box bgColor='#e3f2fd' p={2}>
              <UI.Icon source='information' variant='lg' color='primary' />
            </UI.Box>

            <UI.Box bgColor='#fce4ec' p={2}>
              <UI.Icon source='flower' variant='lg' color='secondary' />
            </UI.Box>

            <UI.Box bgColor='#fff3e0' p={2}>
              <UI.Icon source='alert' variant='lg' color='error' />
            </UI.Box>
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Practical examples */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Practical examples</UI.Text>

        <UI.Text variant='labelMedium' color='label'>
          Combine icons with text or actions to give clearer meaning.
        </UI.Text>

        {/* Icon + label row */}
        <UI.Box mt={2}>
          <UI.HorizontalLayout dir='row' gap={1} align='center'>
            <UI.Icon source='map-marker' variant='md' color='primary' />
            <UI.Text variant='bodyMedium'>Gotham City</UI.Text>
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Status row */}
        <UI.Box mt={1}>
          <UI.HorizontalLayout dir='row' gap={1} align='center'>
            <UI.Icon source='check-circle' variant='sm' color='primary' />
            <UI.Text variant='labelSmall'>Active status</UI.Text>
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Icon badges using Box */}
        <UI.Box mt={2}>
          <UI.HorizontalLayout dir='row' gap={2} align='center'>
            <UI.Box bgColor='#eeeeee' p={2} style={{ borderRadius: 999 }}>
              <UI.Icon source='thumb-up' color='label' />
            </UI.Box>
            <UI.Box bgColor='#eeeeee' p={2} style={{ borderRadius: 999 }}>
              <UI.Icon source='thumb-down' color='label' />
            </UI.Box>
          </UI.HorizontalLayout>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(IconScreen);
