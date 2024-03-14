'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import FormData from 'form-data';

import { uploadImages } from '@/apis/files/actions/UploadImages';
import { UploadImagesInput, UploadImagesOutput } from '@/apis/files/dtos/UploadImages.dto';

import { sweetConfirm } from '@/libs/sweet-alert2';

interface ImagesUploadProps {
  imageFiles: File[];
  fileUploadPath: string;
  uploadedImagesUrl: string[];
}

// 기존 이미지를 유지하고 싶으면 uploadedImagesUrl에 유지하려는 image array를 추가.
export default function useUploadAndDeleteImages({ imageFiles, fileUploadPath, uploadedImagesUrl }: ImagesUploadProps) {
  const [imagesUrl, setImagesUrl] = useState<ImagesUploadProps['uploadedImagesUrl']>(uploadedImagesUrl);
  const { isPending, mutate } = useMutation<UploadImagesOutput, AxiosError<UploadImagesOutput>, UploadImagesInput>({
    mutationFn: uploadImages,
    onSuccess: (res) => {
      if (res.uploadedImages) {
        setImagesUrl([...uploadedImagesUrl, ...res.uploadedImages.map((image) => image.url)]);
      }
    },
  });

  const handleUploadImages = async () => {
    if (isPending === false && imageFiles.length > 0) {
      const formData = new FormData();

      Array.from(imageFiles).forEach((file) => {
        formData.append('images', file);
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
