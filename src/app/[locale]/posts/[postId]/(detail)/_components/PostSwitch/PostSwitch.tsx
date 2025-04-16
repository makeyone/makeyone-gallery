'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import snakecase from 'snakecase';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import PostSectionTitle from '@/app/[locale]/posts/[postId]/(detail)/_components/PostSectionTitle';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './PostSwitch.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostSwitch({}: Props) {
  const tPostDetail = useClientI18n('post-detail');
  const tSwitchEnum = useClientI18n('switch-enum');

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
      <PostSectionTitle title={tPostDetail('keyboard_switch_list')} />
      <div className={cx('listDiv')}>
        {postSwitches.map((switchItem) => (
          <ul className={cx('list')} key={switchItem.id}>
            <li className={cx('item', 'title')}>{switchItem.switchName}</li>
            <li className={cx('item')}>
              {tPostDetail('switch_type')} : {tSwitchEnum(`switch_type_${snakecase(switchItem.switchType)}`)}
            </li>
            {switchItem.isSlientSwitch === true && <li className={cx('item')}>{tPostDetail('silent_switch')}</li>}
            <li className={cx('item')}>
              {tPostDetail('switch_lube')} : {tSwitchEnum(`switch_lube_${snakecase(switchItem.switchLube)}`)}
            </li>
            {switchItem.bottomOutForce && (
              <li className={cx('item')}>
                {tPostDetail('switch_bottom_out_force')} : {`${switchItem.bottomOutForce}g`}{' '}
              </li>
            )}
            {switchItem.springLength && (
              <li className={cx('item')}>
                {tPostDetail('switch_spring_length')} : {`${switchItem.springLength}mm`}{' '}
              </li>
            )}
            {switchItem.switchFilm && (
              <li className={cx('item')}>
                {tPostDetail('switch_film')} : {switchItem.switchFilm}{' '}
              </li>
            )}
            {switchItem.remark && <li className={cx('item')}>{switchItem.remark} </li>}
          </ul>
        ))}
      </div>
    </div>
  );
}
