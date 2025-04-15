import { Metadata } from 'next';
import Image from 'next/image';

import DiffrentSocialProvider from '@/app/[locale]/users/login/_components/DiffrentSocialProvider';
import LoginTerms from '@/app/[locale]/users/login/_components/LoginTerms';
import SocialLoginList from '@/app/[locale]/users/login/_components/SocialLoginList';
import WelcomeMessage from '@/app/[locale]/users/login/_components/WelcomeMessage';

import useServerI18n from '@/hooks/useServerI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { Link } from '@/i18n/routing';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  const t = await useServerI18n('sign-in');

  return {
    title: t('meta_title'),
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
          <Image src="/images/vertical_logo.png" alt="logo" width={139.38} height={101} />
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
