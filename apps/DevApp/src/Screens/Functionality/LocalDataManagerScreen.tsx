import React, { memo, useEffect, useState } from 'react';
import { Screen, UI, Manager } from 'framework';

/******************************************************************************************************************
 * LocalDataManager demo
 *
 * This screen demonstrates how to use LocalDataManager (useLocalData) to:
 * - Persist simple values using setItem(key, value)
 * - Read them back using getItem<T>(key)
 * - Clear all local data and re-seed defaults via clear()
 *
 * All operations are async and backed directly by AsyncStorage.
 ******************************************************************************************************************/
const LocalDataManagerScreen: Screen.ScreenType = ({}) => {
  const { getItem, setItem, clear } = Manager.useLocalData();

  /******************************************************************************************************************
   * Demo state
   *
   * These are local mirrors of values stored under:
   * - 'demoFlag' (boolean)
   * - 'demoCounter' (number)
   * - 'demoName' (string)
   ******************************************************************************************************************/
  const [demoFlag, setDemoFlag] = useState<boolean>(false);
  const [demoCounter, setDemoCounter] = useState<number>(0);
  const [demoName, setDemoName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /******************************************************************************************************************
   * Load initial values from LocalDataManager on mount.
   *
   * Note:
   * - getItem is async and reads directly from AsyncStorage each call.
   * - If a key has a default in localDataDefaults, it will be seeded when missing.
   ******************************************************************************************************************/
  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        const [storedFlag, storedCounter, storedName] = await Promise.all([
          getItem<boolean>('demoFlag'),
          getItem<number>('demoCounter'),
          getItem<string>('demoName'),
        ]);

        if (!isActive) return;

        setDemoFlag(!!storedFlag);
        setDemoCounter(storedCounter ?? 0);
        setDemoName(storedName ?? '');
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isActive = false;
    };
  }, [getItem]);

  /******************************************************************************************************************
   * Handlers
   ******************************************************************************************************************/
  const handleToggleFlag = async () => {
    const next = !demoFlag;
    setDemoFlag(next);
    await setItem('demoFlag', next);
  };

  const handleIncrementCounter = async () => {
    const next = demoCounter + 1;
    setDemoCounter(next);
    await setItem('demoCounter', next);
  };

  const handleSaveName = async () => {
    await setItem('demoName', demoName);
  };

  const handleReload = async () => {
    setIsLoading(true);
    try {
      const [storedFlag, storedCounter, storedName] = await Promise.all([
        getItem<boolean>('demoFlag'),
        getItem<number>('demoCounter'),
        getItem<string>('demoName'),
      ]);

      setDemoFlag(!!storedFlag);
      setDemoCounter(storedCounter ?? 0);
      setDemoName(storedName ?? '');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = async () => {
    await clear();
    // local mirrors reset to "empty" values
    setDemoFlag(false);
    setDemoCounter(0);
    setDemoName('');
  };

  /******************************************************************************************************************
   * Render
   ******************************************************************************************************************/
  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Header */}
        <UI.Text variant='bodyMedium'>
          LocalDataManager provides simple getItem / setItem / clear APIs.
          Values are loaded on demand from storage.
        </UI.Text>

        {isLoading && (
          <UI.Box mt={1}>
            <UI.Text variant='labelSmall' color='label'>
              Loading demo values from local storage...
            </UI.Text>
          </UI.Box>
        )}

        {/* Boolean flag */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Boolean flag</UI.Text>

        <UI.Text variant='labelMedium' color='label'>
          Toggles a boolean stored under the key &apos;demoFlag&apos;.
        </UI.Text>

        <UI.Box mt={2}>
          <UI.Text variant='bodySmall'>
            Current value: {demoFlag ? 'true' : 'false'}
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button
            mode='contained'
            onPress={handleToggleFlag}
            disabled={isLoading}
          >
            Toggle &amp; save
          </UI.Button>
        </UI.Box>

        {/* Counter */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Counter</UI.Text>

        <UI.Text variant='labelMedium' color='label'>
          Increments a numeric value stored under &apos;demoCounter&apos;.
        </UI.Text>

        <UI.Box mt={2}>
          <UI.Text variant='bodySmall'>
            Current value: {demoCounter}
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button
            mode='contained'
            onPress={handleIncrementCounter}
            disabled={isLoading}
          >
            Increment &amp; save
          </UI.Button>
        </UI.Box>

        {/* Text value */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Text value</UI.Text>

        <UI.Text variant='labelMedium' color='label'>
          Stores a short text string under &apos;demoName&apos;.
        </UI.Text>

        <UI.Box mt={2}>
          <UI.TextInput
            label='Name'
            value={demoName}
            placeholder='Enter a name...'
            onChange={setDemoName}
          />
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button
            mode='contained'
            onPress={handleSaveName}
            disabled={isLoading}
          >
            Save name to local storage
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Stored value (local mirror): {demoName || '(empty)'}
          </UI.Text>
        </UI.Box>

        {/* Reload & clear */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Reload &amp; clear</UI.Text>

        <UI.Text variant='labelMedium' color='label'>
          Reload reads from storage again; Clear removes all keys and re-seeds defaults.
        </UI.Text>

        <UI.Box mt={2}>
          <UI.Button
            mode='outlined'
            onPress={handleReload}
          >
            Reload from storage
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1} mb={4}>
          <UI.Button
            mode='text'
            onPress={handleClearAll}
          >
            Clear all local data (and re-seed defaults)
          </UI.Button>
        </UI.Box>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(LocalDataManagerScreen);
