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

export default function AllPhotosPage() {
  return <div className={cx('root')}>{/* <PostCardList posts={tempAllPosts} /> */}</div>;
}
