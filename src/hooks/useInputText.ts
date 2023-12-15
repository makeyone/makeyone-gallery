import React, { useState, useCallback } from 'react';

export default function useInputText(defaultValue: string) {
  const [value, setValue] = useState<string>(defaultValue);

  const onChangeValue = useCallback((evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(evt.target.value);
  }, []);

  return [value, onChangeValue, setValue] as const;
}
