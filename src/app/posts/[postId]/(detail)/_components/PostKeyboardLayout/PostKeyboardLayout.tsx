'use client';

import { useRef } from 'react';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PostSectionTitle from '@/app/posts/[postId]/(detail)/_components/PostSectionTitle';

import IsOnMount from '@/components/IsOnMount';
import KeyGroup from '@/components/KeyboardLayout/KeyGroup';

import useGetSize from '@/hooks/useGetSize';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostKeyboardLayout.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostKeyboardLayout({}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rootDimensions = useGetSize(rootRef);
  const rootElementWidth = rootDimensions?.width || 1040;

  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data: postData } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  if (
    postData?.postKeyboardDefinition?.keyboardDefinition === undefined ||
    postData?.postKeyboardDefinition?.layoutOptionKeys === undefined
  ) {
    return <></>;
  }

  const keyboardLayout = postData?.postKeyboardDefinition?.keyboardDefinition;
  const keyboardlayoutOptionKeys = postData?.postKeyboardDefinition?.layoutOptionKeys;

  return (
    <div className={cx('root')} ref={rootRef} id="layout">
      <PostSectionTitle title="키보드 레이아웃" />
      <IsOnMount>
        <div className={cx('layoutBlock')}>
          <KeyGroup
            definition={keyboardLayout}
            selectedOptionKeys={keyboardlayoutOptionKeys}
            parentElWidth={`${rootElementWidth - 20}px`}
            innerPadding={30}
            isRedraw
          />
        </div>
      </IsOnMount>
    </div>
  );
}
