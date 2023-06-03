import { useCallback, useState } from 'react';

/**
 * @param {boolean} initialState
 * @returns {{value: boolean, setTrue: void, setFalse: void, toggle: (value: boolean) => void}}
 */
export function useBoolean(initialState) {
  const [value, setValue] = useState(initialState || false);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);

  return { value, setTrue, setFalse, toggle };
}
