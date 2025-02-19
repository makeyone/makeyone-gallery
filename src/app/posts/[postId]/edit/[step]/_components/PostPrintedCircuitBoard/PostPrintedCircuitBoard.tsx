'use client';

import { useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import {
  keyboardPCBFlexCutKeys,
  KeyboardPCBFlexCutUnion,
  keyboardPCBFlexCutValues,
} from '@/constants/enum/KeyboardPCBFlexCut.enum';
import { keyboardPCBRgbKeys, KeyboardPCBRgbUnion, keyboardPCBRgbValues } from '@/constants/enum/KeyboardPCBRgb.enum';
import { keyboardPCBTypeKeys, KeyboardPCBTypeUnion, keyboardPCBTypeValues } from '@/constants/enum/KeyboardPCBType.enum';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormFloatingLabelInputNumber from '@/components/Form/FormFloatingLabelInputNumber';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostPrintedCircuitBoard.module.css';

const cx = bindClassNames(styles);

class EditPostPrintedCircuitBoardFormInput {
  @IsNotEmpty({ message: '기판 이름을 입력해주세요.' })
  @IsString()
  @MaxLength(200, { message: '기판 이름은 200자 이하로 입력이 가능합니다.' })
  pcbName!: string;

  @IsNotEmpty()
  @IsEnum(keyboardPCBTypeKeys)
  pcbType!: KeyboardPCBTypeUnion;

  @IsNotEmpty()
  @IsEnum(keyboardPCBRgbKeys)
  isRgbPcb!: KeyboardPCBRgbUnion;

  @IsNotEmpty()
  @IsEnum(keyboardPCBFlexCutKeys)
  isFlexCutPcb!: KeyboardPCBFlexCutUnion;

  @IsOptional()
  @IsNumber({ allowNaN: true }, { message: '숫자 또는 소수점만 입력이 가능합니다.' })
  pcbThickness?: number;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '특이사항은 300자 이하로 입력이 가능합니다.' })
  remark?: string;
}

type Props = {};

export default function PostPrintedCircuitBoard({}: Props) {
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
  } = useForm<EditPostPrintedCircuitBoardFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditPostPrintedCircuitBoardFormInput),
    defaultValues: {
      pcbName: postData?.postPrintedCircuitBoard?.pcbName,
      pcbType: postData?.postPrintedCircuitBoard?.pcbType,
      isFlexCutPcb: postData?.postPrintedCircuitBoard?.isFlexCutPcb === true ? 'Y' : 'N',
      isRgbPcb: postData?.postPrintedCircuitBoard?.isRgbPcb === true ? 'Y' : 'N',
      pcbThickness: postData?.postPrintedCircuitBoard?.pcbThickness || NaN,
      remark: postData?.postPrintedCircuitBoard?.remark || '',
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.editPostPCB,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        push(`/posts/${postId}/edit/plate`);
      }
    },
  });
  const onSubmit = () => {
    const { pcbName, pcbThickness, pcbType, isFlexCutPcb, isRgbPcb, remark } = getValues();
    mutate({
      postId,
      pcbName,
      pcbType,
      isFlexCutPcb: isFlexCutPcb === 'Y',
      isRgbPcb: isRgbPcb === 'Y',
      ...(pcbThickness && { pcbThickness }),
      ...(remark && { remark }),
    });
  };

  return (
    <div className={cx('root')}>
      <StepCard cardTitle="기판에 대한 정보를 입력해주세요." cardDescription="항목이나 내용의 잘못된 점이 있다면 문의해주세요!">
        <FormFloatingLabelInput
          label="기판 이름"
          inputId="pcbName"
          inputType="text"
          maxLength={200}
          inputRegisterReturn={register('pcbName')}
          currentInputValue={watch().pcbName}
          errorMessage={errors.pcbName?.message}
        />
        <FormRadioGroupWithLabel
          label="기판 종류"
          register={register('pcbType')}
          required
          align="Row"
          name="pcbType"
          items={keyboardPCBTypeValues.map((pcbType) => ({
            id: `pcbType${pcbType.code}`,
            label: pcbType.name,
            value: pcbType.code,
          }))}
        />
        <FormRadioGroupWithLabel
          label="RGB 기판 여부"
          register={register('isRgbPcb')}
          required
          align="Row"
          name="isRgbPcb"
          items={keyboardPCBRgbValues.map((rgb) => ({
            id: `isRgbPcb_${rgb.code}`,
            label: rgb.name,
            value: rgb.code,
          }))}
        />
        <FormRadioGroupWithLabel
          label="플렉스컷 기판 여부"
          register={register('isFlexCutPcb')}
          required
          align="Row"
          name="isFlexCutPcb"
          items={keyboardPCBFlexCutValues.map((flexCut) => ({
            id: `isFlexCutPcb_${flexCut.code}`,
            label: flexCut.name,
            value: flexCut.code,
          }))}
        />
        <FormFloatingLabelInputNumber
          required
          label="[선택사항] 기판 두께 (단위 : mm)"
          inputId="pcbThickness"
          step="0.01"
          inputRegisterReturn={register(`pcbThickness`, {
            valueAsNumber: true,
          })}
          currentInputValue={Number(watch().pcbThickness)}
          errorMessage={errors.pcbThickness?.message}
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
