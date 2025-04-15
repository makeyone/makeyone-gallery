'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';
import FormData from 'form-data';

import { FileMutation } from '@/api/file/File.mutation';

import useClientI18n from '@/hooks/useClientI18n';

import { sweetConfirm } from '@/libs/CustomAlert';

import numberWithComma from '@/utils/number-with-comma';

interface ImagesUploadProps {
  fileUploadPath: string;
  maxFileSizeMb: number;
  defaultImageUrl: string;
}

export default function useUploadAndDeleteImage({ fileUploadPath, maxFileSizeMb, defaultImageUrl }: ImagesUploadProps) {
  const t = useClientI18n('global');

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
      toast.error(t('upload_image_size_error', { fileMaxSize: `${numberWithComma(maxFileSizeMb)}mb` }));
      return;
    }

    const allowedUploadFileExtensionList = ['JPG', 'JPEG', 'PNG', 'WEBP', 'HEIC'];
    const allowedMimeTypeList = allowedUploadFileExtensionList.map((ext) => `image/${ext.toLowerCase()}`);
    const uploadImageFileExtension = uploadImageFile.type.toLowerCase();
    if (!allowedMimeTypeList.includes(uploadImageFileExtension)) {
      toast.error(t('upload_image_type_error', { fileTypes: allowedUploadFileExtensionList.join(', ') }));
      return;
    }

    const formData = new FormData();
    formData.append('fileList', evt.target.files[0]);
    formData.append('uploadPath', fileUploadPath);

    mutate(formData);
  };

  const handleRevertImage = async () => {
    const confirm = await sweetConfirm.fire({
      titleText: t('upload_image_revert_confirm'),
    });
    if (confirm.isConfirmed) {
      setImageUrl(defaultImageUrl);
    }
  };

  return { isPending, onUploadImage: handleUploadImage, imageUrl, setImageUrl, onRevertImage: handleRevertImage } as const;
}
