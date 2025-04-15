'use client';

import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { toast } from 'react-toastify';

import Image from 'next/image';

import { POST_IMAGE_MAX_SIZE_MB } from '@/constants/variable/FileUploadMaxSize.variable';
import { postImageUploadPath } from '@/constants/variable/FileUploadPath.variable';

import DragAndDropImgList from '@/components/DragAndDropImg/DragAndDropImgList';
import IsOnMount from '@/components/IsOnMount';
import ComponentLoading from '@/components/Loading/ComponentLoading';

import useClientI18n from '@/hooks/useClientI18n';
import useUploadAndDeleteImageList from '@/hooks/useUploadAndDeleteImageList';

import { bindClassNames } from '@/libs/BindClassName';

import numberWithComma from '@/utils/number-with-comma';

import styles from './DragAndDropImgUpload.module.css';

const cx = bindClassNames(styles);

type UploadErrorMessageType = 'TYPE_ERROR' | 'SIZE_ERROR';

type Props = {
  defaultImages: string[];
  setDefaultImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function DragAndDropImgUpload({ defaultImages, setDefaultImages }: Props) {
  const t = useClientI18n('global');

  const fileTypes = ['JPG', 'JPEG', 'PNG', 'GIF', 'WEBP', 'HEIC'];

  const [uploadErrorMessage, setUploadErrorMessage] = useState<UploadErrorMessageType | null>(null);
  useEffect(() => {
    if (uploadErrorMessage) {
      if (uploadErrorMessage === 'TYPE_ERROR') {
        toast.error(t('upload_image_type_error', { fileTypes: fileTypes.join(', ') }));
      }
      if (uploadErrorMessage === 'SIZE_ERROR') {
        toast.error(t('upload_image_size_error', { fileMaxSize: `${numberWithComma(POST_IMAGE_MAX_SIZE_MB)}mb` }));
      }
      setUploadErrorMessage(null);
    }
  }, [uploadErrorMessage]);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const handleChange = (files: File[]) => {
    setImageFiles(files);
  };
  const [uploadedImagesUrl, setUploadedImagesUrl] = useState<string[]>(defaultImages);
  const { isPending, handleUploadImages, imagesUrl, onDeleteImage } = useUploadAndDeleteImageList({
    imageFiles,
    fileUploadPath: postImageUploadPath,
    uploadedImagesUrl,
    maxFileSizeMb: POST_IMAGE_MAX_SIZE_MB,
    maxImageCount: 10,
  });

  useEffect(() => {
    if (imageFiles.length > 0) {
      handleUploadImages();
    }
  }, [imageFiles]);

  useEffect(() => {
    if (imagesUrl) {
      setUploadedImagesUrl(imagesUrl);
    }
  }, [imagesUrl]);

  useEffect(() => {
    if (uploadedImagesUrl) {
      setDefaultImages(uploadedImagesUrl);
    }
  }, [uploadedImagesUrl]);

  return (
    <IsOnMount>
      <div className={cx('root')}>
        <FileUploader
          handleChange={handleChange}
          maxSize={POST_IMAGE_MAX_SIZE_MB}
          onTypeError={() => setUploadErrorMessage('TYPE_ERROR')}
          onSizeError={() => setUploadErrorMessage('SIZE_ERROR')}
          name="file"
          types={fileTypes}
          multiple
          required
          classes={cx('fileUploader')}
          hoverTitle="&nbsp;"
          dropMessageStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', opacity: 1, border: 'none' }}
          disabled={isPending === true}
        >
          <Image src="/images/posts/upload_image_icon.svg" alt="이미지 업로드" width={200} height={150} />
          <p className={cx('uploadTitle')}>{t('dnd_upload_image_description')}</p>
          {isPending === true && (
            <div className={cx('loadingBlock')}>
              <ComponentLoading className={cx('loadingAnimationBlock')} />
            </div>
          )}
        </FileUploader>
        {uploadedImagesUrl.length > 0 && (
          <DragAndDropImgList imagesUrl={uploadedImagesUrl} setImagesUrl={setUploadedImagesUrl} onDeleteImage={onDeleteImage} />
        )}
      </div>
    </IsOnMount>
  );
}
