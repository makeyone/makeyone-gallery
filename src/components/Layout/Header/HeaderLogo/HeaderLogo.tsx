'use client';

import Image from 'next/image';
import Link from 'next/link';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './HeaderLogo.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function HeaderLogo({}: Props) {
  return (
    <Link href="/">
      <Image className={cx('logo')} src="/images/horizontal_logo.png" alt="메이키원 로고" width={175.2} height={60} />
    </Link>
  );
}
