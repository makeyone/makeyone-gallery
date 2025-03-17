'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';
import FormData from 'form-data';

import { FileMutation } from '@/api/file/File.mutation';

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
        toast.error(`최대 ${maxImageCount}개의 이미지만 등록 가능합니다.`);
        return;
      }

      const MAX_FILE_SIZE_BYTES = maxFileSizeMb * 1024 * 1024;
      const allowedUploadFileExtensionList = ['JPG', 'JPEG', 'PNG', 'WEBP', 'HEIC'];
      const allowedMimeTypeList = allowedUploadFileExtensionList.map((ext) => `image/${ext.toLowerCase()}`);

      for (const file of imageFiles) {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          toast.error(`이미지의 최대 업로드 가능 용량은 ${numberWithComma(maxFileSizeMb)}mb 입니다.`);
          return;
        }

        console.log(file.type.toLowerCase());
        if (!allowedMimeTypeList.includes(file.type.toLowerCase())) {
          toast.error(`이미지는 ${allowedUploadFileExtensionList.join(', ')} 형식만 업로드 할 수 있습니다`);
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
      titleText: '이미지를 삭제하시겠습니까?',
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
