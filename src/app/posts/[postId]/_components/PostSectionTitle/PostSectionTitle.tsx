'use client';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostSectionTitle.module.css';

const cx = bindClassNames(styles);

type Props = {
  title: string;
};

export default function PostSectionTitle({ title }: Props) {
  return (
    <div className={cx('root')}>
      <h2 className={cx('title')}>{title}</h2>
    </div>
  );
}
