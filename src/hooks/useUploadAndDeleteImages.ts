'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import FormData from 'form-data';

import { FileMutation } from '@/api/file/File.mutation';

import { sweetConfirm } from '@/libs/CustomAlert';

interface ImagesUploadProps {
  imageFiles: File[];
  fileUploadPath: string;
  uploadedImagesUrl: string[];
}

// 기존 이미지를 유지하고 싶으면 uploadedImagesUrl에 유지하려는 image array를 추가.
export default function useUploadAndDeleteImages({ imageFiles, fileUploadPath, uploadedImagesUrl }: ImagesUploadProps) {
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
