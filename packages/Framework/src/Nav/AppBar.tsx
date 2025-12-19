import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Text } from 'react-native-paper';
import * as Const from '../Const';

/******************************************************************************************************************
 * AppBar props.
 * 
 * @property title?           - String title or a custom node via `TitleComponent`
 * @property onBack?          - If provided, renders a back button and calls this on press
 * @property left?            - Optional left-side content (renders after back button, flex 1)
 * @property right?           - Optional right-side content (e.g., actions, profile, flex 0)
 ******************************************************************************************************************/
export type AppBarProps = {
  title?: string;
  onBack?: () => void;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

/******************************************************************************************************************
 * A theme-aware top navigation bar that displays titles, navigation actions, and contextual controls.
 * 
 * @usage
 * ```tsx
 * <AppBar title='Settings' onBack={() => navigation.goBack()} right={<Avatar label='A' />} />
 * ```
 ******************************************************************************************************************/
export const AppBar: React.FC<AppBarProps> = memo(({ title, onBack, left, right }) => {

  return (
    <Appbar.Header elevated>
      {/* back btn */}
      {onBack ? (
        <Appbar.BackAction onPress={onBack} />
      ) : null}

      {/* title */}
      {title ? (
        <View style={onBack ? styles.titleWithBack : styles.titleNoBack}>
          <Text variant='titleLarge'>{title}</Text>
        </View>
      ) : null}

      {/* left slot (fills remaining width) */}
      <View style={styles.leftSlot}>
        {left ? <View style={styles.leftInner}>{left}</View> : null}
      </View>

      {/* right slot */}
      <View style={styles.rightSlot}>
        {right ? <View style={styles.rightInner}>{right}</View> : null}
      </View>
    </Appbar.Header>
  );
});

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  titleWithBack: {
    paddingLeft: 0,
  },
  titleNoBack: {
    paddingLeft: Const.padSize * 2,
  },
  leftSlot: {
    flex: 1,
    minWidth: 0, // allow inner text to ellipsize
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftInner: {
    marginLeft: Const.padSize,
    flex: 1, // lets child opt-in to grow if it uses flex styles
  },
  rightSlot: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightInner: {
    marginRight: Const.padSize,
  }
});
