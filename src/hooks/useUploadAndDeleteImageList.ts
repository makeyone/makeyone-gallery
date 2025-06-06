'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';
import FormData from 'form-data';

import { FileMutation } from '@/api/file/File.mutation';

import useClientI18n from '@/hooks/useClientI18n';

import { sweetConfirm } from '@/libs/CustomAlert';

import numberWithComma from '@/utils/number-with-comma';

interface ImagesUploadProps {
  imageFiles: File[];
  fileUploadPath: string;
  uploadedImagesUrl: string[];
  maxFileSizeMb: number;
  maxImageCount: number;
}

export default function useUploadAndDeleteImageList({
  imageFiles,
  fileUploadPath,
  uploadedImagesUrl,
  maxFileSizeMb,
  maxImageCount,
}: ImagesUploadProps) {
  const t = useClientI18n('global');

  const [imagesUrl, setImagesUrl] = useState<ImagesUploadProps['uploadedImagesUrl']>(uploadedImagesUrl);
  const { isPending, mutate } = useMutation({
    mutationFn: FileMutation.uploadImageList,
    onSuccess: (res) => {
      if (res.data) {
        setImagesUrl([...uploadedImagesUrl, ...res.data.map((image) => image.url)]);
      }
    },
  });

  const handleUploadImages = async () => {
    if (isPending === false && imageFiles.length > 0) {
      if (uploadedImagesUrl.length + imageFiles.length > maxImageCount) {
        toast.error(t('upload_image_list_max_length_error', { fileMaxLength: `${numberWithComma(maxImageCount)}` }));
        return;
      }

      const MAX_FILE_SIZE_BYTES = maxFileSizeMb * 1024 * 1024;
      const allowedUploadFileExtensionList = ['JPG', 'JPEG', 'PNG', 'WEBP', 'HEIC'];
      const allowedMimeTypeList = allowedUploadFileExtensionList.map((ext) => `image/${ext.toLowerCase()}`);

      for (const file of imageFiles) {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          toast.error(t('upload_image_size_error', { fileMaxSize: `${numberWithComma(maxFileSizeMb)}mb` }));
          return;
        }

        if (!allowedMimeTypeList.includes(file.type.toLowerCase())) {
          toast.error(t('upload_image_type_error', { fileTypes: allowedUploadFileExtensionList.join(', ') }));
          return;
        }
      }

      const formData = new FormData();

      Array.from(imageFiles).forEach((file) => {
        formData.append('fileList', file);
      });
      formData.append('uploadPath', fileUploadPath);

      mutate(formData);
    }
  };

  const onDeleteImage = async (imageUrl: string) => {
    const confirm = await sweetConfirm.fire({
      titleText: t('upload_image_delete_confirm'),
    });
    if (confirm.isConfirmed) {
      const afterDeletedImages = uploadedImagesUrl.filter((image) => {
        return image !== imageUrl;
      });

      setImagesUrl(afterDeletedImages);
    }
  };

  return { isPending, handleUploadImages, imagesUrl, setImagesUrl, onDeleteImage } as const;
}
