import React, { useEffect, useRef, useState, memo } from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useAppTheme } from '../../State/AppThemeManager';
import { Icon } from '../Text/Icon';

/******************************************************************************************************************
 * Types.
 ******************************************************************************************************************/
export type InputKind = 'text' | 'numeric' | 'password' | 'search' | 'email' | 'phone';
export type InputVariant = 'flat' | 'outline';

type KeyboardType = React.ComponentProps<typeof RNTextInput>['keyboardType'];
type AutoCapitalize = React.ComponentProps<typeof RNTextInput>['autoCapitalize'];

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
  required?: boolean;
  error?: boolean;
  errorText?: string;
  helperText?: string;
};

/******************************************************************************************************************
 * A controlled text field for user input.
 *
 * @param type           - Input preset (text, numeric, password, search, email, phone)
 * @param label          - Label text displayed above the input
 * @param variant        - Visual style: 'flat' or 'outline'
 * @param value          - Controlled input value
 * @param placeholder    - Placeholder text shown when empty
 * @param onChange       - Called on text change
 * @param onFocus        - Called when the input gains focus
 * @param onBlur         - Called when the input loses focus
 * @param style          - Optional container style
 * @param autoFocus      - Automatically focuses on mount
 * @param maxLength      - Maximum input length
 * @param multiline      - Enables multiline input
 * @param numberOfLines  - Number of visible lines when multiline is enabled
 * @param editable       - When false, makes field read-only
 * @param leadingIcon    - Icon displayed on the left
 * @param trailingIcon   - Icon displayed on the right
 * @param onPressTrailingIcon - Callback when trailing icon is pressed
 * @param required       - Shows '*' and triggers required validation on blur
 * @param error          - External error flag (overrides required)
 * @param errorText      - Message shown when error is true
 * @param helperText     - Informational text shown under the field
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

    required = false,
    error = false,
    helperText,
    errorText,
  }) => {
    const { theme } = useAppTheme();
    const inputRef = useRef<RNTextInput | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [touched, setTouched] = useState(false);

    /******************************************************************************************************************
     * Auto-blur when keyboard hides
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

    // leading icon default for search
    let resolvedLeading = leadingIcon;
    if (!resolvedLeading && type === 'search') {
      resolvedLeading = 'magnify';
    }

    // trailing icon defaults (password eye / clear)
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
     * Validation: required + external error
     ******************************************************************************************************************/
    const trimmedValue = value?.trim?.() ?? value;
    const isRequiredError = required && touched && trimmedValue.length === 0;
    const hasExternalError = !!error;
    const hasError = hasExternalError || isRequiredError;

    /******************************************************************************************************************
     * Variant (flat | outline) + focus + error styling
     ******************************************************************************************************************/
    const containerBase: StyleProp<ViewStyle> = [
      styles.containerBase,
      {
        paddingHorizontal: theme.design.input.paddingX,
        minHeight: theme.design.input.height,
      },
      variant === 'outline'
        ? {
            borderWidth: theme.design.input.outlineBorderWidth,
            borderRadius: theme.design.input.radius,
            borderColor: hasError
              ? theme.colors.error
              : isFocused
              ? theme.colors.primary
              : theme.colors.outline,
            backgroundColor: theme.colors.surface,
          }
        : {
            borderRadius: theme.design.input.radius,
            backgroundColor: theme.colors.surfaceVariant,
            borderWidth: hasError ? theme.design.input.outlineBorderWidth : 0,
            borderColor: hasError ? theme.colors.error : 'transparent',
          },
      style as ViewStyle,
    ];

    const labelStyle: TextStyle = {
      marginBottom: theme.design.input.labelSpacing,
      color: hasError ? theme.colors.error : theme.colors.onSurfaceVariant,
      fontSize: theme.design.input.labelFontSize,
    };

    const inputStyle: TextStyle = {
      flex: 1,
      paddingVertical: theme.design.input.paddingY,
      fontSize: theme.design.input.fontSize,
      color: theme.colors.onSurface,
    };

    const placeholderColor = theme.colors.onSurfaceVariant;

    let helperMessage: string | undefined;

    if (hasError) {
      if (hasExternalError && errorText) {
        // external validation decides the message
        helperMessage = errorText;
      } else if (isRequiredError) {
        // built-in required validation message
        helperMessage = 'This field is required.';
      } else {
        // fallback: show helperText in error color
        helperMessage = helperText;
      }
    } else {
      helperMessage = helperText;
    }

    const helperStyle: TextStyle = {
      marginTop: theme.design.input.helperSpacing,
      fontSize: theme.design.input.helperFontSize,
      color: hasError ? theme.colors.error : theme.colors.onSurfaceVariant,
    };

    /******************************************************************************************************************
     * Render
     ******************************************************************************************************************/
    return (
      <View>
        {label ? (
          <Text style={labelStyle}>
            {label}
            {required ? (
              <Text style={[labelStyle, { color: theme.colors.error }]}> *</Text>
            ) : null}
          </Text>
        ) : null}

        <View style={containerBase}>
          {/* Leading icon */}
          {resolvedLeading ? (
            <View style={[styles.icon, { marginHorizontal: theme.design.input.iconMarginX }]}>
              <Icon source={resolvedLeading} variant='sm' />
            </View>
          ) : null}

          {/* Main input */}
          <RNTextInput
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
              setTouched(true);
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
            <TouchableOpacity style={[styles.icon, { marginHorizontal: theme.design.input.iconMarginX }]} onPress={handleTrailingPress}>
              <Icon source={resolvedTrailing} variant='sm' />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Helper / error text */}
        {helperMessage ? <Text style={helperStyle}>{helperMessage}</Text> : null}
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
  },
  icon: {},
});
