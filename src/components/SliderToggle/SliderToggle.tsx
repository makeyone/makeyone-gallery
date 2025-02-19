'use client';

import { useEffect, useRef, useState } from 'react';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './SliderToggle.module.css';

const cx = bindClassNames(styles);

type Props = {
  isChecked: boolean;
  onChange: (value: boolean) => void;
};

export default function SliderToggle({ isChecked, onChange }: Props) {
  const [isHiddenChecked, setIsHiddenChecked] = useState(isChecked);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsHiddenChecked(isChecked);
  }, [isChecked]);

  const handleHiddenOnChange = () => {
    const newIsChecked = !isChecked;
    setIsHiddenChecked(newIsChecked);
    onChange(newIsChecked);
    if (ref.current) {
      ref.current.blur();
    }
  };

  return (
    <div className={cx('root')}>
      <label className={cx('switch')}>
        <input ref={ref} type="checkbox" checked={isHiddenChecked} onChange={handleHiddenOnChange} hidden />
        <div className={cx('slider', isHiddenChecked === true && 'active')} />
      </label>
    </div>
  );
}
