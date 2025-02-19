'use client';

import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { toast } from 'react-toastify';

import Image from 'next/image';

import { uploadPathAndSize } from '@/api/file/File.mutation';

import DragAndDropImgList from '@/components/DragAndDropImg/DragAndDropImgList';
import IsOnMount from '@/components/IsOnMount';
import ComponentLoading from '@/components/Loading/ComponentLoading';

import useUploadAndDeleteImages from '@/hooks/useUploadAndDeleteImages';

import { bindClassNames } from '@/libs/BindClassName.ts';

import numberWithComma from '@/utils/number-with-comma';

import styles from './DragAndDropImgUpload.module.css';

const cx = bindClassNames(styles);

type UploadErrorMessageType = 'TYPE_ERROR' | 'SIZE_ERROR';

type Props = {
  defaultImages: string[];
  setDefaultImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function DragAndDropImgUpload({ defaultImages, setDefaultImages }: Props) {
  const maxFileSize = uploadPathAndSize.posts.mainAndListImages.maxSize;
  const fileTypes = ['JPG', 'JPEG', 'PNG', 'GIF'];

  const [uploadErrorMessage, setUploadErrorMessage] = useState<UploadErrorMessageType | null>(null);
  useEffect(() => {
    if (uploadErrorMessage) {
      if (uploadErrorMessage === 'TYPE_ERROR') {
        toast.error(`이미지는 ${fileTypes.join(', ')} 형식만 업로드 할 수 있습니다`);
      }
      if (uploadErrorMessage === 'SIZE_ERROR') {
        toast.error(`이미지 하나의 최대 업로드 가능 용량은 ${numberWithComma(maxFileSize)}mb 입니다.`);
      }
      setUploadErrorMessage(null);
    }
  }, [uploadErrorMessage]);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const handleChange = (files: File[]) => {
    setImageFiles(files);
  };
  const [uploadedImagesUrl, setUploadedImagesUrl] = useState<string[]>(defaultImages);
  const { isPending, handleUploadImages, imagesUrl, onDeleteImage } = useUploadAndDeleteImages({
    imageFiles,
    fileUploadPath: uploadPathAndSize.posts.mainAndListImages.uploadPath,
    uploadedImagesUrl,
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
          maxSize={maxFileSize}
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
          <p className={cx('uploadTitle')}>이곳을 클릭하거나 드래그&드랍 으로 파일을 업로드 해주세요.</p>
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
