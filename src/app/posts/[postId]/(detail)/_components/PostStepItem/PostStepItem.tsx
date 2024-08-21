'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { bindClassNames } from '@/libs/bind-class-name';

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
