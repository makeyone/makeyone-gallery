'use client';

import Image from 'next/image';

import { signIn } from 'next-auth/react';

import { SocialLoginType } from '@/app/api/auth/[...nextauth]/route';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './SocialLoginList.module.css';

const cx = bindClassNames(styles);

export default function SocialLoginList() {
  const handleClick = (socialLoginType: SocialLoginType) => () => {
    signIn(socialLoginType.toLowerCase());
  };

  return (
    <div className={cx('block')}>
      <h1 className={cx('title')}>로그인</h1>
      <ul className={cx('buttonList')}>
        <li>
          <button type="button" className={cx('button')} onClick={handleClick('NAVER')}>
            <Image src="/images/social/naver.svg" alt="네이버 로그인" width={24} height={24} />
            <span>네이버로 로그인하기</span>
          </button>
        </li>
        <li>
          <button type="button" className={cx('button')} onClick={handleClick('DISCORD')}>
            <Image src="/images/social/discord.svg" alt="디스코드 로그인" width={24} height={24} />
            <span>디스코드로 로그인하기</span>
          </button>
        </li>
        <li>
          <button type="button" className={cx('button')} onClick={handleClick('GOOGLE')}>
            <Image src="/images/social/google.svg" alt="구글 로그인" width={24} height={24} />
            <span>구글로 로그인하기</span>
          </button>
        </li>
        <li>
          <button type="button" className={cx('button')} onClick={handleClick('KAKAO')}>
            <Image src="/images/social/kakao.svg" alt="카카오 로그인" width={24} height={24} />
            <span>카카오로 로그인하기</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
