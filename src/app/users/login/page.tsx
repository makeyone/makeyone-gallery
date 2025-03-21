import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import DiffrentSocialProvider from '@/app/users/login/_components/DiffrentSocialProvider';
import LoginTerms from '@/app/users/login/_components/LoginTerms';
import SocialLoginList from '@/app/users/login/_components/SocialLoginList';
import WelcomeMessage from '@/app/users/login/_components/WelcomeMessage';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '로그인 - 메이키원',
    robots: 'noindex, nofollow',
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
      <div className={cx('innerBlock')}>
        <Link href="/">
          <Image src="/images/vertical_logo.png" alt="메이키원 로고" width={139.38} height={101} />
        </Link>
        <div className={cx('loginBlock')}>
          <SocialLoginList />
          <WelcomeMessage />
        </div>
        <div className={cx('termsBlock')}>
          <LoginTerms />
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
