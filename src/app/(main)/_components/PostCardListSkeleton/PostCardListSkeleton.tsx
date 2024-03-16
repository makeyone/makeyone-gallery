'use client';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostCardListSkeleton.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostCardListSkeleton({}: Props) {
  return (
    <div className={cx('root')}>
      <div className={cx('list')}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((number) => (
          <div key={number} className={cx('card')}>
            <div className={cx('imgBlock')}>
              <div className={cx('postImg', 'skeleton')} />
              <div className={cx('profileImgBlock', 'skeleton')} />
            </div>
            <div className={cx('textBlock')}>
              <div className={cx('postedDate', 'skeleton')} />
              <div className={cx('postTitle', 'skeleton')} />
              <div className={cx('postedBy', 'skeleton')} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
