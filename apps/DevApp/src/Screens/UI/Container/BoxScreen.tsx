import React, { memo } from 'react';
import { Nav, UI, Manager } from 'framework';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * Box demo & usage guide
 *
 * This screen demonstrates how to use UI.Box as a layout-friendly container.
 * - bgColor: string (background color)
 * - flex: number
 * - dir: 'row' | 'column'
 * - align: alignItems
 * - justify: justifyContent
 * - self: alignSelf
 * - p, m, ph, pv, pt, pr, pb, pl, mh, mv, mt, mr, mb, ml: PadSpacingValue (0–4)
 *
 * PadSpacingValue is a scaled spacing unit:
 *  0 = none
 *  1 = 1x base spacing
 *  2 = 2x base spacing
 *  3 = 3x base spacing
 *  4 = 4x base spacing
 ******************************************************************************************************************/
const BoxScreen: Nav.ScreenType = ({ navigate }) => {
  const { isDarkMode } = Manager.useAppSettings();
  const { theme } = Manager.useAppTheme();
  const colors = getDemoColors(isDarkMode);

  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Box is a drawable container that wraps content and applies flex layout, alignment, and spacing. It
          doesn't decide how siblings are arranged; instead, it acts as a flexible building block.
        </UI.Text>

        {/* Basic usage */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Basic usage</UI.Text>

        <UI.Text variant='labelMedium' color={theme.colors.onSurfaceVariant}>
          Drop-in replacement of View.
        </UI.Text>
        <UI.Box bgColor={colors.greenStrong} p={1} m={1}>
          <UI.Text color={theme.colors.surface}>Use Box like a View</UI.Text>
        </UI.Box>

        <UI.Text variant='labelMedium' color={theme.colors.onSurfaceVariant}>
          As a tiny wrapper around a single element just to add spacing, without
          changing layout flow.
        </UI.Text>
        <UI.Box m={1}>
          <UI.Box bgColor={colors.neutralAlt} p={1}>
            <UI.Text variant='labelSmall'>
              This inner Box only adds padding and background around the text.
            </UI.Text>
          </UI.Box>
        </UI.Box>

        {/* Padding */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Padding scale</UI.Text>

        <UI.Box dir='row'>
          <UI.Box bgColor={colors.neutral} p={0} m={1}>
            <UI.Text variant='labelSmall'>p=0</UI.Text>
          </UI.Box>
          <UI.Box bgColor={colors.neutral} p={1} m={1}>
            <UI.Text variant='labelSmall'>p=1</UI.Text>
          </UI.Box>
          <UI.Box bgColor={colors.neutral} p={2} m={1}>
            <UI.Text variant='labelSmall'>p=2</UI.Text>
          </UI.Box>
          <UI.Box bgColor={colors.neutral} p={3} m={1}>
            <UI.Text variant='labelSmall'>p=3</UI.Text>
          </UI.Box>
          <UI.Box bgColor={colors.neutral} p={4} m={1}>
            <UI.Text variant='labelSmall'>p=4</UI.Text>
          </UI.Box>
        </UI.Box>

        {/* Flex, direction, alignment */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Flex, direction & alignment</UI.Text>

        <UI.Text variant='labelMedium' color={theme.colors.onSurfaceVariant}>
          Row layout with different flex values
        </UI.Text>
        <UI.Box dir='row' bgColor={colors.neutralAlt} p={1} mv={1}>
          <UI.Box flex={1} bgColor={colors.greenSoft}>
            <UI.Text variant='labelSmall'>flex=1</UI.Text>
          </UI.Box>
          <UI.Box flex={2} bgColor={colors.amber} ml={1}>
            <UI.Text variant='labelSmall'>flex=2</UI.Text>
          </UI.Box>
          <UI.Box flex={0} bgColor={colors.red} ml={1}>
            <UI.Text variant='labelSmall'>flex=0 (no grow)</UI.Text>
          </UI.Box>
        </UI.Box>

        <UI.Text variant='labelMedium' color={theme.colors.onSurfaceVariant}>
          Row · justify="space-between"
        </UI.Text>
        <UI.Box dir='row' bgColor={colors.orangeBg} p={1} justify='space-between' mv={1}>
          <UI.Text variant='labelSmall'>Item A</UI.Text>
          <UI.Text variant='labelSmall'>Item B</UI.Text>
          <UI.Text variant='labelSmall'>Item C</UI.Text>
        </UI.Box>

        <UI.Text variant='labelMedium' color={theme.colors.onSurfaceVariant}>
          Column · justify="center" (vertical center) with fixed height
        </UI.Text>
        <UI.Box
          dir='column'
          justify='center'
          bgColor={colors.skyBg}
          p={1}
          mv={1}
          style={{ height: 120 }}
        >
          <UI.Text variant='labelSmall' color={theme.colors.primary}>
            content is vertically centered
          </UI.Text>
        </UI.Box>

        <UI.Text variant='labelMedium' color={theme.colors.onSurfaceVariant}>
          Row · align="center" (cross-axis alignment)
        </UI.Text>
        <UI.Box
          dir='row'
          align='center'
          bgColor={colors.purpleBg}
          p={1}
          mv={1}
          style={{ height: 80 }}
        >
          <UI.Box bgColor={colors.purpleA} p={1}>
            <UI.Text variant='labelSmall'>short</UI.Text>
          </UI.Box>
          <UI.Box bgColor={colors.purpleB} p={2} ml={1}>
            <UI.Text variant='labelSmall'>taller item</UI.Text>
          </UI.Box>
        </UI.Box>

        {/* Self alignment */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Self alignment</UI.Text>

        <UI.Text variant='labelMedium' color={theme.colors.onSurfaceVariant}>
          A child can control its own cross-axis alignment. This also fixes
          cases where a component stretches full width by default, self lets it size to
          content instead.
        </UI.Text>

        <UI.Box bgColor={colors.cyanBg} p={1} mv={1} style={{ height: 140 }}>
          <UI.Box bgColor={colors.cyanA} p={1} self='flex-start' mt={1}>
            <UI.Text variant='labelSmall'>self="flex-start"</UI.Text>
          </UI.Box>

          <UI.Box bgColor={colors.cyanB} p={1} self='center' mt={1}>
            <UI.Text variant='labelSmall'>self="center"</UI.Text>
          </UI.Box>

          <UI.Box bgColor={colors.cyanC} p={1} self='flex-end' mt={1}>
            <UI.Text variant='labelSmall'>self="flex-end"</UI.Text>
          </UI.Box>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(BoxScreen);
