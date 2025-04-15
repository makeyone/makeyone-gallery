import '@/styles/reset.css';
import '@/styles/global.css';
import '@/styles/error.css';

import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en-US">
      <body>
        <div className="root">
          <h1 className="title">Sorry, the page could not be found!</h1>
          <p className="content">
            We couldn't find the page you were looking for.
            <br />
            You may have entered the URL incorrectly.
            <br />
            Please double-check the URL.
          </p>
          <Image className="image" src="/images/error/404.svg" alt="404" title="404" width={320} height={240} />
          <Link href="/" replace className="homeLink">
            Go home
          </Link>
        </div>
      </body>
    </html>
  );
}
