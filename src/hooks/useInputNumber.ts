import React, { useState, useCallback } from 'react';

export default function useInputNumber(defaultValue: number) {
  const [value, setValue] = useState<number | ''>(defaultValue);

  const onChangeValue = useCallback((evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value: inputValue, maxLength } = evt.target;

    if (inputValue.length === 0 || inputValue === '0') {
      return setValue('');
    }

    return setValue(parseInt(inputValue.slice(0, maxLength), 10));
  }, []);

  return [value, onChangeValue, setValue] as const;
}
