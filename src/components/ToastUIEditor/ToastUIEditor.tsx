'use client';

import '@toast-ui/editor/dist/toastui-editor.css';

import { useCallback, useEffect, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import FormData from 'form-data';

import { FileMutation } from '@/api/file/File.mutation';
import { UploadImageListReq } from '@/api/file/request/UploadImageListReq';
import { UploadImageListViewModel } from '@/api/file/view-model/UploadImageListModel';
import { ApiResponse } from '@/api/support/response/ApiResponse';
import { ViewModelMapper } from '@/api/support/view-model/ViewModelMapper';

import { postContentImageUploadPath } from '@/constants/variable/FileUploadPath.variable';

import PageLoading from '@/components/Loading/PageLoading';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './ToastUIEditor.module.css';

const cx = bindClassNames(styles);

type Props = {
  setValue: UseFormSetValue<any>;
  registerKey: any;
  defaultHtml?: string;
};

export default function ToastUIEditor({ setValue, registerKey, defaultHtml }: Props) {
  const editorRef = useRef<any>(null);
  const handleChangeEditor = useCallback(() => {
    const html = editorRef.current.getInstance().getHTML();
    setValue(registerKey, html, { shouldValidate: true });
  }, [editorRef]);

  const { isPending, mutateAsync } = useMutation<
    ViewModelMapper<UploadImageListViewModel[] | null>,
    ApiResponse,
    UploadImageListReq
  >({
    mutationFn: FileMutation.uploadImageList,
  });

  const handleAddImageBlobHook = async (file: Blob | File, callback: (url: string, text?: string) => void) => {
    if (isPending === false) {
      const formData = new FormData();
      formData.append('fileList', file);
      formData.append('uploadPath', postContentImageUploadPath);
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
