'use client';

import { useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { editPostPCB } from '@/apis/posts/actions/EditPostPCB';
import { getPostById } from '@/apis/posts/actions/GetPostById';
import { EditPostPCBInput, EditPostPCBOutput } from '@/apis/posts/dtos/EditPostPCB.dto';
import { keyboardPCBFlexCutValues } from '@/apis/posts/enums/KeyboardPCBFlexCut.enum';
import { keyboardPCBRgbValues } from '@/apis/posts/enums/KeyboardPCBRgb.enum';
import { keyboardPCBTypeValues } from '@/apis/posts/enums/KeyboardPCBType.enum';
import { EditPostPrintedCircuitBoardFormInput } from '@/apis/posts/form-inputs/EditPostPrintedCircuitBoard.input';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormFloatingLabelInputNumber from '@/components/Form/FormFloatingLabelInputNumber';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostPrintedCircuit.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostPrintedCircuit({}: Props) {
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

  const { isPending, mutate } = useMutation<EditPostPCBOutput, AxiosError<EditPostPCBOutput>, EditPostPCBInput>({
    mutationFn: editPostPCB,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        return push(`/posts/${postId}/edit/plate`);
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
