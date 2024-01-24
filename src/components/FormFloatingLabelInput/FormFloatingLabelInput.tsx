'use client';

import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './FormFloatingLabelInput.module.css';

const cx = bindClassNames(styles);

type Props = {
  label: string;
  inputId: string;
  inputType: 'text' | 'email' | 'password';
  inputRegisterReturn: UseFormRegisterReturn;
  currentInputValue?: string;
  required?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  autoComplete?: 'on' | 'off';
};

export default function FormFloatingLabelInput({
  label,
  inputId,
  inputType,
  inputRegisterReturn,
  currentInputValue = '',
  required = false,
  readOnly = false,
  maxLength = 1000000,
  autoComplete = 'off',
}: Props) {
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);
  const handleFocus = () => {
    setIsInputFocus(true);
  };
  const handleBlur = () => {
    setIsInputFocus(false);
  };

  return (
    <div className={cx('root')}>
      <label className={cx('label', (isInputFocus === true || currentInputValue.length > 0) && 'inputActived')} htmlFor={inputId}>
        {label}
      </label>
      <div className={cx('inputBlock', isInputFocus === true && 'focus')}>
        <input
          {...inputRegisterReturn}
          className={cx('input')}
          type={inputType}
          required={required}
          maxLength={maxLength}
          readOnly={readOnly}
          autoComplete={autoComplete}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}
