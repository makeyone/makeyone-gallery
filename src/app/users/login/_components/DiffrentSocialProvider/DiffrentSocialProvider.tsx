'use client';

import { useRouter } from 'next/navigation';

import BasicModel from '@/components/Modal/BasicModal/BasicModal';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './DiffrentSocialProvider.module.css';

const cx = bindClassNames(styles);

type Props = {
  hasError: boolean;
  registeredEmail?: string;
  registeredSocialProvider?: string;
};

export default function DiffrentSocialProvider({ hasError, registeredEmail, registeredSocialProvider }: Props) {
  const { replace } = useRouter();

  return (
    <BasicModel isShowModal={hasError} handleAfterModalClose={() => replace('/users/login')}>
      <div className={cx('block')}>
        <h2 className={cx('title')}>이미 동일한 정보로 가입된 계정이 존재합니다.</h2>
        <h3 className={cx('subTitle')}>아래 정보를 확인 후 이미 가입된 소셜로 로그인을 해주세요!</h3>
        <ul className={cx('regieredInfoList')}>
          <li className={cx('regieredInfoItem')}>
            <span className={cx('regieredInfoItemTitle')}>이메일</span>
            <span className={cx('regieredInfoItemContent')}>{registeredEmail}</span>
          </li>
          <li className={cx('regieredInfoItem')}>
            <span className={cx('regieredInfoItemTitle')}>가입된 SNS</span>
            <span className={cx('regieredInfoItemContent')}>{registeredSocialProvider}</span>
          </li>
        </ul>
      </div>
    </BasicModel>
  );
}
