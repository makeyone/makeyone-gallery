'use client';

import Link from 'next/link';

import { CiCircleCheck } from 'react-icons/ci';
import { PiWarningCircle } from 'react-icons/pi';
import { TbExternalLink } from 'react-icons/tb';
import { VscError } from 'react-icons/vsc';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostStepStatusItem.module.css';

const cx = bindClassNames(styles);

type Props = {
  stepLink: string;
  stepTitle: string;
  isRequiredStep: boolean;
  isWrote: boolean;
};

export default function PostStepStatusItem({ stepLink, stepTitle, isRequiredStep, isWrote }: Props) {
  return (
    <li className={cx('item')}>
      <span className={cx('title')}>{stepTitle}</span>
      <div className={cx('content')}>
        {isWrote === true && (
          <div className={cx('success')}>
            <CiCircleCheck className={cx('icon', 'success')} />
            작성 완료
          </div>
        )}
        {isRequiredStep === true && isWrote === false && (
          <div className={cx('error')}>
            <VscError className={cx('icon', 'error')} />
            작성 필요 (미작성)
          </div>
        )}
        {isRequiredStep === false && isWrote === false && (
          <div className={cx('warning')}>
            <PiWarningCircle className={cx('icon', 'warning')} />
            [선택사항] 작성하지 않아도 되지만 작성하면 좋아요!
          </div>
        )}
      </div>
      <Link className={cx('link')} href={stepLink}>
        작성하러가기
        <TbExternalLink className={cx('icon')} />
      </Link>
    </li>
  );
}
