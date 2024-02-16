import { Metadata } from 'next';

import PageSubject from '@/app/posts/[postId]/edit/[step]/_components/PageSubject';
import CreatePostForm from '@/app/posts/[postId]/edit/[step]/_components/EditPostForm';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '글 작성 - 메이키원 갤러리',
  };
}

export default function AllPhotosPage() {
  return (
    <div className={cx('root')}>
      <PageSubject />
      <CreatePostForm />
    </div>
  );
}
