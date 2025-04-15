'use client';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './FormLabel.module.css';

const cx = bindClassNames(styles);

type Props = {
  label: string;
  inputId?: string;
};

export default function FormLabel({ inputId = '', label }: Props) {
  return (
    <div className={cx('root')}>
      <label className={cx('label')} htmlFor={inputId}>
        {label}
      </label>
    </div>
  );
}
