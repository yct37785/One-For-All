import React, { memo, useState } from 'react';
import { Nav, UI, Manager } from 'framework';

/******************************************************************************************************************
 * TextInput demo
 *
 * This screen demonstrates:
 * - UI.TextInput: flat and outline variants
 * - Required fields with '*' indicator and built-in blur validation
 * - Custom validation using error / errorText (e.g. email format)
 ******************************************************************************************************************/
const TextInputScreen: Nav.ScreenType = ({}) => {
  const { theme } = Manager.useAppTheme();
  const [name, setName] = useState('');
  const [outlineName, setOutlineName] = useState('');
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [disabledValue] = useState('Read-only value');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailHasValue = email.trim().length > 0;
  const emailFormatInvalid = emailTouched && emailHasValue && !emailRegex.test(email);

  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>
        {/* Header */}
        <UI.Text variant='bodyMedium'>
          TextInput supports flat and outline variants, required indicators, helper text, and simple error styling.
          To see validation in action:
        </UI.Text>

        {/* TextInput · flat (required) */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextInput · flat (required)</UI.Text>
        <UI.Text variant='labelMedium' color={theme.colors.onSurfaceVariant}>
          Leave required fields blank and tap elsewhere to trigger the required error.
        </UI.Text>

        <UI.Box mv={1}>
          <UI.TextInput
            type='text'
            variant='flat'
            label='Name'
            required
            placeholder='Enter your name'
            value={name}
            onChange={setName}
            helperText='This will be shown on your profile.'
          />
        </UI.Box>

        {/* TextInput · outline */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextInput · outline</UI.Text>

        <UI.Box mv={1}>
          <UI.TextInput
            type='text'
            variant='outline'
            label='Name (outline)'
            placeholder='Enter your name'
            value={outlineName}
            onChange={setOutlineName}
          />
        </UI.Box>

        {/* TextInput · email & password (with helper/error) */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextInput · email & password</UI.Text>
        <UI.Text variant='labelMedium' color={theme.colors.onSurfaceVariant}>
          For email, type an invalid address (e.g. 'abc') and blur the field to see a format error.
        </UI.Text>

        <UI.Box mv={1}>
          <UI.TextInput
            type='email'
            variant='outline'
            label='Email'
            required
            placeholder='name@example.com'
            value={email}
            onChange={setEmail}
            onBlur={() => setEmailTouched(true)}
            error={emailFormatInvalid}
            errorText={
              emailFormatInvalid
                ? 'Please enter a valid email (e.g. name@example.com).'
                : undefined
            }
            helperText='We’ll use this to contact you.'
          />
        </UI.Box>

        <UI.Box mv={1}>
          <UI.TextInput
            type='password'
            variant='outline'
            label='Password'
            placeholder='Enter your password'
            value={password}
            onChange={setPassword}
            helperText='Use at least 8 characters for a strong password.'
          />
        </UI.Box>

        {/* TextInput · search */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextInput · search</UI.Text>

        <UI.Box mv={1}>
          <UI.TextInput
            type='search'
            variant='flat'
            label='Search'
            placeholder='Search...'
            value={search}
            onChange={setSearch}
            helperText='Type to filter results.'
          />
        </UI.Box>

        {/* TextInput · numeric & phone */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextInput · numeric & phone</UI.Text>

        <UI.Box mv={1}>
          <UI.TextInput
            type='numeric'
            variant='outline'
            label='Amount'
            placeholder='0.00'
            value={amount}
            onChange={setAmount}
          />
        </UI.Box>

        <UI.Box mv={1}>
          <UI.TextInput
            type='phone'
            variant='outline'
            label='Phone'
            placeholder='+65 1234 5678'
            value={phone}
            onChange={setPhone}
            helperText='Include country code.'
          />
        </UI.Box>

        {/* TextInput · disabled */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextInput · disabled</UI.Text>

        <UI.Box mv={1}>
          <UI.TextInput
            type='text'
            variant='flat'
            label='Disabled'
            value={disabledValue}
            editable={false}
            helperText='This field cannot be edited.'
          />
        </UI.Box>
      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(TextInputScreen);
