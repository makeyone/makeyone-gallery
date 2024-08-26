'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PostStepItem from '@/app/posts/[postId]/(detail)/_components/PostStepItem';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostStep.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostStep({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data: postData } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  if (postData === undefined) {
    return <></>;
  }

  return (
    <div className={cx('root')}>
      <h3 className={cx('title')}>게시글 내용 순서</h3>
      <ul className={cx('list')}>
        <PostStepItem connectElementId="title" stepTitle="게시글 제목" />
        {postData.postVideo !== null && <PostStepItem connectElementId="video" stepTitle="타건 영상" />}
        <PostStepItem connectElementId="layout" stepTitle="레이아웃" />
        <PostStepItem connectElementId="pcb" stepTitle="PCB" />
        <PostStepItem connectElementId="plate" stepTitle="보강판" />
        <PostStepItem connectElementId="foam" stepTitle="흡음재" />
        <PostStepItem connectElementId="switch" stepTitle="스위치" />
        <PostStepItem connectElementId="keycap" stepTitle="키캡" />
        <PostStepItem connectElementId="stabilizer" stepTitle="스테빌라이저" />
        {postData.postContent !== null && <PostStepItem connectElementId="content" stepTitle="추가 내용" />}
      </ul>
    </div>
  );
}
