'use client';

import Link from 'next/link';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostCard.module.css';

const cx = bindClassNames(styles);

type Props = {
  id: number;
  postTitle: string;
  representPostImg: string;
};

export default function PostCard({ id, postTitle, representPostImg }: Props) {
  return (
    <li className={cx('card')}>
      <Link className={cx('link')} href="/posts/[postId]" as={`/posts/${id}`}>
        <BlurPlaceholderImage
          className={cx('postImg')}
          src={representPostImg}
          alt={postTitle}
          width={0}
          height={0}
          sizes="100vw"
        />
      </Link>
    </li>
  );
}
