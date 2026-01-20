import React, { memo } from 'react';
import { View } from 'react-native';
import { Nav, UI, Manager } from 'framework';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * Box demo & usage guide
 *
 * Box is a low-level layout primitive.
 * It renders a View and applies spacing, flex, alignment, and optional dimensions.
 *
 * Common props:
 * - bgColor: background color
 * - flex: flex-grow value
 * - dir: 'row' | 'column'
 * - align: alignItems
 * - justify: justifyContent
 * - self: alignSelf
 * - w, h: width / height (numbers or percentages)
 *
 * Spacing props (PadSpacingValue):
 * - p, m         → uniform padding / margin
 * - ph, pv       → horizontal / vertical
 * - pt, pr, pb, pl
 * - mt, mr, mb, ml
 *
 * PadSpacingValue is scaled by theme.design.padSize:
 *  0 = none
 *  1 = 1× base spacing
 *  2 = 2× base spacing
 *  3 = 3× base spacing
 *  4 = 4× base spacing
 ******************************************************************************************************************/
const BoxScreen: Nav.ScreenType = () => {
  const { isDarkMode } = Manager.useAppSettings();
  const { theme } = Manager.useAppTheme();
  const colors = getDemoColors(isDarkMode);

  return (
    <Nav.ScreenLayout showTitle title='Box'>
      <UI.VerticalLayout constraint='scroll' flex={1} pad={2} gap={1}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Box is a drawable container used to wrap a single piece of UI.
          It does not position siblings, it only styles itself.
        </UI.Text>

        <UI.LabelText variant='bodySmall'>
          * Use Layouts instead for structure.
        </UI.LabelText>

        {/* Padding vs margin */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Padding vs margin</UI.Text>

        <UI.LabelText>
          Padding adds space inside the box. Margin adds space outside it.
        </UI.LabelText>

        <View style={{ backgroundColor: colors.green_1 }}>
          <UI.Box bgColor={colors.green_3} p={1} m={1}>
            <UI.Text color={theme.colors.surface}>
              p=1 (inside), m=1 (outside)
            </UI.Text>
          </UI.Box>
        </View>

        {/* Direction */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Direction (row / column)</UI.Text>

        <UI.LabelText>
          Use dir to control how children are laid out.
        </UI.LabelText>

        <UI.Box dir='row' bgColor={colors.neutral_2} p={1} mt={1}>
          <UI.Box bgColor={colors.amber_3} p={1} mr={1}>
            <UI.Text>Row</UI.Text>
          </UI.Box>
          <UI.Box bgColor={colors.purple_3} p={1}>
            <UI.Text>Row</UI.Text>
          </UI.Box>
        </UI.Box>

        <UI.Box bgColor={colors.neutral_2} p={1} mt={1}>
          <UI.Box bgColor={colors.amber_3} p={1} mb={1}>
            <UI.Text>Column</UI.Text>
          </UI.Box>
          <UI.Box bgColor={colors.purple_3} p={1}>
            <UI.Text>Column</UI.Text>
          </UI.Box>
        </UI.Box>

        {/* Width / height */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Width and height</UI.Text>

        <UI.LabelText>
          Use w and h to explicitly size a Box. Values match React Native View styles.
        </UI.LabelText>

        <UI.Box dir='row' mt={1} bgColor={colors.neutral_2} p={1} align='center'>
          <UI.Box bgColor={colors.amber_3} w={80} h={80} justify='center' align='center'>
            <UI.Text variant='labelSmall'>80 × 80</UI.Text>
          </UI.Box>

          <UI.Box
            bgColor={colors.purple_3}
            w='60%'
            h={60}
            ml={1}
            justify='center'
            align='center'
          >
            <UI.Text variant='labelSmall'>60% wide</UI.Text>
          </UI.Box>
        </UI.Box>

        {/* Flex grow */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Flex grow</UI.Text>

        <UI.LabelText>
          Flex controls how much available space a Box consumes relative to siblings.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout dir='row' bgColor={colors.neutral_2} flex={1} pad={1} gap={1}>
            <UI.Box flex={1} bgColor={colors.green_2} p={1}>
              <UI.Text variant='labelSmall'>flex = 1</UI.Text>
            </UI.Box>

            <UI.Box flex={2} bgColor={colors.amber_3} p={1} ml={1}>
              <UI.Text variant='labelSmall'>flex = 2</UI.Text>
            </UI.Box>

            <UI.Box bgColor={colors.red_3} p={1} ml={1}>
              <UI.Text variant='labelSmall'>no flex</UI.Text>
            </UI.Box>
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Alignment */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Alignment (parent)</UI.Text>

        <UI.LabelText>
          Align and justify control how children are positioned inside the Box.
        </UI.LabelText>

        <UI.Box
          dir='row'
          align='center'
          justify='center'
          bgColor={colors.purple_2}
          mt={1}
          p={1}
          h={100}
        >
          <UI.Box bgColor={colors.purple_3} p={2}>
            <UI.Text variant='labelSmall'>Centered child</UI.Text>
          </UI.Box>
        </UI.Box>

        {/* Self alignment */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Self alignment (child override)</UI.Text>

        <UI.LabelText>
          Self lets a child override the parent's cross-axis alignment.
          This is also useful to prevent unwanted stretching.
        </UI.LabelText>

        <UI.Box bgColor={colors.cyan_1} p={1} mv={1} h={150}>
          <UI.Box bgColor={colors.cyan_2} p={1} self='flex-start' mt={1}>
            <UI.Text variant='labelSmall'>self="flex-start"</UI.Text>
          </UI.Box>

          <UI.Box bgColor={colors.cyan_2} p={1} self='center' mt={1}>
            <UI.Text variant='labelSmall'>self="center"</UI.Text>
          </UI.Box>

          <UI.Box bgColor={colors.cyan_3} p={1} self='flex-end' mt={1}>
            <UI.Text variant='labelSmall'>self="flex-end"</UI.Text>
          </UI.Box>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(BoxScreen);
