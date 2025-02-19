'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import { KeyboardPCBType } from '@/constants/enum/KeyboardPCBType.enum';

import PostListItem from '@/app/posts/[postId]/(detail)/_components/PostListItem';
import PostSectionTitle from '@/app/posts/[postId]/(detail)/_components/PostSectionTitle';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostPrintedCircuitBoard.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostPCB({}: Props) {
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });
  const postPrintedCircuitBoard = postData?.postPrintedCircuitBoard;

  if (postPrintedCircuitBoard === null || postPrintedCircuitBoard === undefined) {
    return <></>;
  }

  const { pcbName, pcbThickness, pcbType, isFlexCutPcb, isRgbPcb, remark } = postPrintedCircuitBoard;

  return (
    <div className={cx('root')} id="pcb">
      <PostSectionTitle title="PCB" />
      <ul className={cx('list')}>
        <PostListItem itemContent={pcbName} />
        <PostListItem itemContent={`${KeyboardPCBType.findName(pcbType)} 기판`} />
        {pcbThickness && <PostListItem itemContent={`${pcbThickness}mm`} />}
        <PostListItem itemContent={isFlexCutPcb === true ? '플렉스 컷 기판' : '논 플렉스컷 기판'} />
        <PostListItem itemContent={isRgbPcb === true ? 'RGB 기판' : '논 RGB 기판'} />
        {remark && <PostListItem itemContent={remark} />}
      </ul>
    </div>
  );
}
