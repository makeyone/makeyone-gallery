'use client';

import { useParams, useRouter } from 'next/navigation';

import { Line } from 'rc-progress';

import { EditPostStep, stepList } from '@/app/posts/[postId]/edit/[step]/_constants/step';

import ComponentLoading from '@/components/Loading/ComponentLoading';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PrevOrNextStep.module.css';

const cx = bindClassNames(styles);

type Props = {
  isFormValid: boolean;
  onNextStep: (evt?: any) => Promise<void> | void;
  isNextStepLoading: boolean;
};

export default function PrevOrNextStep({ isFormValid, onNextStep, isNextStepLoading }: Props) {
  const params = useParams();
  const postId = params.postId as unknown as number;
  const currentStep = params.step as EditPostStep;

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
    if (isFormValid === false) {
      return;
    }

    return onNextStep();
  };

  return (
    <div className={cx('root')}>
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
        <button
          type="button"
          className={cx('nextBtn')}
          onClick={handleClickNextBtn}
          disabled={isFormValid === false || isNextStepLoading === true}
        >
          {isNextStepLoading === true ? <ComponentLoading /> : '다음'}
        </button>
      </div>
    </div>
  );
}
