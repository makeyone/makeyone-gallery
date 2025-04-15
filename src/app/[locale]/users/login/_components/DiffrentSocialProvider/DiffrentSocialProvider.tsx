'use client';

import BasicModel from '@/components/Modal/BasicModal/BasicModal';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { useRouter } from '@/i18n/routing';

import styles from './DiffrentSocialProvider.module.css';

const cx = bindClassNames(styles);

type Props = {
  hasError: boolean;
  registeredEmail?: string;
  registeredSocialProvider?: string;
};

export default function DiffrentSocialProvider({ hasError, registeredEmail, registeredSocialProvider }: Props) {
  const t = useClientI18n('sign-in');

  const { replace } = useRouter();

  return (
    <BasicModel isShowModal={hasError} handleAfterModalClose={() => replace('/users/login')}>
      <div className={cx('block')}>
        <h2 className={cx('title')}>{t('diffrent_social_provider_title')}</h2>
        <h3 className={cx('subTitle')}>{t('diffrent_social_provider_sub_title')}</h3>
        <ul className={cx('regieredInfoList')}>
          <li className={cx('regieredInfoItem')}>
            <span className={cx('regieredInfoItemTitle')}>{t('email')}</span>
            <span className={cx('regieredInfoItemContent')}>{registeredEmail}</span>
          </li>
          <li className={cx('regieredInfoItem')}>
            <span className={cx('regieredInfoItemTitle')}>{t('registered_social_provider')}</span>
            <span className={cx('regieredInfoItemContent')}>{registeredSocialProvider}</span>
          </li>
        </ul>
      </div>
    </BasicModel>
  );
}
