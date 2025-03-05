'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { useSuspenseQuery } from '@tanstack/react-query';
import { MdOutlineEdit } from 'react-icons/md';

import { UserQuery, userQueryKey } from '@/api/user/User.query';

import EditProfileModal from '@/app/(basicLayout)/mypage/_components/EditProfileModal';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './ProfileCard.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function ProfileCard({}: Props) {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState<boolean>(false);
  const handleEditProfileOpen = () => setIsEditProfileModalOpen(true);
  const handleEditProfileClose = () => setIsEditProfileModalOpen(false);

  const { data: meData } = useSuspenseQuery({
    queryKey: userQueryKey.getMe(),
    queryFn: () => UserQuery.getMe(),
    select: (selectData) => selectData.data,
  });

  if (!meData) {
    return <></>;
  }

  const { profileImg, nickname, email, socialProvider } = meData;

  return (
    <React.Fragment>
      <div className={cx('root')}>
        <button type="button" className={cx('editProfileBtn')} onClick={handleEditProfileOpen}>
          <MdOutlineEdit />
        </button>
        <div className={cx('profileImgBlock')}>
          <BlurPlaceholderImage
            className={cx('profileImg')}
            src={profileImg as string}
            alt={nickname}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
        <div className={cx('profileTextBlock')}>
          <span className={cx('nickname')}>{nickname}</span>
          <div className={cx('emailAndSocialProviderBlock')}>
            <Image src={`/images/social/${socialProvider.toLowerCase()}.svg`} alt={socialProvider} width={24} height={24} />
            <span className={cx('email')}>{email}</span>
          </div>
        </div>
      </div>
      {isEditProfileModalOpen && <EditProfileModal onClose={handleEditProfileClose} />}
    </React.Fragment>
  );
}
