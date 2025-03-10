import '@/styles/error.css';

import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="root">
      <h1 className="title">죄송합니다, 페이지를 찾을 수 없습니다!</h1>
      <p className="content">
        찾고 계신 페이지를 찾을 수 없습니다.
        <br />
        URL 주소를 잘못 입력하셨을 가능성이 있습니다.
        <br />
        URL 주소를 다시 한 번 확인해 주세요.
      </p>
      <Image className="image" src="/images/error/404.svg" alt="404" title="404" width={320} height={240} />
      <Link href="/" replace className="homeLink">
        홈으로 가기
      </Link>
    </div>
  );
}
