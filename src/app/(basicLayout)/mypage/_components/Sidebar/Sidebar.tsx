'use client';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './Sidebar.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <aside className={cx('root')}>
      <div className={cx('profileDiv')}>component</div>
    </aside>
  );
}
