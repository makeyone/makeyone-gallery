'use client';

import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';
import { IoSettingsOutline } from 'react-icons/io5';

import { PostMutation } from '@/api/post/Post.mutation';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';

import useClientI18n from '@/hooks/useClientI18n';
import useWindowSize from '@/hooks/useWindowSize';

import { bindClassNames } from '@/libs/BindClassName';
import { sweetConfirm } from '@/libs/CustomAlert';

import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';

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
  const t = useClientI18n('my-post');

  const { push } = useRouter();
  const { userDevice } = useWindowSize();

  const [isSettingOpend, setIsSettingOpend] = useState<boolean>(false);
  const handleSettingMenuOpen = () => setIsSettingOpend(true);
  const handleSettingMenuClose = () => setIsSettingOpend(false);

  const handleClickEditBtn = () => {
    if (userDevice === 'mobile') return toast.warning(t('edit_post_mobile_not_supported'));

    push(`/posts/${postId}/edit/setting`);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.deletePost,
    onSuccess: async () => {
      toast.success(t('delete_post_success', { postTitle }));
      removePostFromCache(postId);
    },
  });

  const handleDeletePost = async () => {
    if (isPending === true) {
      return;
    }
    const confirm = await sweetConfirm.fire({ icon: 'warning', titleText: t('delete_post_confirm', { postTitle }) });
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
          <span className={cx('postedDate')}>{t('posted_date', { timeAgo: postedDate })}</span>
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
                <button type="button" className={cx('menuBtn')} onClick={handleClickEditBtn}>
                  {t('edit_post_btn')}
                </button>
              </li>
              <li className={cx('menuItem')}>
                <button type="button" className={cx('menuBtn')} onClick={handleDeletePost}>
                  {t('delete_post_btn')}
                </button>
              </li>
            </ul>
          </OutsideClickHandler>
        )}
      </div>
      <div className={cx('publishStatus', isPublished === true ? 'published' : 'notPublished')}>
        {isPublished === true ? t('published_post') : t('unpublish_post')}
      </div>
    </li>
  );
}
