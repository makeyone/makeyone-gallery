import { FaLocationArrow } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PageSubject.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PageSubject({}: Props) {
  return (
    <div className={cx('root')}>
      <h1 className={cx('title')}>새로운 글 작성하기</h1>
      <h2 className={cx('breadCrumbs')}>
        <i className={cx('breadCrumbsIcon')}>
          <FaLocationArrow />
        </i>
        게시글
        <i className={cx('arrowIcon')}>
          <IoIosArrowForward />
        </i>
        게시글 작성하기
      </h2>
    </div>
  );
}
