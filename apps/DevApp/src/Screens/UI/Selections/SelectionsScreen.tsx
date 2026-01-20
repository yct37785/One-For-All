import React, { memo, useState } from 'react';
import { Nav, UI, Manager } from 'framework';

/******************************************************************************************************************
 * Selections demo
 *
 * This screen demonstrates single-selection UI, where only one option can be
 * active at a time. Use Picker for dropdown-style selection and RadioGroup
 * when you want options to remain visible side by side.
 *
 * It also includes Switch, which is commonly used in settings screens to toggle
 * a single preference (e.g. dark mode).
 ******************************************************************************************************************/
const SelectionsScreen: Nav.ScreenType = ({}) => {
  const { theme } = Manager.useAppTheme();
  const [pickerValue, setPickerValue] = useState<string>('red');
  const [radioValue, setRadioValue] = useState<string>('cat');
  const [switchValue, setSwitchValue] = useState<boolean>(false);

  const pickerOptions = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
  ];

  const radioOptions = {
    cat: 'Cat',
    dog: 'Dog',
    bird: 'Bird',
  };

  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' flex={1} pad={2} gap={1}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Selection components help users pick a value or toggle a preference.
        </UI.Text>

        {/* Picker */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Picker</UI.Text>
        <UI.LabelText>
          A dropdown selector for choosing a single value from a list.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.Picker
            value={pickerValue}
            options={pickerOptions}
            onChange={setPickerValue}
          />
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='bodySmall'>
            Selected color: {pickerValue}
          </UI.Text>
        </UI.Box>

        {/* RadioGroup */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>RadioGroup</UI.Text>
        <UI.LabelText>
          A set of radio buttons for visible, side-by-side single selection.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.RadioGroup
            options={radioOptions}
            value={radioValue}
            onValueChange={setRadioValue}
          />
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='bodySmall'>
            Selected animal: {radioValue}
          </UI.Text>
        </UI.Box>

        {/* Switch */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Switch</UI.Text>
        <UI.LabelText>
          A binary toggle for enabling/disabling a preference.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.Switch
            value={switchValue}
            onValueChange={setSwitchValue}
          />
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='bodySmall'>
            Switch value: {switchValue ? 'On' : 'Off'}
          </UI.Text>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(SelectionsScreen);
