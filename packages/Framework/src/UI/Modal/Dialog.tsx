import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text, Modal, Button, Card, useTheme, Portal } from 'react-native-paper';
import * as Const from '../../Const';

/******************************************************************************************************************
 * Dialog props.
 * 
 * @property title        - Title text displayed at the top
 * @property subtitle     - Optional subtitle text displayed below the title
 * @property children?    - Body content of the dialog
 * @property isVisible    - Whether the dialog is visible
 * @property onSubmit?    - Callback for confirm/submit action
 * @property onClose?     - Callback for close/cancel action
 * @property dismissable? - Whether tapping outside dismisses the dialog
 * @property submitText?  - Custom text for the submit button (default: 'Confirm')
 * @property closeText?   - Custom text for the close button (default: 'Close')
 * @property style?       - Optional style for the dialog container
 ******************************************************************************************************************/
export type DialogProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  isVisible: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
  dismissable?: boolean;
  submitText?: string;
  closeText?: string;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A modal dialog surface for confirmations and focused decisions.
 ******************************************************************************************************************/
export const Dialog: React.FC<DialogProps> = memo(
  ({
    title,
    subtitle,
    children,
    isVisible,
    onSubmit,
    onClose,
    dismissable = false,
    submitText = 'Confirm',
    closeText = 'Close',
    style,
  }) => {
    const theme = useTheme();

    const containerDynamic: StyleProp<ViewStyle> = {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.roundness,
    };

    const handleDismiss = () => {
      if (dismissable && onClose) {
        onClose();
      }
    };

    return (
      <Portal>
        <Modal
          visible={isVisible}
          dismissable={dismissable}
          onDismiss={handleDismiss}
          contentContainerStyle={[styles.modal, style]}
        >
          <View style={[styles.container, containerDynamic]}>
            {title ? (
              <Text style={styles.title} variant="titleLarge">
                {title}
              </Text>
            ) : null}

            {subtitle ? (
              <Text style={styles.subtitle}>{subtitle}</Text>
            ) : null}

            {children ?? <View style={styles.childrenFallback} />}

            <View style={styles.actionsWrapper}>
              {onClose && onSubmit && (
                <Card.Actions style={styles.actionsRow}>
                  <Button onPress={onClose}>{closeText}</Button>
                  <Button onPress={onSubmit}>{submitText}</Button>
                </Card.Actions>
              )}

              {onSubmit && !onClose && (
                <Card.Actions style={styles.actionsRow}>
                  <Button onPress={onSubmit}>{submitText}</Button>
                </Card.Actions>
              )}

              {onClose && !onSubmit && (
                <Card.Actions style={styles.actionsRow}>
                  <Button onPress={onClose}>{closeText}</Button>
                </Card.Actions>
              )}
            </View>
          </View>
        </Modal>
      </Portal>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  modal: {
    marginHorizontal: Const.padSize * 4,
  },
  container: {
    minHeight: 160,
    overflow: 'hidden',
  },
  title: {
    padding: Const.padSize * 2,
  },
  subtitle: {
    marginHorizontal: Const.padSize * 2,
    marginBottom: Const.padSize * 2,
  },
  childrenFallback: {
    flex: 1,
  },
  actionsWrapper: {
    width: '100%',
    padding: Const.padSize,
  },
  actionsRow: {
    justifyContent: 'flex-end',
  },
});
