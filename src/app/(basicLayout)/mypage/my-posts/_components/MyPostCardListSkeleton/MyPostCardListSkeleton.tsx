'use client';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './MyPostCardListSkeleton.module.css';

const cx = bindClassNames(styles);

type Props = {
  marginTop?: string;
};

export default function MyPostCardListSkeleton({ marginTop = '20px' }: Props) {
  return (
    <div className={cx('root')} style={{ marginTop }}>
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
