'use client';

import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { IoSettingsOutline } from 'react-icons/io5';

import { PostMutation } from '@/api/post/Post.mutation';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';

import { bindClassNames } from '@/libs/BindClassName.ts';
import { sweetConfirm } from '@/libs/CustomAlert';

import styles from './MyPostCard.module.css';

const cx = bindClassNames(styles);

type Props = {
  postId: number;
  postedDate: string;
  postThumbnail: string;
  postTitle: string;
  isPublished: boolean;
  removePostFromCache: (postId: number) => void;
};

export default function MyPostCard({ postId, postedDate, postThumbnail, postTitle, isPublished, removePostFromCache }: Props) {
  const { push } = useRouter();

  const [isSettingOpend, setIsSettingOpend] = useState<boolean>(false);
  const handleSettingMenuOpen = () => setIsSettingOpend(true);
  const handleSettingMenuClose = () => setIsSettingOpend(false);

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.deletePost,
    onSuccess: async () => {
      toast.success(`'${postTitle}' 게시글 삭제가 완료되었습니다.`);
      removePostFromCache(postId);
    },
  });

  const handleDeletePost = async () => {
    if (isPending === true) {
      return;
    }
    const confirm = await sweetConfirm.fire({ icon: 'warning', titleText: `'${postTitle}' 게시글을 제거하시겠습니까?` });
    if (confirm.isConfirmed) {
      mutate({ postId });
    }
  };

  return (
    <li key={postId} className={cx('card')}>
      <Link className={cx('link')} href="/posts/[postId]" as={`/posts/${postId}`}>
        <div className={cx('imgBlock')}>
          <BlurPlaceholderImage
            className={cx('postImg')}
            src={postThumbnail}
            alt={postTitle || ''}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
        <div className={cx('textBlock')}>
          <span className={cx('postedDate')}>{postedDate}</span>
          <h3 className={cx('postTitle')}>{postTitle}</h3>
        </div>
      </Link>
      <div className={cx('menuDiv')}>
        <button className={cx('menuOpenBtn')} type="button" onClick={handleSettingMenuOpen}>
          <IoSettingsOutline />
        </button>
        {isSettingOpend === true && (
          <OutsideClickHandler onOutsideClick={handleSettingMenuClose}>
            <ul className={cx('menuList')}>
              <li className={cx('menuItem')}>
                <button type="button" className={cx('menuBtn')} onClick={() => push(`/posts/${postId}/edit/setting`)}>
                  수정하기
                </button>
              </li>
              <li className={cx('menuItem')}>
                <button type="button" className={cx('menuBtn')} onClick={handleDeletePost}>
                  삭제하기
                </button>
              </li>
            </ul>
          </OutsideClickHandler>
        )}
      </div>
      <div className={cx('publishStatus', isPublished === true ? 'published' : 'notPublished')}>
        {isPublished === true ? '포스트 공개 중' : '공개 전'}
      </div>
    </li>
  );
}
