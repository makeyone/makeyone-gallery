'use client';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import { useEffect, useRef } from 'react';

import { Viewer } from '@toast-ui/react-editor';

type Props = { htmlString: string; onLoadView?: () => void };

export default function ToastUiViewer({ htmlString, onLoadView }: Props) {
  const ref = useRef<any>(null);
  useEffect(() => {
    ref.current.getInstance().setMarkdown(htmlString);
  }, [htmlString]);

  return <Viewer ref={ref} initialValue={htmlString} onLoad={onLoadView} />;
}
