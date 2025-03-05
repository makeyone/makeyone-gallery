'use client';

import React, { useRef } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { BsFillCameraFill } from 'react-icons/bs';

import { UserQuery, userQueryKey } from '@/api/user/User.query';

import { PROFILE_IMAGE_MAX_SIZE_MB } from '@/constants/variable/FileUploadMaxSize.variable';
import { profileImageUploadPath } from '@/constants/variable/FileUploadPath.variable';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';
import ComponentLoading from '@/components/Loading/ComponentLoading';
import BasicModel from '@/components/Modal/BasicModal';

import useUploadAndDeleteImage from '@/hooks/useUploadAndDeleteImage';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './EditProfile.module.css';

const cx = bindClassNames(styles);

type Props = { onClose: () => void };

export default function EditProfile({ onClose }: Props) {
  const { data: meData } = useSuspenseQuery({
    queryKey: userQueryKey.getMe(),
    queryFn: () => UserQuery.getMe(),
    select: (selectData) => selectData.data,
  });
  const { profileImg, nickname, email, socialProvider } = meData!;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    isPending: isUploadProfileImagePending,
    onUploadImage: onUploadProfileImage,
    imageUrl: profileImageUrl,
  } = useUploadAndDeleteImage({
    defaultImageUrl: profileImg,
    maxFileSizeMb: PROFILE_IMAGE_MAX_SIZE_MB,
    fileUploadPath: profileImageUploadPath,
  });

  return (
    <BasicModel isShowModal handleAfterModalClose={onClose} title="프로필 수정">
      <div className={cx('root')}>
        <form className={cx('profileImgForm')}>
          <input type="file" ref={fileInputRef} onChange={onUploadProfileImage} accept=".jpg, .jpeg, .png, .webp" hidden />
          <div className={cx('profileImgBlock')}>
            <button type="button" className={cx('profileImgBtn')} onClick={() => fileInputRef.current?.click()}>
              <BlurPlaceholderImage
                className={cx('profileImg')}
                src={profileImageUrl as string}
                alt={nickname}
                width={0}
                height={0}
                sizes="100vw"
              />
            </button>
            <div className={cx('profileImgUploadHoverBlock')}>
              <BsFillCameraFill className={cx('profileImgUploadIcon')} />
              <span className={cx('profileImgUploadText')}>Update Photo</span>
            </div>
            {isUploadProfileImagePending === true && (
              <div className={cx('profileImgUploadLoadingBlock')}>
                <ComponentLoading />
              </div>
            )}
          </div>
          <div className={cx('profileImgFileAllowBlock')}>
            <span>이미지를 클릭해서 업로드</span>
            <span>*.webp, *.jpeg, *.jpg, *.png 확장자만 업로드 가능</span>
            <span>최대 3 Mb</span>
          </div>
          <button type="submit" className={cx('profileImgSubmitBtn')}>
            이미지 변경하기
          </button>
        </form>
        <form className={cx('profileTextForm')}></form>
      </div>
    </BasicModel>
  );
}
