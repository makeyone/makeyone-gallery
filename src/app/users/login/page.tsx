import { Metadata } from 'next';
import Image from 'next/image';

import Social from '@/app/users/login/_components/Social';
import Welcome from '@/app/users/login/_components/Welcome';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '로그인 - 메이키원 갤러리',
  };
}

export default function LoginPage() {
  return (
    <div className={cx('root')}>
      <div className={cx('inner')}>
        <Image src="/images/logo.png" alt="메이키원 로고" width={116} height={101} />
        <div className={cx('login')}>
          <Social />
          <Welcome />
        </div>
      </div>
    </div>
  );
}
