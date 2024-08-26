'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { KeyboardStabilizerMount } from '@/apis/posts/enums/KeyboardStabilizerMount.enum';
import { KeyboardStabilizerType } from '@/apis/posts/enums/KeyboardStabilizerType.enum';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PostSectionTitle from '@/app/posts/[postId]/(detail)/_components/PostSectionTitle';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostStabilizer.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostStabilizer({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data: postData } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const postStabilizers = postData?.postStabilizers;

  if (!postStabilizers || postStabilizers.length === 0) {
    return <></>;
  }

  return (
    <div className={cx('root')} id="stabilizer">
      <PostSectionTitle title="스테빌라이저" />
      <div className={cx('listDiv')}>
        {postStabilizers.map((stabilizer) => (
          <ul className={cx('list')} key={stabilizer.id}>
            <li className={cx('item', 'title')}>{stabilizer.stabilizerName}</li>
            <li className={cx('item')}>
              스테빌라이저 타입 : {KeyboardStabilizerType.findName(stabilizer.stabilizerType) as string}
            </li>
            <li className={cx('item')}>체결방식 : {KeyboardStabilizerMount.findName(stabilizer.stabilizerMount) as string}</li>
            {stabilizer.remark && <li className={cx('item')}>{stabilizer.remark} </li>}
          </ul>
        ))}
      </div>
    </div>
  );
}
