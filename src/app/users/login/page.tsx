import { Metadata } from 'next';
import Image from 'next/image';

import { LoginError } from '@/apis/users/dtos/Login.dto';
import { UserSocialProviderUnion } from '@/apis/users/enums/UserSocialProvider.enum';

import DiffrentSocialProvider from '@/app/users/login/_components/DiffrentSocialProvider';
import SocialLoginList from '@/app/users/login/_components/SocialLoginList';
import WelcomeMessage from '@/app/users/login/_components/WelcomeMessage';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '로그인 - 메이키원 갤러리',
  };
}

type Props = {
  searchParams?: {
    error?: keyof typeof LoginError;
    registeredEmail?: string;
    registeredSocialProvider?: UserSocialProviderUnion;
  };
};

export default function LoginPage({ searchParams }: Props) {
  return (
    <div className={cx('root')}>
      <div className={cx('inner')}>
        <Image src="/images/logo.png" alt="메이키원 로고" width={116} height={101} />
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
