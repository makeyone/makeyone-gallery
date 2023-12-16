'use client';

import PostCard from '@/components/PostCard/PostCard';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostCardList.module.css';

const cx = bindClassNames(styles);

type Props = {
  posts: {
    id: number;
    brand: string;
    category: string;
    postTitle: string;
    images: {
      id: number;
      url: string;
    }[];
  }[];
};
export default function PostCardList({ posts }: Props) {
  return (
    <ul className={cx('list')}>
      {/* NOTE: 리스트 테스트 */}
      {posts.map((post) =>
        [1, 2, 3, 4, 5].map((i) => (
          <PostCard key={`${post.id}_${i}`} id={post.id} postTitle={post.postTitle} representPostImg={post.images[0].url} />
        )),
      )}
    </ul>
  );
}
