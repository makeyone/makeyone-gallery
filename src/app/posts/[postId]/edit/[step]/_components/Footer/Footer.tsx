'use client';

import { useRouter } from 'next/navigation';

import { Line } from 'rc-progress';

import { EditPostStep } from '@/app/posts/[postId]/edit/[step]/page';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './Footer.module.css';

const cx = bindClassNames(styles);

type Props = {
  postId: number;
  stepList: EditPostStep[];
  currentStep: EditPostStep;
};

export default function Footer({ postId, stepList, currentStep }: Props) {
  const { push } = useRouter();
  const currentStepIndex = stepList.indexOf(currentStep);

  const handleClickPrevBtn = () => {
    if (currentStepIndex === 0) {
      return push('/');
    }

    const prevStep = stepList[currentStepIndex - 1];
    return push(`/posts/${postId}/edit/${prevStep}`);
  };

  const handleClickNextBtn = () => {
    if (currentStepIndex < stepList.length - 1) {
      const nextStep = stepList[currentStepIndex + 1];
      return push(`/posts/${postId}/edit/${nextStep}`);
    }

    // TODO: 최종 게시글 작성 완료 처리
    return console.log('최종 게시글 작성');
  };

  return (
    <footer className={cx('root')}>
      <Line
        percent={((stepList.indexOf(currentStep) + 1) / stepList.length) * 100}
        trailWidth={0.3}
        strokeWidth={0.3}
        trailColor="#D3D3D3"
        strokeColor="#fc8f88"
        strokeLinecap="square"
      />
      <div className={cx('controlBlock')}>
        <button type="button" className={cx('prevBtn')} onClick={handleClickPrevBtn}>
          이전
        </button>
        <button type="button" className={cx('nextBtn')} onClick={handleClickNextBtn}>
          다음
        </button>
      </div>
    </footer>
  );
}
