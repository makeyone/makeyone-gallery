import React from 'react';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './StepCard.module.css';

const cx = bindClassNames(styles);

type Props = {
  children: React.ReactNode;
  cardTitle?: string;
  cardDescription?: string;
};

export default function StepCard({ children, cardTitle, cardDescription }: Props) {
  return (
    <div className={cx('root')}>
      {cardTitle && (
        <div className={cx('titleBlock')}>
          <h2 className={cx('cardTitle')}>{cardTitle}</h2>
          {cardDescription && <h3 className={cx('cardDescription')}>{cardDescription}</h3>}
        </div>
      )}
      <div className={cx('cardBody')}>{children}</div>
    </div>
  );
}
