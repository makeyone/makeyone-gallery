'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';
import FormData from 'form-data';

import { FileMutation } from '@/api/file/File.mutation';

import { sweetConfirm } from '@/libs/CustomAlert';

import numberWithComma from '@/utils/number-with-comma';

interface ImagesUploadProps {
  fileUploadPath: string;
  maxFileSizeMb: number;
  defaultImageUrl?: string | null;
}

export default function useUploadAndDeleteImage({ fileUploadPath, maxFileSizeMb, defaultImageUrl = null }: ImagesUploadProps) {
  const [imageUrl, setImageUrl] = useState<ImagesUploadProps['defaultImageUrl']>(defaultImageUrl);

  const { isPending, mutate } = useMutation({
    mutationFn: FileMutation.uploadImageList,
    onSuccess: (res) => {
      if (res.data) {
        setImageUrl(res.data[0].url);
      }
    },
  });

  const handleUploadImage = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (isPending === true) return;
    if (evt.target.files === null) return;

    const uploadImageFile = evt.target.files[0];

    const UPLOAD_IMAGE_FILE_SIZE_BYTES = uploadImageFile.size;
    const MAX_FILE_SIZE_BYTES = maxFileSizeMb * 1024 * 1024;
    if (UPLOAD_IMAGE_FILE_SIZE_BYTES > MAX_FILE_SIZE_BYTES) {
      return toast.error(`이미지의 최대 업로드 가능 용량은 ${numberWithComma(maxFileSizeMb)}mb 입니다.`);
    }

    const allowedUploadFileExtensionList = ['JPG', 'JPEG', 'PNG', 'WEBP'];
    const allowedMimeTypeList = allowedUploadFileExtensionList.map((ext) => `image/${ext.toLowerCase()}`);
    const uploadImageFileExtension = uploadImageFile.type.toLowerCase();
    if (!allowedMimeTypeList.includes(uploadImageFileExtension)) {
      return toast.error(`이미지는 ${allowedUploadFileExtensionList.join(', ')} 형식만 업로드 할 수 있습니다`);
    }

    const formData = new FormData();
    formData.append('fileList', evt.target.files[0]);
    formData.append('uploadPath', fileUploadPath);

    mutate(formData);
  };

  const handleRevertImage = async () => {
    const confirm = await sweetConfirm.fire({
      titleText: '기존 이미지로 변경하시겠습니까?',
    });
    if (confirm.isConfirmed) {
      setImageUrl(defaultImageUrl);
    }
  };

  return { isPending, onUploadImage: handleUploadImage, imageUrl, setImageUrl, onRevertImage: handleRevertImage } as const;
}
