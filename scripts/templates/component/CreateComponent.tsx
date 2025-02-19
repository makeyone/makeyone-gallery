'use client';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './CreateComponent.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function CreateComponent({}: Props) {
  return (
    <div className={cx('root')}>
      <div>component</div>
    </div>
  );
}
