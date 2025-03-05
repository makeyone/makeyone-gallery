'use client';

import React from 'react';

import EditProfileFormWithoutImage from '@/app/(basicLayout)/mypage/_components/EditProfileFormWithoutImage';
import EditProfileImageForm from '@/app/(basicLayout)/mypage/_components/EditProfileImageForm';

import BasicModel from '@/components/Modal/BasicModal';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './EditProfileModal.module.css';

const cx = bindClassNames(styles);

type Props = { onClose: () => void };

export default function EditProfileModal({ onClose }: Props) {
  return (
    <BasicModel isShowModal handleAfterModalClose={onClose} title="프로필 수정">
      <div className={cx('root')}>
        <EditProfileImageForm />
        <EditProfileFormWithoutImage />
      </div>
    </BasicModel>
  );
}
