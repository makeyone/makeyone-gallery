'use client';

import { useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { editPostFoam } from '@/apis/posts/actions/EditPostFoam';
import { getPostById } from '@/apis/posts/actions/GetPostById';
import { EditPostFoamInput, EditPostFoamOutput } from '@/apis/posts/dtos/EditPostFoam.dto';
import { keyboardFoamBottomValues } from '@/apis/posts/enums/KeyboardFoamBottom.enum';
import { keyboardFoamBottomSwitchPEValues } from '@/apis/posts/enums/KeyboardFoamBottomSwitchPE.enum';
import { keyboardFoamPlateBetweenPCBValues } from '@/apis/posts/enums/KeyboardFoamPlateBetweenPCB.enum';
import { keyboardFoamTapeModValues } from '@/apis/posts/enums/KeyboardFoamTapeMod.enum';
import { EditPostFoamFormInput } from '@/apis/posts/form-inputs/EditPostFoam.input';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostFoam.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostFoam({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data: postData, refetch } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
    select: (selectData) => selectData.data,
  });

  const { push } = useRouter();
  const {
    register,
    watch,
    getValues,
    handleSubmit: handleSubmitAndNextStep,
    formState: { isValid, errors },
  } = useForm<EditPostFoamFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditPostFoamFormInput),
    defaultValues: {
      plateBetweenPCBFoam: postData?.postFoam?.plateBetweenPCBFoam === true ? 'Y' : 'N',
      bottomFoam: postData?.postFoam?.bottomFoam === true ? 'Y' : 'N',
      bottomSwitchPEFoam: postData?.postFoam?.bottomSwitchPEFoam === true ? 'Y' : 'N',
      tapeMod: postData?.postFoam?.tapeMod === true ? 'Y' : 'N',
      remark: postData?.postFoam?.remark || '',
    },
  });

  const { isPending, mutate } = useMutation<EditPostFoamOutput, AxiosError<EditPostFoamOutput>, EditPostFoamInput>({
    mutationFn: editPostFoam,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        return push(`/posts/${postId}/edit/switch`);
      }
    },
  });
  const onSubmit = () => {
    const { plateBetweenPCBFoam, bottomFoam, bottomSwitchPEFoam, tapeMod, remark } = getValues();
    mutate({
      postId,
      plateBetweenPCBFoam: plateBetweenPCBFoam === 'Y',
      bottomFoam: bottomFoam === 'Y',
      bottomSwitchPEFoam: bottomSwitchPEFoam === 'Y',
      tapeMod: tapeMod === 'Y',
      ...(remark && { remark }),
    });
  };

  return (
    <div className={cx('root')}>
      <StepCard cardTitle="흡음재에 대한 정보를 입력해주세요." cardDescription="항목이나 내용의 잘못된 점이 있다면 문의해주세요!">
        <FormRadioGroupWithLabel
          label="기보강 흠읍재 사용 여부"
          register={register('plateBetweenPCBFoam')}
          required
          align="Row"
          name="plateBetweenPCBFoam"
          items={keyboardFoamPlateBetweenPCBValues.map((foam) => ({
            id: `plateBetweenPCBFoam_${foam.code}`,
            label: foam.name,
            value: foam.code,
          }))}
        />
        <FormRadioGroupWithLabel
          label="스위치 하부 PE폼 흡음재"
          register={register('bottomSwitchPEFoam')}
          required
          align="Row"
          name="bottomSwitchPEFoam"
          items={keyboardFoamBottomSwitchPEValues.map((foam) => ({
            id: `bottomSwitchPEFoam_${foam.code}`,
            label: foam.name,
            value: foam.code,
          }))}
        />
        <FormRadioGroupWithLabel
          label="하부 흡음재 사용 여부"
          register={register('bottomFoam')}
          required
          align="Row"
          name="bottomFoam"
          items={keyboardFoamBottomValues.map((foam) => ({
            id: `bottomFoam_${foam.code}`,
            label: foam.name,
            value: foam.code,
          }))}
        />
        <FormRadioGroupWithLabel
          label="테이프 모드 여부"
          register={register('tapeMod')}
          required
          align="Row"
          name="tapeMod"
          items={keyboardFoamTapeModValues.map((foam) => ({
            id: `tapeMod_${foam.code}`,
            label: foam.name,
            value: foam.code,
          }))}
        />
        <FormFloatingLabelInput
          label="[선택입력] 특이사항"
          inputId="remark"
          inputType="text"
          maxLength={300}
          inputRegisterReturn={register('remark')}
          currentInputValue={watch().remark}
          errorMessage={errors.remark?.message}
        />
      </StepCard>
      <PrevOrNextStep isFormValid={isValid} onNextStep={handleSubmitAndNextStep(onSubmit)} isNextStepLoading={isPending} />
    </div>
  );
}
