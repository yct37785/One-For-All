import React, { useEffect, useRef, useState, memo } from 'react';
import {
  View,
  Text,
  TextInput as RNPTextInput,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { Icon } from '../Text/Icon';

/******************************************************************************************************************
 * Types.
 ******************************************************************************************************************/
export type InputKind = 'text' | 'numeric' | 'password' | 'search' | 'email' | 'phone';
export type InputVariant = 'flat' | 'outline';

type KeyboardType = React.ComponentProps<typeof RNPTextInput>['keyboardType'];
type AutoCapitalize = React.ComponentProps<typeof RNPTextInput>['autoCapitalize'];

/******************************************************************************************************************
 * Helpers.
 ******************************************************************************************************************/
const getKeyboardTypeForType = (type: InputKind): KeyboardType => {
  switch (type) {
    case 'numeric':
      return 'number-pad';
    case 'email':
      return 'email-address';
    case 'phone':
      return 'phone-pad';
    case 'password':
    case 'search':
    case 'text':
    default:
      return 'default';
  }
};

const getAutoCapitalizeForType = (type: InputKind): AutoCapitalize => {
  switch (type) {
    case 'email':
    case 'password':
    case 'search':
      return 'none';
    default:
      return 'sentences';
  }
};

const getAutoCorrectForType = (type: InputKind): boolean => {
  switch (type) {
    case 'email':
    case 'password':
    case 'search':
    case 'numeric':
    case 'phone':
      return false;
    default:
      return true;
  }
};

/******************************************************************************************************************
 * TextInput props.
 ******************************************************************************************************************/
export type TextInputProps = {
  type?: InputKind;
  label?: string;
  variant?: InputVariant;
  value?: string;
  placeholder?: string;
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: StyleProp<ViewStyle | TextStyle>;
  autoFocus?: boolean;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  onPressTrailingIcon?: () => void;
};

/******************************************************************************************************************
 * A controlled text field for user input.
 ******************************************************************************************************************/
export const TextInput: React.FC<TextInputProps> = memo(
  ({
    type = 'text',
    label,
    variant = 'flat',
    value = '',
    placeholder = '',
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    style,
    autoFocus,
    maxLength,
    multiline,
    numberOfLines,
    editable = true,
    leadingIcon,
    trailingIcon,
    onPressTrailingIcon,
  }) => {
    const theme = useTheme();
    const inputRef = useRef<RNPTextInput | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    /******************************************************************************************************************
     * Auto-blur when keyboard hides (preserves your older behaviour)
     ******************************************************************************************************************/
    useEffect(() => {
      const listener = Keyboard.addListener('keyboardDidHide', () => {
        const ref = inputRef.current;
        if (ref && ref.blur && ref.isFocused && ref.isFocused()) {
          ref.blur();
        }
      });
      return () => listener.remove();
    }, []);

    /******************************************************************************************************************
     * Icon behaviours
     ******************************************************************************************************************/
    const handleTrailingPress = () => {
      if (!editable) return;

      if (onPressTrailingIcon) {
        onPressTrailingIcon();
        return;
      }

      if (type === 'password') {
        setPasswordVisible(v => !v);
      } else if (value.length > 0) {
        onChange('');
      }
    };

    // default leading icon for search
    let resolvedLeading = leadingIcon;
    if (!resolvedLeading && type === 'search') {
      resolvedLeading = 'magnify';
    }

    // default trailing icon for password / clear
    let resolvedTrailing = trailingIcon;
    if (!resolvedTrailing) {
      if (type === 'password') {
        resolvedTrailing = passwordVisible ? 'eye-off' : 'eye';
      } else if (value.length > 0) {
        resolvedTrailing = 'close';
      }
    }

    const secureTextEntry = type === 'password' && !passwordVisible;
    const keyboardType = getKeyboardTypeForType(type);
    const autoCapitalize = getAutoCapitalizeForType(type);
    const autoCorrect = getAutoCorrectForType(type);

    /******************************************************************************************************************
     * Variant (flat | outline) + focus styling
     ******************************************************************************************************************/
    const containerBase: StyleProp<ViewStyle> = [
      styles.containerBase,
      variant === 'outline'
        ? {
            borderWidth: 1,
            borderRadius: 8,
            borderColor: isFocused ? theme.colors.primary : theme.colors.outline,
            backgroundColor: theme.colors.surface,
          }
        : {
            borderRadius: 8,
            backgroundColor: theme.colors.surfaceVariant,
          },
      style as ViewStyle,
    ];

    const labelStyle: TextStyle = {
      marginBottom: 4,
      color: theme.colors.onSurfaceVariant,
      fontSize: 12,
    };

    const inputStyle: TextStyle = {
      flex: 1,
      paddingVertical: 6,
      fontSize: 16,
      color: theme.colors.onSurface,
    };

    const placeholderColor = theme.colors.onSurfaceVariant;

    /******************************************************************************************************************
     * Render
     ******************************************************************************************************************/
    return (
      <View>
        {label ? <Text style={labelStyle}>{label}</Text> : null}

        <View style={containerBase}>
          {/* Leading icon */}
          {resolvedLeading ? (
            <View style={styles.icon}>
              <Icon source={resolvedLeading} variant="sm" />
            </View>
          ) : null}

          {/* Main input */}
          <RNPTextInput
            ref={inputRef}
            style={inputStyle}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            onChangeText={onChange}
            onFocus={() => {
              setIsFocused(true);
              onFocus();
            }}
            onBlur={() => {
              setIsFocused(false);
              onBlur();
            }}
            editable={editable}
            autoFocus={autoFocus}
            maxLength={maxLength}
            multiline={multiline}
            numberOfLines={numberOfLines}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
          />

          {/* Trailing icon */}
          {resolvedTrailing ? (
            <TouchableOpacity style={styles.icon} onPress={handleTrailingPress}>
              <Icon source={resolvedTrailing} variant="sm" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  containerBase: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    minHeight: 44,
  },
  icon: {
    marginHorizontal: 6,
  },
});
