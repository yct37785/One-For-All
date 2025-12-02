import React, { memo, useState } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * TextInput demo
 *
 * This screen demonstrates:
 * - UI.TextInput: flat and outline variants
 * - Different types: text, email, password, search, numeric, phone
 ******************************************************************************************************************/
const TextInputScreen: Screen.ScreenType = () => {
  const [name, setName] = useState('');
  const [outlineName, setOutlineName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [disabledValue] = useState('Read-only value');

  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>
        {/* Header */}
        <UI.Text variant='bodyMedium'>
          TextInput provides a themed input field with support for flat and outline variants, keyboard types, and
          optional leading and trailing icons.
        </UI.Text>

        {/* TextInput · flat */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextInput · flat</UI.Text>

        <UI.Box mt={2}>
          <UI.TextInput
            type='text'
            variant='flat'
            label='Name'
            placeholder='Enter your name'
            value={name}
            onChange={setName}
          />
        </UI.Box>

        {/* TextInput · outline */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextInput · outline</UI.Text>

        <UI.Box mt={2}>
          <UI.TextInput
            type='text'
            variant='outline'
            label='Name (outline)'
            placeholder='Enter your name'
            value={outlineName}
            onChange={setOutlineName}
          />
        </UI.Box>

        {/* TextInput · email & password */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextInput · email & password</UI.Text>

        <UI.Box mt={2}>
          <UI.TextInput
            type='email'
            variant='outline'
            label='Email'
            placeholder='name@example.com'
            value={email}
            onChange={setEmail}
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
          />
        </UI.Box>

        {/* TextInput · search */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextInput · search</UI.Text>

        <UI.Box mt={2}>
          <UI.TextInput
            type='search'
            variant='flat'
            label='Search'
            placeholder='Search…'
            value={search}
            onChange={setSearch}
          />
        </UI.Box>

        {/* TextInput · numeric & phone */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextInput · numeric & phone</UI.Text>

        <UI.Box mt={2}>
          <UI.TextInput
            type='numeric'
            variant='outline'
            label='Amount'
            placeholder='0.00'
            value={amount}
            onChange={setAmount}
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
          />
        </UI.Box>

        {/* TextInput · disabled */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextInput · disabled</UI.Text>

        <UI.Box mt={2} mb={4}>
          <UI.TextInput
            type='text'
            variant='flat'
            label='Disabled'
            value={disabledValue}
            editable={false}
          />
        </UI.Box>
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(TextInputScreen);
