import React, { memo, useContext, createContext } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppBar } from './AppBar';
import { PadSpacingValue } from '../Types';
import { useAppTheme } from '../App/AppTheme';

/******************************************************************************************************************
 * Screen layout defaults context.
 *
 * @property value - ScreenLayoutProps that acts as app-wide defaults, provided by Root
 ******************************************************************************************************************/
export const ScreenLayoutContext = createContext<ScreenLayoutProps>({});

export type ScreenLayoutProps = {
  showTitle?: boolean;
  title?: string;
  showBack?: boolean;
  LeftContent?: React.ReactNode;
  RightContent?: React.ReactNode;
  appbarBottomMargin?: PadSpacingValue;
  children?: React.ReactNode;
};

/******************************************************************************************************************
 * Screen layout — Base view for screens.
 * - Use this in each screen to render consistent base screen layout (AppBar, SafeAreaView etc).
 * - Put all wrapper views here.
 * 
 * @property showTitle?     - To show title text for the AppBar (default: false)
 * @property title?         - Title text for the AppBar (defaults to current route name) if showTitle is true
 * @property showBack?      - Show a back button
 * @property LeftContent?   - Optional component rendered in the AppBar’s left slot (after back button).
 * @property RightContent?  - Optional component rendered in the AppBar’s right slot (after LeftContent).
 * @property appbarBottomMargin?  - Margin below appbar
 * @property children?      - Screen content rendered below the AppBar inside a SafeAreaView
 *
 * @usage
 * ```tsx
 *  return (
 *    <Nav.ScreenLayout>
 *      ...
 *    </Nav.ScreenLayout>
 *  );
 * ```
 ******************************************************************************************************************/
export const ScreenLayout: React.FC<ScreenLayoutProps> = memo((props) => {
  const defaults = useContext(ScreenLayoutContext);
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const route = useRoute();

  /****************************************************************************************************************
   * Merge strategy:
   * - If a prop is explicitly provided (even null / empty string), use it.
   * - Only fall back to defaults when the prop is strictly undefined.
   ****************************************************************************************************************/
  const showTitle =
    props.showTitle !== undefined
      ? props.showTitle
      : defaults.showTitle !== undefined
        ? defaults.showTitle
        : false;

  const title =
    props.title !== undefined
      ? props.title
      : defaults.title !== undefined
        ? defaults.title
        : undefined;

  const LeftContent =
    props.LeftContent !== undefined
      ? props.LeftContent
      : defaults.LeftContent !== undefined
        ? defaults.LeftContent
        : undefined;

  const RightContent =
    props.RightContent !== undefined
      ? props.RightContent
      : defaults.RightContent !== undefined
        ? defaults.RightContent
        : undefined;

  const explicitShowBack =
    props.showBack !== undefined
      ? props.showBack
      : defaults.showBack !== undefined
        ? defaults.showBack
        : undefined;

  const appbarBottomMargin =
    props.appbarBottomMargin !== undefined
      ? props.appbarBottomMargin
      : defaults.appbarBottomMargin !== undefined
        ? defaults.appbarBottomMargin
        : 2;

  const computedTitle =
    title !== undefined && title !== null
      ? title
      : route?.name?.replace(/^./, (c: string) => c.toUpperCase());

  const canGoBack =
    typeof (navigation as any).canGoBack === 'function'
      ? (navigation as any).canGoBack()
      : false;
  const showBackFinal = explicitShowBack !== undefined ? explicitShowBack : canGoBack;

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <AppBar
        title={showTitle ? computedTitle : undefined}
        onBack={showBackFinal ? () => (navigation as any).goBack() : undefined}
        left={LeftContent}
        right={RightContent}
      />
      {props.children}
    </View>
  );
});

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});