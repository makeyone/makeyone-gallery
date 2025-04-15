'use client';

import { bindClassNames } from '@/libs/BindClassName';

import { Link, usePathname } from '@/i18n/routing';

import styles from './PostStepItem.module.css';

const cx = bindClassNames(styles);

type Props = {
  connectElementId: string;
  stepTitle: string;
};

export default function PostStepItem({ connectElementId, stepTitle }: Props) {
  const pathname = usePathname();

  return (
    <li className={cx('item')}>
      <Link className={cx('link')} href={`${pathname}/#${connectElementId}`}>
        <div className={cx('dot')} />
        <div className={cx('stepTitle')}>{stepTitle}</div>
      </Link>
    </li>
  );
}
