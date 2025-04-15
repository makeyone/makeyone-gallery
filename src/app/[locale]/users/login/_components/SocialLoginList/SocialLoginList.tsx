'use client';

import Image from 'next/image';

import { signIn } from 'next-auth/react';

import { SocialLoginType } from '@/app/api/auth/[...nextauth]/route';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './SocialLoginList.module.css';

const cx = bindClassNames(styles);

export default function SocialLoginList() {
  const t = useClientI18n('sign-in');

  const handleClick = (socialLoginType: SocialLoginType) => () => {
    signIn(socialLoginType.toLowerCase());
  };

  return (
    <div className={cx('block')}>
      <h1 className={cx('title')}>{t('sign_in')}</h1>
      <ul className={cx('buttonList')}>
        <li>
          <button type="button" className={cx('button')} onClick={handleClick('DISCORD')}>
            <Image src="/images/social/discord.svg" alt="Discord sign in" width={24} height={24} />
            <span>{t('sign_in_discord')}</span>
          </button>
        </li>
        <li>
          <button type="button" className={cx('button')} onClick={handleClick('GOOGLE')}>
            <Image src="/images/social/google.svg" alt="Google sign in" width={24} height={24} />
            <span>{t('sign_in_google')}</span>
          </button>
        </li>
        <li>
          <button type="button" className={cx('button')} onClick={handleClick('KAKAO')}>
            <Image src="/images/social/kakao.svg" alt="Kakao sign in" width={24} height={24} />
            <span>{t('sign_in_kakao')}</span>
          </button>
        </li>
        <li>
          <button type="button" className={cx('button')} onClick={handleClick('NAVER')}>
            <Image src="/images/social/naver.svg" alt="Naver sign in" width={24} height={24} />
            <span>{t('sign_in_naver')}</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
