'use client';

import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/apis/posts/actions/GetPostById';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import { bindClassNames } from '@/libs/bind-class-name';

import 'react-image-gallery/styles/css/image-gallery.css';

import '@/styles/image-gallery.css';

import styles from './PostImage.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostImage({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data: postData } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
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
