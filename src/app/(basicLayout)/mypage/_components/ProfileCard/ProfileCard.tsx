'use client';

import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { IoSettingsOutline } from 'react-icons/io5';

import { AuthMutation } from '@/api/auth/Auth.mutation';
import { UserMutation } from '@/api/user/User.mutation';
import { UserQuery, userQueryKey } from '@/api/user/User.query';

import EditProfileModal from '@/app/(basicLayout)/mypage/_components/EditProfileModal';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';

import { bindClassNames } from '@/libs/BindClassName.ts';
import { sweetConfirm } from '@/libs/CustomAlert';

import styles from './ProfileCard.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function ProfileCard({}: Props) {
  const { replace } = useRouter();

  const [isSettingOpend, setIsSettingOpend] = useState<boolean>(false);
  const handleSettingMenuOpen = () => setIsSettingOpend(true);
  const handleSettingMenuClose = () => setIsSettingOpend(false);

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState<boolean>(false);
  const handleEditProfileOpen = () => setIsEditProfileModalOpen(true);
  const handleEditProfileClose = () => setIsEditProfileModalOpen(false);

  const { data: meData, refetch: refetchMe } = useSuspenseQuery({
    queryKey: userQueryKey.getMe(),
    queryFn: () => UserQuery.getMe(),
    select: (selectData) => selectData.data,
  });

  const { mutate: signOutMutate } = useMutation({
    mutationFn: () => AuthMutation.signOut(),
    onSuccess: async () => {
      const signOutRes = await signOut({ redirect: false });
      if (signOutRes) {
        toast.success('로그아웃이 완료되었습니다.');
        refetchMe();
        replace('/');
      }
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: UserMutation.withdrawal,
    onSuccess: async () => {
      toast.success('회원탈퇴가 완료되었습니다.');
      signOutMutate();
    },
  });

  const handleWithdrawal = async () => {
    if (!meData) return;
    if (isPending) return;

    const confirm = await sweetConfirm.fire({
      icon: 'warning',
      titleText: `회원탈퇴 시 작성한 포스트는 삭제되지 않습니다.\n회원 탈퇴 전에 삭제를 원하는 포스트를 삭제해주세요.\n\n회원 탈퇴 후 정보는 복구되지 않습니다.\n정말로 탈퇴하시겠습니까?`,
    });
    if (confirm.isConfirmed) {
      mutate({ userId: meData.id });
    }
  };

  if (!meData) {
    return <></>;
  }

  const { profileImg, nickname, email, socialProvider } = meData;

  return (
    <React.Fragment>
      <div className={cx('root')}>
        <div className={cx('menuDiv')}>
          <button className={cx('menuOpenBtn')} type="button" onClick={handleSettingMenuOpen}>
            <IoSettingsOutline />
          </button>
          {isSettingOpend === true && (
            <OutsideClickHandler onOutsideClick={handleSettingMenuClose}>
              <ul className={cx('menuList')}>
                <li className={cx('menuItem')}>
                  <button type="button" className={cx('menuBtn')} onClick={handleEditProfileOpen}>
                    프로필 수정
                  </button>
                </li>
                <li className={cx('menuItem')}>
                  <button type="button" className={cx('menuBtn')} onClick={handleWithdrawal}>
                    회원 탈퇴
                  </button>
                </li>
              </ul>
            </OutsideClickHandler>
          )}
        </div>
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
