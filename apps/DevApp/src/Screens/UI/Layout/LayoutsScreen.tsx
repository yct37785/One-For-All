import React, { memo } from 'react';
import { Nav, UI, Manager } from 'framework';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * Colors and sizing helpers
 ******************************************************************************************************************/
const small = 50;
const big = 80;

/******************************************************************************************************************
 * Small colored box used to visualize layouts
 ******************************************************************************************************************/
const BlockBox: React.FC<{
  i: number;
  width: number;
  height: number;
  bgColor: string;
}> = ({ i, width, height, bgColor }) => {
  const { theme } = Manager.useAppTheme();
  return <UI.Box
    align='center'
    justify='center'
    bgColor={bgColor}
    style={{ width, height }}
  >
    <UI.Text variant='labelSmall' color={theme.colors.onSurfaceVariant}>
      child {i}
    </UI.Text>
  </UI.Box>
};

/******************************************************************************************************************
 * Layouts demo
 *
 * Shows:
 * - VerticalLayout / HorizontalLayout with optional reverse
 * - constraint='wrap' and constraint='scroll'
 * - gap spacing
 * - Simple nested layouts for app-like structure
 ******************************************************************************************************************/
const LayoutsScreen: Nav.ScreenType = ({}) => {
  const { isDarkMode } = Manager.useAppSettings();
  const { theme } = Manager.useAppTheme();
  const colors = getDemoColors(isDarkMode);

  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Layouts arrange children in rows or columns with built-in padding, gap,
          wrapping, and scrolling. Use them for structure and use Box for smaller
          visual wrappers.
        </UI.Text>

        {/* Direction */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Direction</UI.Text>

        <UI.Box mt={1}>
          <UI.LabelText>
            HorizontalLayout (row)
          </UI.LabelText>
        </UI.Box>
        <UI.HorizontalLayout bgColor={colors.tier1} gap={1}>
          <BlockBox i={1} width={small} height={small} bgColor={colors.tier2} />
          <BlockBox i={2} width={small} height={small} bgColor={colors.tier2} />
          <BlockBox i={3} width={small} height={small} bgColor={colors.tier2} />
        </UI.HorizontalLayout>

        <UI.Box mt={1}>
          <UI.LabelText>
            VerticalLayout (column)
          </UI.LabelText>
        </UI.Box>
        <UI.VerticalLayout bgColor={colors.tier1} gap={1}>
          <BlockBox i={1} width={small} height={small} bgColor={colors.tier2} />
          <BlockBox i={2} width={small} height={small} bgColor={colors.tier2} />
          <BlockBox i={3} width={small} height={small} bgColor={colors.tier2} />
        </UI.VerticalLayout>

        {/* Align */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>Align</UI.Text>
        <UI.Box>
          <UI.LabelText>
            align controls cross-axis alignment of children (e.g. vertical alignment in a horizontal layout).
          </UI.LabelText>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.LabelText>
            HorizontalLayout (align = 'center')
          </UI.LabelText>
        </UI.Box>
        <UI.HorizontalLayout
          bgColor={colors.tier1}
          gap={1}
          height={100}
          align='center'
        >
          <BlockBox i={1} width={small} height={small} bgColor={colors.tier2} />
          <BlockBox i={2} width={small} height={big} bgColor={colors.tier2} />
          <BlockBox i={3} width={small} height={small} bgColor={colors.tier2} />
        </UI.HorizontalLayout>

        {/* Constraint wrap */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>Constraint wrap</UI.Text>
        <UI.Box>
          <UI.LabelText>
            Wrap lets children flow onto new rows or new columns when they run out of space.
          </UI.LabelText>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.LabelText>
            VerticalLayout (wrap, parent height)
          </UI.LabelText>
        </UI.Box>
        <UI.VerticalLayout
          constraint='wrap'
          bgColor={colors.tier1}
          height={190}
          gap={1}
        >
          <BlockBox i={1} width={small} height={small} bgColor={colors.tier2} />
          <BlockBox i={2} width={big} height={small} bgColor={colors.tier2} />
          <BlockBox i={3} width={big} height={small} bgColor={colors.tier2} />
          <BlockBox i={4} width={small} height={big} bgColor={colors.tier2} />
          <BlockBox i={5} width={big} height={big} bgColor={colors.tier2} />
          <BlockBox i={6} width={big} height={small} bgColor={colors.tier2} />
        </UI.VerticalLayout>

        <UI.Box mt={1}>
          <UI.LabelText>
            HorizontalLayout (wrap, parent width)
          </UI.LabelText>
        </UI.Box>
        <UI.HorizontalLayout
          constraint='wrap'
          bgColor={colors.tier1}
          gap={1}
        >
          <BlockBox i={1} width={big} height={small} bgColor={colors.tier2} />
          <BlockBox i={2} width={small} height={big} bgColor={colors.tier2} />
          <BlockBox i={3} width={small} height={small} bgColor={colors.tier2} />
          <BlockBox i={4} width={big} height={small} bgColor={colors.tier2} />
          <BlockBox i={5} width={big} height={small} bgColor={colors.tier2} />
        </UI.HorizontalLayout>

        {/* Constraint scroll */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>Constraint scroll</UI.Text>

        <UI.Box mt={1}>
          <UI.LabelText>
            HorizontalLayout (horizontal scroll)
          </UI.LabelText>
        </UI.Box>
        <UI.HorizontalLayout constraint='scroll' bgColor={colors.tier1} gap={1}>
          {Array.from({ length: 6 }).map((_, i) => (
            <BlockBox
              key={i}
              i={i + 1}
              width={big}
              height={small}
              bgColor={colors.tier2}
            />
          ))}
        </UI.HorizontalLayout>

        {/* Gap */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>Gap</UI.Text>
        <UI.Box>
          <UI.LabelText>
            gap adds spacing between children.
          </UI.LabelText>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.LabelText>gap = 2</UI.LabelText>
        </UI.Box>
        <UI.HorizontalLayout
          bgColor={colors.tier1}
          constraint='wrap'
          gap={2}
        >
          <BlockBox i={1} width={small} height={small} bgColor={colors.tier2} />
          <BlockBox i={2} width={small} height={small} bgColor={colors.tier2} />
          <BlockBox i={3} width={small} height={small} bgColor={colors.tier2} />
        </UI.HorizontalLayout>

        {/* Nested layouts */}
        <UI.Divider spacing={2} />
        <UI.Text variant='titleMedium'>Nested layouts</UI.Text>
        <UI.Box>
          <UI.LabelText>
            Combine horizontal and vertical layouts to create simple app structures like headers, sidebars,
            and content areas.
          </UI.LabelText>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.VerticalLayout bgColor={colors.tier1} gap={1}>
            {/* Header */}
            <UI.HorizontalLayout bgColor={colors.tier2} gap={1}>
              <UI.Box flex={1}>
                <UI.LabelText>Header</UI.LabelText>
              </UI.Box>
              <UI.Box>
                <UI.Button mode='text' onPress={() => {}}>
                  Action
                </UI.Button>
              </UI.Box>
            </UI.HorizontalLayout>

            {/* Content */}
            <UI.HorizontalLayout bgColor={colors.tier2} gap={1}>
              <UI.VerticalLayout flex={1} bgColor={colors.tier3} gap={1}>
                <UI.LabelText>Sidebar</UI.LabelText>
              </UI.VerticalLayout>
              <UI.VerticalLayout flex={2} bgColor={colors.orangeBg} gap={1}>
                <UI.LabelText>Main content</UI.LabelText>
                <UI.Text variant='bodySmall'>
                  Layouts define structure; Box and other components fill in the details.
                </UI.Text>
              </UI.VerticalLayout>
            </UI.HorizontalLayout>

            {/* Footer */}
            <UI.HorizontalLayout bgColor={colors.tier2} gap={1}>
              <UI.LabelText>Footer area</UI.LabelText>
            </UI.HorizontalLayout>
          </UI.VerticalLayout>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(LayoutsScreen);
