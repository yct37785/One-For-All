import React, { memo, useState } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Selections demo
 *
 * This screen demonstrates single-selection UI, where only one option can be
 * active at a time. Use Picker for dropdown-style selection and RadioGroup
 * when you want options to remain visible side by side.
 ******************************************************************************************************************/
const SelectionsScreen: Screen.ScreenType = () => {
  const [pickerValue, setPickerValue] = useState<string>('red');
  const [radioValue, setRadioValue] = useState<string>('cat');

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
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Selections represent mutually exclusive choices where only one option
          can be active at a time. Use these components for “pick one” scenarios
          such as category, mode, or preference selection.
        </UI.Text>

        {/* Picker */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Picker</UI.Text>
        <UI.Text variant='labelMedium' color='label'>
          A dropdown selector for choosing a single value from a list.
        </UI.Text>

        <UI.Box mt={2}>
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
        <UI.Text variant='labelMedium' color='label'>
          A set of radio buttons for visible, side-by-side single selection.
        </UI.Text>

        <UI.Box mt={2}>
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

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(SelectionsScreen);
