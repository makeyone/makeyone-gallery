'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { KeyboardKeycapProfile } from '@/apis/posts/enums/KeyboardKeycapProfile.enum';
import { KeyboardKeycapTexture } from '@/apis/posts/enums/KeyboardKeycapTexture.enum';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PostSectionTitle from '@/app/posts/[postId]/(detail)/_components/PostSectionTitle';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostKeycap.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostKeycap({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data: postData } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const postKeycaps = postData?.postKeycaps;

  if (!postKeycaps || postKeycaps.length === 0) {
    return <></>;
  }

  return (
    <div className={cx('root')} id="keycap">
      <PostSectionTitle title="키캡" />
      <div className={cx('listDiv')}>
        {postKeycaps.map((keycap) => (
          <ul className={cx('list')} key={keycap.id}>
            <li className={cx('item', 'title')}>{keycap.keycapName}</li>
            <li className={cx('item')}>프로파일 : {KeyboardKeycapProfile.findName(keycap.keycapProfile) as string}</li>
            <li className={cx('item')}>재질 : {KeyboardKeycapTexture.findName(keycap.keycapTexture) as string}</li>
            {keycap.manufacturer && <li className={cx('item')}>제조사 : {keycap.manufacturer} </li>}
            {keycap.remark && <li className={cx('item')}>{keycap.remark} </li>}
          </ul>
        ))}
      </div>
    </div>
  );
}
