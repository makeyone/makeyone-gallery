'use client';

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import FormLabel from '@/components/Form/FormLabel';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './FormRadioGroupWithLabel.module.css';

const cx = bindClassNames(styles);

export type FormRadioGroupItemType = {
  id: string;
  label: string;
  value: string;
};

type Props = {
  label: string;
  register: UseFormRegisterReturn;
  name: string;
  items: FormRadioGroupItemType[];
  required?: boolean;
  align?: 'Col' | 'Row';
};

export default function FormRadioGroupWithLabel({ label, register, items, required = false, align = 'Col' }: Props) {
  return (
    <div className={cx('root')}>
      <FormLabel label={label} />
      <div className={cx('radioGroup', align.toLowerCase())}>
        {items.map((item) => (
          <div key={item.id}>
            <input
              type="radio"
              className={cx('hiddenInput')}
              id={item.id}
              aria-label={item.label}
              value={item.value}
              required={required}
              hidden
              {...register}
            />
            <label htmlFor={item.id} className={cx('radio')}>
              {item.value && <i className={cx('checkIcon')} />}
              <span className={cx('label')}>{item.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
