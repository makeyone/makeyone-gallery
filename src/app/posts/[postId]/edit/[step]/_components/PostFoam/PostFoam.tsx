'use client';

import { useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import {
  keyboardFoamBottomKeys,
  KeyboardFoamBottomUnion,
  keyboardFoamBottomValues,
} from '@/constants/enum/KeyboardFoamBottom.enum';
import {
  keyboardFoamBottomSwitchPEKeys,
  KeyboardFoamBottomSwitchPEUnion,
  keyboardFoamBottomSwitchPEValues,
} from '@/constants/enum/KeyboardFoamBottomSwitchPE.enum';
import {
  keyboardFoamPlateBetweenPCBKeys,
  KeyboardFoamPlateBetweenPCBUnion,
  keyboardFoamPlateBetweenPCBValues,
} from '@/constants/enum/KeyboardFoamPlateBetweenPCB.enum';
import {
  keyboardFoamTapeModKeys,
  KeyboardFoamTapeModUnion,
  keyboardFoamTapeModValues,
} from '@/constants/enum/KeyboardFoamTapeMod.enum';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostFoam.module.css';

const cx = bindClassNames(styles);

class EditPostFoamFormInput {
  @IsNotEmpty()
  @IsEnum(keyboardFoamPlateBetweenPCBKeys)
  plateBetweenPCBFoam!: KeyboardFoamPlateBetweenPCBUnion;

  @IsNotEmpty()
  @IsEnum(keyboardFoamBottomSwitchPEKeys)
  bottomSwitchPEFoam!: KeyboardFoamBottomSwitchPEUnion;

  @IsNotEmpty()
  @IsEnum(keyboardFoamBottomKeys)
  bottomFoam!: KeyboardFoamBottomUnion;

  @IsNotEmpty()
  @IsEnum(keyboardFoamTapeModKeys)
  tapeMod!: KeyboardFoamTapeModUnion;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '특이사항은 300자 이하로 입력이 가능합니다.' })
  remark?: string;
}

type Props = {};

export default function PostFoam({}: Props) {
  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData, refetch } = useQuery({
    queryKey: postQueryKey.findPostById({ postId }),
    queryFn: () => PostQuery.findPostById({ postId }),
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

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.editPostFoam,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        push(`/posts/${postId}/edit/switch`);
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
