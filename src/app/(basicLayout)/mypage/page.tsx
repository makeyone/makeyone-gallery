import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '마이페이지 - 메이키원 갤러리',
  };
}

type Props = {};

export default async function MyPage({}: Props) {
  return (
    <div>
      <div>마이페이지</div>
    </div>
  );
}
