'use client';

import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import snakecase from 'snakecase';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import {
  keyboardPCBFlexCutKeys,
  KeyboardPCBFlexCutUnion,
  keyboardPCBFlexCutValues,
} from '@/constants/enum/KeyboardPCBFlexCut.enum';
import { keyboardPCBRgbKeys, KeyboardPCBRgbUnion, keyboardPCBRgbValues } from '@/constants/enum/KeyboardPCBRgb.enum';
import { keyboardPCBTypeKeys, KeyboardPCBTypeUnion, keyboardPCBTypeValues } from '@/constants/enum/KeyboardPCBType.enum';

import PrevOrNextStep from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/[locale]/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormFloatingLabelInputNumber from '@/components/Form/FormFloatingLabelInputNumber';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { useRouter } from '@/i18n/routing';

import styles from './PostPrintedCircuitBoard.module.css';

const cx = bindClassNames(styles);

class EditPostPrintedCircuitBoardFormInput {
  @IsNotEmpty({ message: 'edit_post_input_pcb_name_is_required' })
  @IsString()
  @MaxLength(200, { message: 'edit_post_input_pcb_name_max_length_is_200' })
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
  @IsNumber({ allowNaN: true }, { message: 'edit_post_input_pcb_thickness_only_number' })
  pcbThickness?: number;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: 'edit_post_input_pcb_remark_max_length_is_300' })
  remark?: string;
}

type Props = {};

export default function PostPrintedCircuitBoard({}: Props) {
  const tEditPost = useClientI18n('edit-post');
  const tPcbEnum = useClientI18n('pcb-enum');

  const params = useParams();
  const postId = Number(params.postId);
  const { data: postData } = useSuspenseQuery({
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
    onSuccess: () => push(`/posts/${postId}/edit/plate`),
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
      <StepCard cardTitle={tEditPost('edit_post_pcb_card_title')} cardDescription={tEditPost('edit_post_pcb_card_description')}>
        <FormFloatingLabelInput
          label={tEditPost('edit_post_input_pcb_name_label')}
          inputId="pcbName"
          inputType="text"
          maxLength={200}
          inputRegisterReturn={register('pcbName')}
          currentInputValue={watch().pcbName}
          errorMessage={errors.pcbName?.message && tEditPost(errors.pcbName.message)}
        />
        <FormRadioGroupWithLabel
          label={tEditPost('edit_post_input_pcb_type_label')}
          register={register('pcbType')}
          required
          align="Row"
          name="pcbType"
          items={keyboardPCBTypeValues.map((pcbType) => ({
            id: `pcbType${pcbType.code}`,
            label: tPcbEnum(`pcb_type_${snakecase(pcbType.code)}`),
            value: pcbType.code,
          }))}
        />
        <FormRadioGroupWithLabel
          label={tEditPost('edit_post_input_is_rgb_pcb_label')}
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
          label={tEditPost('edit_post_input_is_flex_cut_pcb_label')}
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
          label={tEditPost('edit_post_input_pcb_thickness_label')}
          inputId="pcbThickness"
          step="0.01"
          inputRegisterReturn={register(`pcbThickness`, {
            valueAsNumber: true,
          })}
          currentInputValue={Number(watch().pcbThickness)}
          errorMessage={errors.pcbThickness?.message && tEditPost(errors.pcbThickness.message)}
        />
        <FormFloatingLabelInput
          label={tEditPost('edit_post_input_pcb_remark_label')}
          inputId="remark"
          inputType="text"
          maxLength={300}
          inputRegisterReturn={register('remark')}
          currentInputValue={watch().remark}
          errorMessage={errors.remark?.message && tEditPost(errors.remark.message)}
        />
      </StepCard>
      <PrevOrNextStep isFormValid={isValid} onNextStep={handleSubmitAndNextStep(onSubmit)} isNextStepLoading={isPending} />
    </div>
  );
}
