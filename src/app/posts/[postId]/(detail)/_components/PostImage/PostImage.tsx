'use client';

import 'react-image-gallery/styles/css/image-gallery.css';
import '@/styles/image-gallery.css';

import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostImage.module.css';

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

  return (
    <div className={cx('root')}>
      <ImageGallery
        items={postImages}
        showIndex
        infinite
        lazyLoad
        showBullets
        showPlayButton={false}
        showThumbnails
        thumbnailPosition="right"
        renderCustomControls={() => <div className="blur_bg" />}
      />
    </div>
  );
}
