import React, { memo } from 'react';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import { Box, BoxProps } from './Box';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { APP_BAR_H } from '../../Defaults';

export type KeyboardStickyBoxProps = BoxProps & {
  offset?: number;
};

/******************************************************************************************************************
 * Keyboard-aware sticky container:
 * - Wraps a Box and sticks it to the keyboard when it opens.
 * - Useful for chat composers, input toolbars, or bottom actions.
 * - Accepts all Box props for styling/layout.
 * - Offsets bottom nav bar and inset by default.
 *
 * Notes:
 *  - This component should usually wrap ONLY the sticky element (e.g. input bar),
 *    not the entire screen.
 *  - Offset can be used to compensate for any layout padding.
 *
 * @param offset?   - Extra offset when keyboard activated (layout padding etc.)
 * @param children  - Content rendered inside the Box
 * @param ...BoxProps
 *
 * @usage
 * ```tsx
 * <KeyboardStickyBox offset={16} p={1}>
 *   <InputComposer />
 * </KeyboardStickyBox>
 * ```
 * 
 * @TODO demo screen
 ******************************************************************************************************************/
export const KeyboardStickyBox: React.FC<KeyboardStickyBoxProps> = memo(
  ({ offset = 0, flex, children, ...boxProps }) => {
    const insets = useSafeAreaInsets();
    return (
      <KeyboardStickyView
        style={{ flex }}
        offset={{ closed: 0, opened: insets.bottom + APP_BAR_H + offset }}
      >
        <Box flex={flex} {...boxProps}>
          {children}
        </Box>
      </KeyboardStickyView>
    );
  }
);
