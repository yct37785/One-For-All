import React, { memo, useMemo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text, Modal, Button, Card, Portal } from 'react-native-paper';
import { useAppTheme } from '../../State/AppThemeManager';

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
 * 
 * @param title        - Title text displayed at the top
 * @param subtitle     - Optional subtitle text displayed below the title
 * @param children?    - Body content of the dialog
 * @param isVisible    - Whether the dialog is visible
 * @param onSubmit?    - Callback for confirm/submit action
 * @param onClose?     - Callback for close/cancel action
 * @param dismissable? - Whether tapping outside dismisses the dialog
 * @param submitText?  - Custom text for the submit button (default: 'Confirm')
 * @param closeText?   - Custom text for the close button (default: 'Close')
 * @param style?       - Optional style for the dialog container
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
    const { theme } = useAppTheme();

    const containerDynamic: StyleProp<ViewStyle> = {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.roundness,
    };

    const handleDismiss = () => {
      if (dismissable && onClose) {
        onClose();
      }
    };

    /**
     * style
     */
    const styles = useMemo(
      () =>
        StyleSheet.create({
          modal: {
            marginHorizontal: theme.design.padSize * 4,
          },
          container: {
            minHeight: 160,
            overflow: 'hidden',
          },
          title: {
            padding: theme.design.padSize * 2,
          },
          subtitle: {
            marginHorizontal: theme.design.padSize * 2,
            marginBottom: theme.design.padSize * 2,
          },
          childrenFallback: {
            flex: 1,
          },
          actionsWrapper: {
            width: '100%',
            padding: theme.design.padSize,
          },
          actionsRow: {
            justifyContent: 'flex-end',
          },
        }),
      [theme]
    );

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
