'use client';

import Image from 'next/image';

import { bindClassNames } from '@/libs/BindClassName';

import { Link } from '@/i18n/routing';

import styles from './HeaderLogo.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function HeaderLogo({}: Props) {
  return (
    <Link href="/">
      <Image className={cx('logo')} src="/images/horizontal_logo.png" alt="Makeyone Logo" width={175.2} height={60} />
    </Link>
  );
}
