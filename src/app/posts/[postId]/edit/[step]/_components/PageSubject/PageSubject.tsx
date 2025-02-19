'use client';

import { useParams } from 'next/navigation';

import { FaLocationArrow } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';

import { EditPostStep } from '@/app/posts/[postId]/edit/[step]/_constants/step';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PageSubject.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PageSubject({}: Props) {
  const params = useParams();
  const currentStep = params.step as EditPostStep;

  return (
    <div className={cx('root')}>
      <h1 className={cx('title')}>게시글 작성하기</h1>
      <h2 className={cx('breadCrumbs')}>
        <i className={cx('breadCrumbsIcon')}>
          <FaLocationArrow />
        </i>
        게시글
        <i className={cx('arrowIcon')}>
          <IoIosArrowForward />
        </i>
        게시글 작성하기
        <i className={cx('arrowIcon')}>
          <IoIosArrowForward />
        </i>
        {currentStep === 'title' && '제목'}
        {currentStep === 'image' && '이미지'}
        {currentStep === 'housing' && '하우징'}
        {currentStep === 'switch' && '스위치'}
        {currentStep === 'keycap' && '키캡'}
        {currentStep === 'stabilizer' && '스테빌라이저'}
        {currentStep === 'keyboard-definition' && '키보드 레이아웃'}
        {currentStep === 'switch-on-layout' && '레이아웃에 스위치 장착'}
        {currentStep === 'keycap-on-layout' && '레이아웃에 키캡 장착'}
        {currentStep === 'pcb' && 'PCB'}
        {currentStep === 'plate' && '보강판'}
        {currentStep === 'foam' && '흠음재'}
        {currentStep === 'video' && '타건 영상'}
        {currentStep === 'content' && '추가 내용'}
        {currentStep === 'setting' && '설정'}
      </h2>
    </div>
  );
}
