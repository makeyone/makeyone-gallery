import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './ComponentLoading.module.css';

const cx = bindClassNames(styles);

type Props = {
  className?: string;
};

export default function ComponentLoading({ className = '' }: Props) {
  return (
    <div className={cx('root', className)}>
      <div className={cx('loader')} />
    </div>
  );
}
