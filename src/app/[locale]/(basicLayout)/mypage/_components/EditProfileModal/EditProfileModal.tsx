'use client';

import React from 'react';

import EditProfileFormWithoutImage from '@/app/[locale]/(basicLayout)/mypage/_components/EditProfileFormWithoutImage';
import EditProfileImageForm from '@/app/[locale]/(basicLayout)/mypage/_components/EditProfileImageForm';

import BasicModel from '@/components/Modal/BasicModal';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './EditProfileModal.module.css';

const cx = bindClassNames(styles);

type Props = { onClose: () => void };

export default function EditProfileModal({ onClose }: Props) {
  const t = useClientI18n('mypage');

  return (
    <BasicModel isShowModal handleAfterModalClose={onClose} title={t('edit_profile_modal_title')}>
      <div className={cx('root')}>
        <EditProfileImageForm />
        <EditProfileFormWithoutImage />
      </div>
    </BasicModel>
  );
}
