'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { KeyboardPCBType } from '@/apis/posts/enums/KeyboardPCBType.enum';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PostListItem from '@/app/posts/[postId]/(detail)/_components/PostListItem';
import PostSectionTitle from '@/app/posts/[postId]/(detail)/_components/PostSectionTitle';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostPrintedCircuitBoard.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostPCB({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data: postData } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
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
