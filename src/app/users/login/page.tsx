import { Metadata } from 'next';
import Image from 'next/image';

import DiffrentSocialProvider from '@/app/users/login/_components/DiffrentSocialProvider';
import SocialLoginList from '@/app/users/login/_components/SocialLoginList';
import WelcomeMessage from '@/app/users/login/_components/WelcomeMessage';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '로그인 - 메이키원 갤러리',
  };
}

type Props = {
  searchParams?: Promise<{
    error?: string;
    registeredEmail?: string;
    registeredSocialProvider?: string;
  }>;
};

export default async function LoginPage(props: Props) {
  const searchParams = await props.searchParams;
  return (
    <div className={cx('root')}>
      <div className={cx('inner')}>
        <Image src="/images/vertical_logo.png" alt="메이키원 로고" width={139.38} height={101} />
        <div className={cx('login')}>
          <SocialLoginList />
          <WelcomeMessage />
        </div>
      </div>
      <DiffrentSocialProvider
        hasError={searchParams?.error === 'DIFFERENT_SOCIAL_PROVIDER'}
        registeredEmail={searchParams?.registeredEmail}
        registeredSocialProvider={searchParams?.registeredSocialProvider}
      />
    </div>
  );
}
