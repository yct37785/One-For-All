import React, { memo } from 'react';
import { Nav, UI, State } from 'framework';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * Visual helpers
 ******************************************************************************************************************/
const small = 50;
const big = 80;

const BlockBox: React.FC<{
  i: number;
  w: number;
  h: number;
  bgColor: string;
}> = ({ i, w, h, bgColor }) => {
  const { theme } = State.useAppTheme();

  return (
    <UI.Box
      align='center'
      justify='center'
      bgColor={bgColor}
      w={w}
      h={h}
    >
      <UI.LabelText variant='labelSmall'>
        {i}
      </UI.LabelText>
    </UI.Box>
  );
};

/******************************************************************************************************************
 * Layouts demo
 *
 * Shows:
 * - VerticalLayout / HorizontalLayout (dir)
 * - align (cross-axis)
 * - constraint: none | wrap | scroll
 * - gap + padding
 * - nested layouts for simple app structure
 ******************************************************************************************************************/
const LayoutsScreen: Nav.ScreenType = () => {
  const { isDarkMode } = State.useAppSettings();
  const { theme } = State.useAppTheme();
  const colors = getDemoColors(isDarkMode);

  return (
    <Nav.ScreenLayout showTitle title='Layouts'>
      <UI.VerticalLayout constraint='scroll' flex={1} pad={2} gap={1}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Layouts arrange children in rows or columns with padding, gap, wrapping, and optional scrolling.
        </UI.Text>

        <UI.LabelText variant='bodySmall'>
          * Use Layouts for structure. Use Box for smaller visual wrappers.
        </UI.LabelText>

        {/* Direction */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Direction</UI.Text>

        <UI.LabelText>HorizontalLayout (row)</UI.LabelText>
        <UI.HorizontalLayout bgColor={colors.neutral_1} flex={1} pad={1} gap={1}>
          <BlockBox i={1} w={small} h={small} bgColor={colors.cyan_2} />
          <BlockBox i={2} w={small} h={small} bgColor={colors.cyan_2} />
          <BlockBox i={3} w={small} h={small} bgColor={colors.cyan_2} />
        </UI.HorizontalLayout>

        <UI.Box mt={1}>
          <UI.LabelText>VerticalLayout (column)</UI.LabelText>
        </UI.Box>
        <UI.VerticalLayout bgColor={colors.neutral_1} flex={1} pad={1} gap={1}>
          <BlockBox i={1} w={small} h={small} bgColor={colors.cyan_2} />
          <BlockBox i={2} w={small} h={small} bgColor={colors.cyan_2} />
          <BlockBox i={3} w={small} h={small} bgColor={colors.cyan_2} />
        </UI.VerticalLayout>

        {/* Gap */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>Gap</UI.Text>

        <UI.LabelText>
          In wrap mode, gap applies between items and between wrapped rows/columns.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.LabelText>Basic (wrap + gap)</UI.LabelText>
        </UI.Box>
        <UI.HorizontalLayout
          constraint='wrap'
          bgColor={colors.neutral_1}
          flex={1}
          pad={1}
          gap={1}
        >
          <BlockBox i={1} w={big} h={small} bgColor={colors.green_2} />
          <BlockBox i={2} w={big} h={small} bgColor={colors.green_2} />
          <BlockBox i={3} w={big} h={small} bgColor={colors.green_2} />
          <BlockBox i={4} w={big} h={small} bgColor={colors.green_2} />
          <BlockBox i={5} w={big} h={small} bgColor={colors.green_2} />
        </UI.HorizontalLayout>

        <UI.Box mt={1}>
          <UI.LabelText>To have different gaps values for rows and columns, use nested layouts.</UI.LabelText>
        </UI.Box>
        <UI.VerticalLayout bgColor={colors.neutral_1} flex={1} pad={1} gap={2}>
          {/* gapV = 1 (this VerticalLayout's gap) */}
          <UI.HorizontalLayout gap={1}>
            {/* gapH = 1 (this HorizontalLayout's gap) */}
            <BlockBox i={1} w={small} h={small} bgColor={colors.cyan_2} />
            <BlockBox i={2} w={small} h={small} bgColor={colors.cyan_2} />
            <BlockBox i={3} w={small} h={small} bgColor={colors.cyan_2} />
          </UI.HorizontalLayout>

          <UI.HorizontalLayout gap={1}>
            <BlockBox i={4} w={small} h={small} bgColor={colors.cyan_2} />
            <BlockBox i={5} w={small} h={small} bgColor={colors.cyan_2} />
            <BlockBox i={6} w={small} h={small} bgColor={colors.cyan_2} />
          </UI.HorizontalLayout>
        </UI.VerticalLayout>

        {/* Align */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>Align</UI.Text>
        <UI.LabelText>
          align controls cross-axis alignment (vertical alignment in a row layout).
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.LabelText>align='center'</UI.LabelText>
        </UI.Box>
        <UI.HorizontalLayout bgColor={colors.neutral_1} flex={1} pad={1} gap={1} height={120} align='center'>
          <BlockBox i={1} w={small} h={small} bgColor={colors.purple_2} />
          <BlockBox i={2} w={small} h={big} bgColor={colors.purple_2} />
          <BlockBox i={3} w={small} h={small} bgColor={colors.purple_2} />
        </UI.HorizontalLayout>

        {/* Justify */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>Justify (main-axis)</UI.Text>

        <UI.LabelText>
          justify controls spacing along the main axis.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.LabelText>justify='space-between'</UI.LabelText>
        </UI.Box>
        <UI.HorizontalLayout
          bgColor={colors.neutral_1}
          height={80}
          pad={1}
          justify='space-between'
        >
          <BlockBox i={1} w={small} h={small} bgColor={colors.green_2} />
          <BlockBox i={2} w={big} h={small} bgColor={colors.green_2} />
          <BlockBox i={3} w={small} h={small} bgColor={colors.green_2} />
        </UI.HorizontalLayout>

        {/* Wrap */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>Constraint · wrap</UI.Text>
        <UI.LabelText>
          wrap lets children flow onto new rows/columns when space runs out.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.LabelText>VerticalLayout (wrap with fixed height)</UI.LabelText>
        </UI.Box>
        <UI.VerticalLayout
          constraint='wrap'
          bgColor={colors.neutral_1}
          height={190}
          flex={1} pad={1} gap={1}
        >
          <BlockBox i={1} w={small} h={small} bgColor={colors.amber_2} />
          <BlockBox i={2} w={big} h={small} bgColor={colors.amber_2} />
          <BlockBox i={3} w={big} h={small} bgColor={colors.amber_2} />
          <BlockBox i={4} w={small} h={big} bgColor={colors.amber_2} />
          <BlockBox i={5} w={big} h={big} bgColor={colors.amber_2} />
          <BlockBox i={6} w={big} h={small} bgColor={colors.amber_2} />
        </UI.VerticalLayout>

        <UI.Box mt={1}>
          <UI.LabelText>HorizontalLayout (wrap)</UI.LabelText>
        </UI.Box>
        <UI.HorizontalLayout
          constraint='wrap'
          bgColor={colors.neutral_1}
          flex={1} pad={1} gap={1}
        >
          <BlockBox i={1} w={big} h={small} bgColor={colors.amber_2} />
          <BlockBox i={2} w={small} h={big} bgColor={colors.amber_2} />
          <BlockBox i={3} w={small} h={small} bgColor={colors.amber_2} />
          <BlockBox i={4} w={big} h={small} bgColor={colors.amber_2} />
          <BlockBox i={5} w={big} h={small} bgColor={colors.amber_2} />
        </UI.HorizontalLayout>

        {/* Scroll */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>Constraint · scroll</UI.Text>
        <UI.LabelText>
          scroll enables a scroll container (horizontal for rows, vertical for columns).
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.LabelText>HorizontalLayout (scroll)</UI.LabelText>
        </UI.Box>
        <UI.HorizontalLayout constraint='scroll' bgColor={colors.neutral_1} flex={1} pad={1} gap={1}>
          {Array.from({ length: 8 }).map((_, i) => (
            <BlockBox key={i} i={i + 1} w={big} h={small} bgColor={colors.green_2} />
          ))}
        </UI.HorizontalLayout>

        {/* Nested layouts */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>Nested layouts</UI.Text>
        <UI.LabelText>
          Combine vertical + horizontal layouts to form simple app structure.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.VerticalLayout bgColor={colors.neutral_1} flex={1} pad={1} gap={1}>

            {/* Header */}
            <UI.HorizontalLayout bgColor={colors.neutral_2} flex={1} pad={1} gap={1} align='center'>
              <UI.Box flex={1}>
                <UI.LabelText>Header</UI.LabelText>
              </UI.Box>
              <UI.Box>
                <UI.Button mode='text' onPress={() => {}}>
                  Action
                </UI.Button>
              </UI.Box>
            </UI.HorizontalLayout>

            {/* Body */}
            <UI.HorizontalLayout bgColor={colors.neutral_2} flex={1} pad={1} gap={1}>
              <UI.VerticalLayout bgColor={colors.cyan_1} flex={1} pad={1} gap={1}>
                <UI.LabelText>Sidebar</UI.LabelText>
              </UI.VerticalLayout>

              <UI.VerticalLayout bgColor={colors.purple_1} flex={2} pad={1} gap={1}>
                <UI.LabelText>Main</UI.LabelText>
                <UI.Text variant='bodySmall' color={theme.colors.onSurfaceVariant}>
                  Layouts define structure; Box and other components fill in the details.
                </UI.Text>
              </UI.VerticalLayout>
            </UI.HorizontalLayout>

            {/* Footer */}
            <UI.HorizontalLayout bgColor={colors.neutral_2} flex={1} pad={1} gap={1}>
              <UI.LabelText>Footer</UI.LabelText>
            </UI.HorizontalLayout>

          </UI.VerticalLayout>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(LayoutsScreen);
