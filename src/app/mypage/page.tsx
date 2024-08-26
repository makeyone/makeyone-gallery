import { Metadata } from 'next';

import { getMe } from '@/apis/users/actions/GetMe';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '마이페이지 - 메이키원 갤러리',
  };
}

async function getMeData() {
  const res = await getMe();
  return res.data;
}

type Props = {};

export default async function EditPostPage({}: Props) {
  const me = await getMeData();
  console.log('>> me : ', me);
  if (!me) {
    console.log('!!!!!!!!!!');
    // redirect('/');
  }

  return (
    <div className={cx('root')}>
      <div>마이페이지</div>
    </div>
  );
}
