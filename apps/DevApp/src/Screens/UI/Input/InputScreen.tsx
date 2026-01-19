import React, { memo, useState } from 'react';
import { Nav, UI, Manager, Util } from 'framework';

/******************************************************************************************************************
 * TextInput demo
 *
 * TextInput is controlled:
 * - Parent owns the value and passes onChange(text).
 *
 * This screen demonstrates:
 * - Variants: flat vs outline
 * - Presets: text, email, password, search, numeric, phone
 * - Validation: required (built-in on blur) + custom error/errorText
 * - Behaviours: password eye toggle, clear button, search leading icon
 ******************************************************************************************************************/
const InputScreen: Nav.ScreenType = () => {
  const { theme } = Manager.useAppTheme();

  // basic
  const [name, setName] = useState('');
  const [nameOutline, setNameOutline] = useState('');

  // email (custom validation demo)
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  // password / search
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');

  // numeric / phone
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');

  // multiline value
  const [multilineVal, setMultilineVal] = useState(Util.loremIpsumShort);

  const disabledValue = 'Read-only value';

  /**
   * Demo validation: simple email format check (external error)
   */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailHasValue = email.trim().length > 0;
  const emailFormatInvalid = emailTouched && emailHasValue && !emailRegex.test(email);

  return (
    <Nav.ScreenLayout showTitle title='Input'>
      <UI.VerticalLayout constraint='scroll' pad={2}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          TextInput supports variants, input presets, helper/error text, and common behaviours like clear + password toggle.
        </UI.Text>

        {/* Variants */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Variants</UI.Text>

        <UI.Box mv={1}>
          <UI.TextInput
            type='text'
            variant='flat'
            label='Name (flat)'
            required
            placeholder='Enter your name'
            value={name}
            onChange={setName}
            helperText='Required: blur the field while empty to see the message.'
          />
        </UI.Box>

        <UI.Box mv={1}>
          <UI.TextInput
            type='text'
            variant='outline'
            label='Name (outline)'
            placeholder='Enter your name'
            value={nameOutline}
            onChange={setNameOutline}
            helperText='Outline border turns primary when focused.'
          />
        </UI.Box>

        {/* Presets + behaviours */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Presets and behaviours</UI.Text>

        <UI.LabelText>
          Presets automatically set keyboard type, auto-correct, and default icons (search / clear / password eye).
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.TextInput
            type='search'
            variant='flat'
            label='Search'
            placeholder='Search...'
            value={search}
            onChange={setSearch}
            helperText='Search shows a leading icon. Type to show the clear icon.'
          />
        </UI.Box>

        <UI.Box mt={2}>
          <UI.TextInput
            type='password'
            variant='outline'
            label='Password'
            placeholder='Enter your password'
            value={password}
            onChange={setPassword}
            helperText='Password shows an eye icon to toggle visibility.'
          />
        </UI.Box>

        <UI.Box mt={2}>
          <UI.TextInput
            type='numeric'
            variant='outline'
            label='Amount'
            placeholder='0.00'
            value={amount}
            onChange={setAmount}
            helperText='Numeric uses the number pad keyboard.'
          />
        </UI.Box>

        <UI.Box mt={2}>
          <UI.TextInput
            type='phone'
            variant='outline'
            label='Phone'
            placeholder='+65 1234 5678'
            value={phone}
            onChange={setPhone}
            helperText='Phone uses the phone pad keyboard.'
          />
        </UI.Box>

        {/* Validation (custom error) */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Validation</UI.Text>

        <UI.LabelText>
          Show custom validation (like email format).
        </UI.LabelText>

        <UI.Box mt={1}>
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
            errorText={emailFormatInvalid ? 'Please enter a valid email (e.g. name@example.com).' : undefined}
            helperText='Try typing "abc" then blur to see the format error.'
          />
        </UI.Box>

        {/* Disabled */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Disabled</UI.Text>

        <UI.LabelText>
          Makes the field read-only and disables icon actions.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.TextInput
            type='text'
            variant='flat'
            label='Read-only'
            value={disabledValue}
            editable={false}
            helperText='This value cannot be edited.'
          />
        </UI.Box>

        {/* Multiline */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Multiline</UI.Text>

        <UI.LabelText>
          Allows longer, multi-line input (e.g. notes, comments, descriptions).
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.TextInput
            type='text'
            variant='outline'
            label='Notes'
            placeholder='Write a longer message...'
            multiline
            numberOfLines={4}
            helperText='Multiline inputs grow vertically and support line breaks.'
            value={multilineVal}
            onChange={setMultilineVal}
          />
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(InputScreen);
