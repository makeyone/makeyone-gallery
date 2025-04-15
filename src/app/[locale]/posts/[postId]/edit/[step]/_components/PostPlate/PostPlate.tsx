'use client';

import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import snakecase from 'snakecase';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import {
  keyboardPlateFlexCutKeys,
  KeyboardPlateFlexCutUnion,
  keyboardPlateFlexCutValues,
} from '@/constants/enum/KeyboardPlateFlexCut.enum';
import { keyboardPlateHalfKeys, KeyboardPlateHalfUnion, keyboardPlateHalfValues } from '@/constants/enum/KeyboardPlateHalf.enum';
import {
  keyboardPlateTextureKeys,
  KeyboardPlateTextureUnion,
  keyboardPlateTextureValues,
} from '@/constants/enum/KeyboardPlateTexture.enum';
import { keyboardPlateUsedKeys, KeyboardPlateUsedUnion, keyboardPlateUsedValues } from '@/constants/enum/KeyboardPlateUsed.enum';

import PrevOrNextStep from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/[locale]/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { useRouter } from '@/i18n/routing';

import styles from './PostPlate.module.css';

const cx = bindClassNames(styles);

class EditPostPlateFormInput {
  @IsNotEmpty()
  @IsEnum(keyboardPlateUsedKeys)
  isUsedPlate!: KeyboardPlateUsedUnion;

  @IsNotEmpty({ message: 'edit_post_input_plate_name_is_required' })
  @IsString()
  @MaxLength(200, { message: 'edit_post_input_plate_name_max_length_is_200' })
  plateName!: string;

  @IsNotEmpty()
  @IsEnum(keyboardPlateTextureKeys)
  plateTexture!: KeyboardPlateTextureUnion;

  @IsNotEmpty()
  @IsEnum(keyboardPlateHalfKeys)
  isHalfPlate!: KeyboardPlateHalfUnion;

  @IsNotEmpty()
  @IsEnum(keyboardPlateFlexCutKeys)
  isFlexCutPlate!: KeyboardPlateFlexCutUnion;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: 'edit_post_input_plate_remark_max_length_is_300' })
  remark?: string;
}

type Props = {};

export default function PostPlate({}: Props) {
  const tEditPost = useClientI18n('edit-post');
  const tPlateEnum = useClientI18n('plate-enum');

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
  } = useForm<EditPostPlateFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditPostPlateFormInput),
    defaultValues: {
      isUsedPlate: postData?.postPlate ? 'Y' : 'N',
      plateName: postData?.postPlate?.plateName,
      plateTexture: postData?.postPlate?.plateTexture,
      isFlexCutPlate: postData?.postPlate?.isFlexCutPlate === true ? 'Y' : 'N',
      isHalfPlate: postData?.postPlate?.isHalfPlate === true ? 'Y' : 'N',
      remark: postData?.postPlate?.remark || '',
    },
  });
  const isUsedPlate = watch().isUsedPlate === 'Y';

  const { isPending: isEditPostPlatePending, mutate: editPostPlateMutate } = useMutation({
    mutationFn: PostMutation.editPostPlate,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        push(`/posts/${postId}/edit/foam`);
      }
    },
  });

  const { isPending: isDeletePostPlatePending, mutate: deletePostPlateMutate } = useMutation({
    mutationFn: PostMutation.deletePostPlate,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        push(`/posts/${postId}/edit/foam`);
      }
    },
  });

  const onSubmitEditPlate = () => {
    const { plateName, plateTexture, isFlexCutPlate, isHalfPlate, remark } = getValues();
    editPostPlateMutate({
      postId,
      plateName,
      plateTexture,
      isFlexCutPlate: isFlexCutPlate === 'Y',
      isHalfPlate: isHalfPlate === 'Y',
      ...(remark && { remark }),
    });
  };

  const handleDeletePlate = () => {
    deletePostPlateMutate({ postId });
  };

  const handleNextStep = () => {
    if (isUsedPlate === true) {
      return handleSubmitAndNextStep(onSubmitEditPlate)();
    }

    return handleDeletePlate();
  };

  return (
    <div className={cx('root')}>
      <StepCard
        cardTitle={tEditPost('edit_post_plate_card_title')}
        cardDescription={tEditPost('edit_post_plate_card_description')}
      >
        <FormRadioGroupWithLabel
          label={tEditPost('edit_post_input_is_used_plate_label')}
          register={register('isUsedPlate')}
          required
          align="Row"
          name="isUsedPlate"
          items={keyboardPlateUsedValues.map((used) => ({
            id: `isUsedPlate_${used.code}`,
            label: used.name,
            value: used.code,
          }))}
        />
        {watch().isUsedPlate === 'Y' && (
          <>
            <FormFloatingLabelInput
              label={tEditPost('edit_post_input_plate_name_label')}
              inputId="plateName"
              inputType="text"
              maxLength={200}
              inputRegisterReturn={register('plateName')}
              currentInputValue={watch().plateName}
              errorMessage={errors.plateName?.message && tEditPost(errors.plateName.message)}
            />
            <FormRadioGroupWithLabel
              label={tEditPost('edit_post_input_plate_texture_label')}
              register={register('plateTexture')}
              required
              align="Row"
              name="plateType"
              items={keyboardPlateTextureValues.map((texture) => ({
                id: `plateType_${texture.code}`,
                label: tPlateEnum(`plate_texture_${snakecase(texture.code)}`),
                value: texture.code,
              }))}
            />
            <FormRadioGroupWithLabel
              label={tEditPost('edit_post_input_is_half_plate_label')}
              register={register('isHalfPlate')}
              required
              align="Row"
              name="isHalfPlate"
              items={keyboardPlateHalfValues.map((half) => ({
                id: `isHalfPlate_${half.code}`,
                label: half.name,
                value: half.code,
              }))}
            />
            <FormRadioGroupWithLabel
              label={tEditPost('edit_post_input_is_flex_cut_plate_label')}
              register={register('isFlexCutPlate')}
              required
              align="Row"
              name="isFlexCutPlate"
              items={keyboardPlateFlexCutValues.map((flexCut) => ({
                id: `isFlexCutPlate_${flexCut.code}`,
                label: flexCut.name,
                value: flexCut.code,
              }))}
            />
            <FormFloatingLabelInput
              label={tEditPost('edit_post_input_plate_remark_label')}
              inputId="remark"
              inputType="text"
              maxLength={300}
              inputRegisterReturn={register('remark')}
              currentInputValue={watch().remark}
              errorMessage={errors.remark?.message && tEditPost(errors.remark.message)}
            />
          </>
        )}
      </StepCard>
      <PrevOrNextStep
        isFormValid={isValid || isUsedPlate === false}
        onNextStep={() => handleNextStep()}
        isNextStepLoading={isEditPostPlatePending || isDeletePostPlatePending}
      />
    </div>
  );
}
