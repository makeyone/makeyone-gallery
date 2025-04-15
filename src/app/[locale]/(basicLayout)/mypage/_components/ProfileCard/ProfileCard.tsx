'use client';

import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';

import Image from 'next/image';

import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { IoSettingsOutline } from 'react-icons/io5';

import { AuthMutation } from '@/api/auth/Auth.mutation';
import { UserMutation } from '@/api/user/User.mutation';
import { UserQuery, userQueryKey } from '@/api/user/User.query';

import EditProfileModal from '@/app/[locale]/(basicLayout)/mypage/_components/EditProfileModal';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';
import { sweetConfirm } from '@/libs/CustomAlert';

import { useRouter } from '@/i18n/routing';

import styles from './ProfileCard.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function ProfileCard({}: Props) {
  const tGlobal = useClientI18n('global');
  const tMypage = useClientI18n('mypage');

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
        toast.success(tGlobal('logout_success_message'));
        refetchMe();
        replace('/');
      }
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: UserMutation.withdrawal,
    onSuccess: async () => {
      toast.success(tMypage('withdrawn_success'));
      signOutMutate();
    },
  });

  const handleWithdrawal = async () => {
    if (!meData) return;
    if (isPending) return;

    const confirm = await sweetConfirm.fire({
      icon: 'warning',
      titleText: tMypage('withdrawn_confirm'),
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
                    {tMypage('edit_profile_btn')}
                  </button>
                </li>
                <li className={cx('menuItem')}>
                  <button type="button" className={cx('menuBtn')} onClick={handleWithdrawal}>
                    {tMypage('withdrawn_btn')}
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
