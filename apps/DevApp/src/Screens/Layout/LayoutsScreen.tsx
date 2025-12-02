import React, { memo } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Colors and sizing helpers
 ******************************************************************************************************************/
const tier1 = '#f4e0c3ff';
const tier2 = '#bbe6fbff';
const tier3 = '#f990e9ff';
const small = 50;
const big = 80;

/******************************************************************************************************************
 * Small colored box used to visualize layouts
 ******************************************************************************************************************/
const BlockBox: React.FC<{
  i: number;
  width: number;
  height: number;
  bgColor?: string;
}> = ({ i, width, height, bgColor = tier2 }) => (
  <UI.Box
    align='center'
    justify='center'
    bgColor={bgColor}
    style={{ width, height }}
  >
    <UI.Text variant='labelSmall'>child {i}</UI.Text>
  </UI.Box>
);

/******************************************************************************************************************
 * Layouts demo
 *
 * Shows:
 * - VerticalLayout / HorizontalLayout with optional reverse
 * - constraint='wrap' and constraint='scroll'
 * - gap spacing
 * - Simple nested layouts for app-like structure
 ******************************************************************************************************************/
const LayoutScreen: Screen.ScreenType = () => {
  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Layouts arrange children in rows or columns with built-in padding, gap, wrapping, and scrolling. Use them
          for structure and use Box for smaller visual wrappers.
        </UI.Text>

        {/* 1. dir & reverse */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>1. Direction &amp; reverse</UI.Text>

        <UI.Box mt={1}>
          <UI.Text variant='bodySmall' color='label'>
            Switch between vertical and horizontal layouts and optionally reverse the child order.
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>HorizontalLayout (row)</UI.Text>
        </UI.Box>
        <UI.HorizontalLayout bgColor={tier1} gap={1}>
          <BlockBox i={1} width={small} height={small} />
          <BlockBox i={2} width={small} height={small} />
          <BlockBox i={3} width={small} height={small} />
        </UI.HorizontalLayout>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>HorizontalLayout (row + reverse)</UI.Text>
        </UI.Box>
        <UI.HorizontalLayout bgColor={tier1} gap={1} reverse>
          <BlockBox i={1} width={small} height={small} />
          <BlockBox i={2} width={small} height={small} />
          <BlockBox i={3} width={small} height={small} />
        </UI.HorizontalLayout>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>VerticalLayout (column)</UI.Text>
        </UI.Box>
        <UI.VerticalLayout bgColor={tier1} gap={1}>
          <BlockBox i={1} width={small} height={small} />
          <BlockBox i={2} width={small} height={small} />
          <BlockBox i={3} width={small} height={small} />
        </UI.VerticalLayout>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>VerticalLayout (column + reverse)</UI.Text>
        </UI.Box>
        <UI.VerticalLayout bgColor={tier1} gap={1} reverse>
          <BlockBox i={1} width={small} height={small} />
          <BlockBox i={2} width={small} height={small} />
          <BlockBox i={3} width={small} height={small} />
        </UI.VerticalLayout>

        {/* 2. constraint='wrap' */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>2. constraint='wrap'</UI.Text>

        <UI.Box mt={1}>
          <UI.Text variant='bodySmall' color='label'>
            Wrap lets children flow onto new rows (for rows) or new columns (for columns) when they run out of space.
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>VerticalLayout (wrap, fixed height)</UI.Text>
        </UI.Box>
        <UI.VerticalLayout constraint='wrap' bgColor={tier1} height={190} gap={1}>
          <BlockBox i={1} width={small} height={small} />
          <BlockBox i={2} width={big} height={small} />
          <BlockBox i={3} width={big} height={small} />
          <BlockBox i={4} width={small} height={big} />
          <BlockBox i={5} width={big} height={big} />
          <BlockBox i={6} width={big} height={small} />
        </UI.VerticalLayout>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>HorizontalLayout (wrap)</UI.Text>
        </UI.Box>
        <UI.HorizontalLayout constraint='wrap' bgColor={tier1} gap={1}>
          <BlockBox i={1} width={big} height={small} />
          <BlockBox i={2} width={small} height={big} />
          <BlockBox i={3} width={small} height={small} />
          <BlockBox i={4} width={big} height={small} />
          <BlockBox i={5} width={big} height={small} />
        </UI.HorizontalLayout>

        {/* 3. constraint='scroll' */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>3. constraint='scroll'</UI.Text>

        <UI.Box mt={1}>
          <UI.Text variant='bodySmall' color='label'>
            Scroll makes children scroll along the main axis: horizontal for rows, vertical for columns.
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>HorizontalLayout (horizontal scroll)</UI.Text>
        </UI.Box>
        <UI.HorizontalLayout constraint='scroll' bgColor={tier1} gap={1}>
          {Array.from({ length: 6 }).map((_, i) => (
            <BlockBox key={i} i={i + 1} width={big} height={small} />
          ))}
        </UI.HorizontalLayout>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Vertical layouts usually rely on the parent screen&apos;s scroll container instead of nesting scroll.
          </UI.Text>
        </UI.Box>

        {/* 4. gap */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>4. gap</UI.Text>

        <UI.Box mt={1}>
          <UI.Text variant='bodySmall' color='label'>
            gap adds spacing between children and behaves like internal padding, using the same PadSpacingValue scale
            as Box.
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>gap = 2</UI.Text>
        </UI.Box>
        <UI.HorizontalLayout bgColor={tier1} constraint='wrap' gap={2}>
          <BlockBox i={1} width={small} height={small} bgColor={tier2} />
          <BlockBox i={2} width={small} height={small} bgColor={tier2} />
          <BlockBox i={3} width={small} height={small} bgColor={tier2} />
        </UI.HorizontalLayout>

        {/* 5. Nested layouts */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>5. Nested layouts</UI.Text>

        <UI.Box mt={1}>
          <UI.Text variant='bodySmall' color='label'>
            Combine horizontal and vertical layouts to create simple app structures like headers, sidebars, and
            content areas.
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.VerticalLayout bgColor={tier1} gap={1}>
            {/* header row */}
            <UI.HorizontalLayout bgColor={tier2} gap={1}>
              <UI.Box flex={1}>
                <UI.Text variant='labelMedium'>Header</UI.Text>
              </UI.Box>
              <UI.Box>
                <UI.Button mode='text' onPress={() => {}}>
                  Action
                </UI.Button>
              </UI.Box>
            </UI.HorizontalLayout>

            {/* content row */}
            <UI.HorizontalLayout bgColor={tier2} gap={1}>
              <UI.VerticalLayout flex={1} bgColor={tier3} gap={1}>
                <UI.Text variant='labelSmall'>Sidebar</UI.Text>
              </UI.VerticalLayout>
              <UI.VerticalLayout flex={2} bgColor='#ffffff' gap={1}>
                <UI.Text variant='labelSmall'>Main content</UI.Text>
                <UI.Text variant='bodySmall' color='label'>
                  Layouts define structure; Box and other components fill in the details.
                </UI.Text>
              </UI.VerticalLayout>
            </UI.HorizontalLayout>

            {/* footer row */}
            <UI.HorizontalLayout bgColor={tier2} gap={1}>
              <UI.Text variant='labelSmall'>Footer area</UI.Text>
            </UI.HorizontalLayout>
          </UI.VerticalLayout>
        </UI.Box>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(LayoutScreen);
