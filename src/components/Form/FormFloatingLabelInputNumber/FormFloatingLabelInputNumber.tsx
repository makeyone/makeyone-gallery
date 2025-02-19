/* eslint-disable no-restricted-globals */

'use client';

import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './FormFloatingLabelInputNumber.module.css';

const cx = bindClassNames(styles);

type Props = {
  label: string;
  inputId: string;
  inputRegisterReturn: UseFormRegisterReturn;
  step?: '1' | '0.1' | '0.01';
  currentInputValue?: number;
  required?: boolean;
  readOnly?: boolean;
  autoComplete?: 'on' | 'off';
  errorMessage?: string;
};

export default function FormFloatingLabelInputNumber({
  label,
  inputId,
  inputRegisterReturn,
  step = '1',
  currentInputValue = 0,
  required = false,
  readOnly = false,
  autoComplete = 'off',
  errorMessage,
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
      <label
        className={cx('label', (isInputFocus === true || isNaN(currentInputValue) === false) && 'inputActived')}
        htmlFor={inputId}
      >
        {label}
      </label>
      <div className={cx('inputBlock', isInputFocus === true && 'focus')}>
        <input
          {...inputRegisterReturn}
          className={cx('input')}
          type="number"
          required={required}
          readOnly={readOnly}
          autoComplete={autoComplete}
          step={step}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onWheel={(event) => event.currentTarget.blur()}
        />
      </div>
      {errorMessage && <p className={cx('errorMessage')}>{errorMessage}</p>}
    </div>
  );
}
