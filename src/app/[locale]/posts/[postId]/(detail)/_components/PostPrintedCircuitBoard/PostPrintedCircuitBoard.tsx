'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import snakecase from 'snakecase';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostListItem from '@/app/[locale]/posts/[postId]/(detail)/_components/PostListItem';
import PostSectionTitle from '@/app/[locale]/posts/[postId]/(detail)/_components/PostSectionTitle';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './PostPrintedCircuitBoard.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostPCB({}: Props) {
  const tPcbEnum = useClientI18n('pcb-enum');
  const tPostDetail = useClientI18n('post-detail');

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
        <PostListItem itemContent={`${pcbName} (${tPcbEnum(`pcb_type_${snakecase(pcbType)}`)})`} />
        {pcbThickness && <PostListItem itemContent={`${pcbThickness}mm`} />}
        <PostListItem itemContent={isFlexCutPcb === true ? tPostDetail('flex_cut_pcb') : tPostDetail('non_flex_cut_pcb')} />
        <PostListItem itemContent={isRgbPcb === true ? tPostDetail('rgb_pcb') : tPostDetail('non_rgb_pcb')} />
        {remark && <PostListItem itemContent={remark} />}
      </ul>
    </div>
  );
}
