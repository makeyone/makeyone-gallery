'use client';

import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
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

import PrevOrNextStep from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/[locale]/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { useRouter } from '@/i18n/routing';

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
  @MaxLength(300, { message: 'edit_post_input_foam_remark_max_length_is_300' })
  remark?: string;
}

type Props = {};

export default function PostFoam({}: Props) {
  const t = useClientI18n('edit-post');

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
  } = useForm<EditPostFoamFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditPostFoamFormInput),
    defaultValues: {
      plateBetweenPCBFoam: postData?.postFoam?.plateFoam === true ? 'Y' : 'N',
      bottomFoam: postData?.postFoam?.caseFoam === true ? 'Y' : 'N',
      bottomSwitchPEFoam: postData?.postFoam?.pcbFoam === true ? 'Y' : 'N',
      tapeMod: postData?.postFoam?.tapeMod === true ? 'Y' : 'N',
      remark: postData?.postFoam?.remark || '',
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.editPostFoam,
    onSuccess: () => push(`/posts/${postId}/edit/switch`),
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
      <StepCard cardTitle={t('edit_post_foam_card_title')} cardDescription={t('edit_post_foam_card_description')}>
        <FormRadioGroupWithLabel
          label={t('edit_post_input_plate_foam_label')}
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
          label={t('edit_post_input_pcb_foam_label')}
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
          label={t('edit_post_input_case_foam_label')}
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
          label={t('edit_post_input_tape_mod_label')}
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
          label={t('edit_post_input_foam_remark_label')}
          inputId="remark"
          inputType="text"
          maxLength={300}
          inputRegisterReturn={register('remark')}
          currentInputValue={watch().remark}
          errorMessage={errors.remark?.message && t(errors.remark.message)}
        />
      </StepCard>
      <PrevOrNextStep isFormValid={isValid} onNextStep={handleSubmitAndNextStep(onSubmit)} isNextStepLoading={isPending} />
    </div>
  );
}
