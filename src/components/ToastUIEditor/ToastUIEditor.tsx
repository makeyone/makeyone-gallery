'use client';

import { useCallback, useEffect, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import { AxiosError } from 'axios';
import FormData from 'form-data';

import { uploadImages } from '@/apis/files/actions/UploadImages';
import { UploadImagesInput, UploadImagesOutput } from '@/apis/files/dtos/UploadImages.dto';
import UploadPathAndSize from '@/apis/files/UploadPathAndSize';

import PageLoading from '@/components/Loading/PageLoading';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './ToastUIEditor.module.css';

import '@toast-ui/editor/dist/toastui-editor.css';

const cx = bindClassNames(styles);

type Props = {
  setValue: UseFormSetValue<any>;
  registerKey: any;
  defaultHtml?: string;
};

export default function ToastUIEditor({ setValue, registerKey, defaultHtml }: Props) {
  const editorRef = useRef<any>();
  const handleChangeEditor = useCallback(() => {
    const html = editorRef.current.getInstance().getHTML();
    setValue(registerKey, html, { shouldValidate: true });
  }, [editorRef]);

  const { isPending, mutateAsync } = useMutation<UploadImagesOutput, AxiosError<UploadImagesOutput>, UploadImagesInput>({
    mutationFn: uploadImages,
  });
  const handleAddImageBlobHook = async (file: Blob | File, callback: (url: string, text?: string) => void) => {
    if (isPending === false) {
      const formData = new FormData();
      formData.append('fileList', file);
      formData.append('uploadPath', UploadPathAndSize.posts.contentImages.uploadPath);
      const res = await mutateAsync(formData);
      if (res?.data) {
        callback(res.data[0].url);
      }
    }
  };

  useEffect(() => {
    if (defaultHtml !== undefined) {
      editorRef.current.getInstance().setHTML(defaultHtml);
    }
  }, [defaultHtml]);

  return (
    <div className={cx('root')}>
      <Editor
        previewStyle="vertical"
        ref={editorRef}
        onChange={handleChangeEditor}
        height="700px"
        initialEditType="wysiwyg"
        hideModeSwitch
        autofocus={false}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'image'],
        ]}
        hooks={{
          addImageBlobHook: handleAddImageBlobHook,
        }}
      />
      {isPending === true && <PageLoading />}
    </div>
  );
}
