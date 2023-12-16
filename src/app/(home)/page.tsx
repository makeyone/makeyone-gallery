import { Metadata } from 'next';

import PostCardList from '@/components/PostCardList';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '메이키원 갤러리',
  };
}

const tempAllPosts = [
  {
    id: 1,
    brand: 'GEONWORKS',
    category: 'KEYBOARDS',
    postTitle: 'GEONWORKS F1-8X Regal Edition',
    images: [
      {
        id: 1,
        url: '/images/samples/f1_regal_1.jpeg',
      },
      {
        id: 2,
        url: '/images/samples/f1_regal_2.jpeg',
      },
    ],
  },
  {
    id: 2,
    brand: 'GEONWORKS',
    category: 'KEYBOARDS',
    postTitle: 'GEONWORKS F2-84 Cookies and Cream',
    images: [
      {
        id: 1,
        url: '/images/samples/f2-84_1.jpeg',
      },
      {
        id: 2,
        url: '/images/samples/f2-84_2.jpeg',
      },
    ],
  },
  {
    id: 3,
    brand: 'OWLAB',
    category: 'KEYBOARDS',
    postTitle: 'OWLAB Jelly Evolv',
    images: [
      {
        id: 1,
        url: '/images/samples/jelly_1.jpeg',
      },
      {
        id: 2,
        url: '/images/samples/jelly_2.jpeg',
      },
      {
        id: 3,
        url: '/images/samples/jelly_3.jpeg',
      },
      {
        id: 4,
        url: '/images/samples/jelly_4.jpeg',
      },
    ],
  },
];

export default function AllPhotosPage() {
  return (
    <div className={cx('root')}>
      <PostCardList posts={tempAllPosts} />
    </div>
  );
}
