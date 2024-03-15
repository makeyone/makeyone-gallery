'use client';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PageLoading.module.css';

const cx = bindClassNames(styles);

export default function PageLoading() {
  return (
    <div className={cx('block', 'scroll-lock')}>
      <div className="scroll-lock">
        <div className={cx('inner')}>
          <div className={cx('snippet')}>
            <div>
              <div className={cx('flashing')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
