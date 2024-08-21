'use client';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostListItem.module.css';

const cx = bindClassNames(styles);

type Props = {
  itemContent: string;
};

export default function PostListItem({ itemContent }: Props) {
  return (
    <li className={cx('item')}>
      <div className={cx('dot')} />
      <div className={cx('itemContent')}>{itemContent}</div>
    </li>
  );
}
