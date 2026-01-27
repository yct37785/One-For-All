import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from '../UI/Data/Avatar';
import { Popup } from '../UI/Modal/Popup';
import { MenuList } from '../UI/Menu/MenuList';
import { VerticalLayout } from '../UI/Layout/Layout';
import { FB_useAuth, FBAuth_ProviderIdType } from '../Firebase/Auth/FBAuthService';
import type { MenuOption } from '../UI/Menu/MenuListItem';

/******************************************************************************************************************
 * ProfileMenu: renders the authenticated user's avatar and dropdown menu of account actions.
 ******************************************************************************************************************/
export const ProfileMenu = memo(() => {
  // auth props
  const { user, signIn, signOut } = FB_useAuth();
  const isAnon = !!user?.isAnonymous || !user;
  const photoURL = user?.photoURL || undefined;
  const email = user?.email || '';

  // menu options dependent on auth state
  const options: MenuOption[] = isAnon
    ? [{ text: 'Sign in with Google', value: 'signin', icon: 'google' }]
    : [
      {
        text: email ? `Signed in as ${email}` : 'Signed in',
        value: 'noop',
        icon: 'account',
        disabled: true,
      },
      { text: 'Sign out', value: 'signout', icon: 'logout' },
    ];

  // trigger sign-in/sign-out (hardcoded to Google for now)
  const handleSelect = async (value: string) => {
    if (value === 'signin') await signIn(FBAuth_ProviderIdType.Google);
    if (value === 'signout') await signOut();
  };

  return (
    <Popup
      triggerComp={<Avatar uri={photoURL} label="A" size="md" />}
      triggerContainerStyle={styles.triggerContainer}
    >
      <VerticalLayout flex={1} pad={1} gap={1}>
        <MenuList options={options} onSelect={handleSelect} dense showDividers />
      </VerticalLayout>
    </Popup>
  );
});

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  triggerContainer: {
    borderRadius: 9999,
    overflow: 'hidden', // ensures circular ripple
  },
});
