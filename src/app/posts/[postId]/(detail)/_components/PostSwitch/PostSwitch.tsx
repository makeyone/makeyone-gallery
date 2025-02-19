'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import { KeyboardSwitchLube } from '@/constants/enum/KeyboardSwitchLube.enum';
import { KeyboardSwitchType } from '@/constants/enum/KeyboardSwitchType.enum';

import PostSectionTitle from '@/app/posts/[postId]/(detail)/_components/PostSectionTitle';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostSwitch.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostSwitch({}: Props) {
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const postSwitches = postData?.postSwitches;

  if (!postSwitches || postSwitches.length === 0) {
    return <></>;
  }

  return (
    <div className={cx('root')} id="switch">
      <PostSectionTitle title="스위치" />
      <div className={cx('listDiv')}>
        {postSwitches.map((switchItem) => (
          <ul className={cx('list')} key={switchItem.id}>
            <li className={cx('item', 'title')}>{switchItem.switchName}</li>
            <li className={cx('item')}>스위치 타입 : {KeyboardSwitchType.findName(switchItem.switchType) as string}</li>
            {switchItem.isSlientSwitch === true && <li className={cx('item')}>저소음 스위치</li>}
            <li className={cx('item')}>윤활 : {KeyboardSwitchLube.findName(switchItem.switchLube) as string}</li>
            {switchItem.bottomOutForce && <li className={cx('item')}>바닥압 : {`${switchItem.bottomOutForce}g`} </li>}
            {switchItem.springLength && <li className={cx('item')}>스프링 길이 : {`${switchItem.springLength}mm`} </li>}
            {switchItem.switchFilm && <li className={cx('item')}>스위치 필름 : {switchItem.switchFilm} </li>}
            {switchItem.remark && <li className={cx('item')}>{switchItem.remark} </li>}
          </ul>
        ))}
      </div>
    </div>
  );
}
