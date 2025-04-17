'use client';

import { useEffect, useState } from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import { bindClassNames } from '@/libs/BindClassName';

import './ImageGallery.scss';
import styles from './PostImage.module.css';

import useWindowSize from '@/hooks/useWindowSize';

const cx = bindClassNames(styles);

type Props = {};

export default function PostImage({}: Props) {
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const postImages = postData?.postImages.map((image) => ({
    original: image.imageUrl,
    thumbnail: image.imageUrl,
    loading: 'lazy',
    originalHeight: 600,
    thumbnailLoading: 'lazy',
    thumbnailHeight: 90,
    originalClass: 'gallery_original_img',
    thumbnailClassClass: 'gallery_thumbnail_img',
    bulletClass: '',
  })) as ReactImageGalleryItem[];

  const { userDevice } = useWindowSize();

  const [isCover, setIsCover] = useState<boolean>(false);
  useEffect(() => {
    if (userDevice === 'mobile') {
      setIsCover(true);
    }
  }, [userDevice]);

  const renderGalleryItem = (item: ReactImageGalleryItem) => {
    return (
      <div className="image-container">
        <img
          src={item.original}
          className={`image-gallery-image ${isCover ? 'cover' : 'contain'}`}
          height={item.originalHeight}
          onClick={() => setIsCover((prev) => !prev)}
        />
      </div>
    );
  };

  return (
    <div className={cx('root')}>
      <ImageGallery
        items={postImages}
        renderItem={renderGalleryItem}
        showIndex
        infinite
        lazyLoad
        showBullets
        disableSwipe={false}
        showPlayButton={false}
        showThumbnails
        slideDuration={500}
        thumbnailPosition="right"
        renderCustomControls={() => <div className="blur_bg" />}
      />
    </div>
  );
}
