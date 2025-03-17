'use client';

import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { BsFillCameraFill } from 'react-icons/bs';

import { UserMutation } from '@/api/user/User.mutation';
import { UserQuery, userQueryKey } from '@/api/user/User.query';

import { PROFILE_IMAGE_MAX_SIZE_MB } from '@/constants/variable/FileUploadMaxSize.variable';
import { profileImageUploadPath } from '@/constants/variable/FileUploadPath.variable';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';
import ComponentLoading from '@/components/Loading/ComponentLoading';

import useUploadAndDeleteImage from '@/hooks/useUploadAndDeleteImage';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './EditProfileImageForm.module.css';

const cx = bindClassNames(styles);

class EditProfileImgFormInput {
  profileImgUrl!: string;
}

export default function EditProfileImageForm() {
  const { data: meData, refetch: refetchMe } = useSuspenseQuery({
    queryKey: userQueryKey.getMe(),
    queryFn: () => UserQuery.getMe(),
    select: (selectData) => selectData.data,
  });
  const { id: userId, profileImg, nickname } = meData!;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    isPending: isUploadProfileImagePending,
    onUploadImage: onUploadProfileImage,
    imageUrl: profileImgUrl,
  } = useUploadAndDeleteImage({
    defaultImageUrl: profileImg,
    maxFileSizeMb: PROFILE_IMAGE_MAX_SIZE_MB,
    fileUploadPath: profileImageUploadPath,
  });

  const { setValue, handleSubmit } = useForm<EditProfileImgFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditProfileImgFormInput),
    defaultValues: {
      profileImgUrl,
    },
  });

  useEffect(() => {
    setValue('profileImgUrl', profileImgUrl);
  }, [profileImgUrl]);

  const { isPending, mutate } = useMutation({
    mutationFn: UserMutation.editUser,
    onSuccess: () => {
      toast.success('내 프로필 이미지 변경이 완료되었습니다.');
      refetchMe();
    },
  });

  const onSubmit = handleSubmit((formData) => {
    if (isPending === true) {
      return;
    }

    const { profileImgUrl } = formData;
    mutate({ userId, profileImgUrl });
  });

  return (
    <form className={cx('form')} onSubmit={onSubmit}>
      <input type="file" ref={fileInputRef} onChange={onUploadProfileImage} accept=".jpg, .jpeg, .png, .webp, .heic" hidden />
      <div className={cx('uploadImgBlock')}>
        <button type="button" className={cx('uploadImgBtn')} onClick={() => fileInputRef.current?.click()}>
          <BlurPlaceholderImage
            className={cx('profileImg')}
            src={profileImgUrl as string}
            alt={nickname}
            width={0}
            height={0}
            sizes="100vw"
          />
        </button>
        <div className={cx('uploadImgHoverBlock')}>
          <BsFillCameraFill className={cx('uploadIcon')} />
          <span className={cx('uploadText')}>Update Photo</span>
        </div>
        {isUploadProfileImagePending === true && (
          <div className={cx('uploadLoadingBlock')}>
            <ComponentLoading />
          </div>
        )}
      </div>
      <div className={cx('uploadFileAllowBlock')}>
        <span>이미지를 클릭해서 업로드</span>
        <span>*.webp, *.jpeg, *.jpg, *.png, .heic 확장자만 업로드 가능</span>
        <span>최대 3 Mb</span>
      </div>
      <button type="submit" className={cx('formSubmitBtn')}>
        이미지 변경하기
      </button>
    </form>
  );
}
