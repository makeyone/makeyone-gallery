'use client';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './Welcome.module.css';

const cx = bindClassNames(styles);

export default function Welcome() {
  return (
    <div className={cx('block')}>
      <h2 className={cx('title')}>Welcome to Makeyone</h2>
      <h3 className={cx('subTitle')}>왼쪽의 소셜 로그인 버튼을 클릭해 메이키원을 시작해보세요.</h3>
      <h3 className={cx('description')}>네이버, 디스코드, 카카오, 구글로 로그인 할 수 있어요!</h3>
    </div>
  );
}
