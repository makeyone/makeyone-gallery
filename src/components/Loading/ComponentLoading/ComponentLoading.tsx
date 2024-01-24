import { bindClassNames } from '@/libs/bind-class-name';

import styles from './ComponentLoading.module.css';

const cx = bindClassNames(styles);

type Props = {
  color?: 'black' | 'white';
  className?: string;
};

export default function ComponentLoading({ color = 'black', className = '' }: Props) {
  return (
    <div className={cx('root', className)}>
      <div className={cx('animation')}>
        <div className={cx(color)} />
        <div className={cx(color)} />
        <div className={cx(color)} />
        <div className={cx(color)} />
      </div>
    </div>
  );
}
