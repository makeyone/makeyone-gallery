'use client';

import { useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

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

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostPlate.module.css';

const cx = bindClassNames(styles);

class EditPostPlateFormInput {
  @IsNotEmpty()
  @IsEnum(keyboardPlateUsedKeys)
  isUsedPlate!: KeyboardPlateUsedUnion;

  @IsNotEmpty({ message: '보강판 이름을 입력해주세요.' })
  @IsString()
  @MaxLength(200, { message: '보강판 이름은 200자 이하로 입력이 가능합니다.' })
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
  @MaxLength(300, { message: '특이사항은 300자 이하로 입력이 가능합니다.' })
  remark?: string;
}

type Props = {};

export default function PostPlate({}: Props) {
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
      <StepCard cardTitle="보강판에 대한 정보를 입력해주세요." cardDescription="항목이나 내용의 잘못된 점이 있다면 문의해주세요!">
        <FormRadioGroupWithLabel
          label="보강판 사용 여부"
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
              label="보강판 이름"
              inputId="plateName"
              inputType="text"
              maxLength={200}
              inputRegisterReturn={register('plateName')}
              currentInputValue={watch().plateName}
              errorMessage={errors.plateName?.message}
            />
            <FormRadioGroupWithLabel
              label="보강판 재질"
              register={register('plateTexture')}
              required
              align="Row"
              name="plateType"
              items={keyboardPlateTextureValues.map((texture) => ({
                id: `plateType_${texture.code}`,
                label: texture.name,
                value: texture.code,
              }))}
            />
            <FormRadioGroupWithLabel
              label="하프 보강판 여부"
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
              label="플렉스컷 보강판 여부"
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
              label="[선택입력] 특이사항"
              inputId="remark"
              inputType="text"
              maxLength={300}
              inputRegisterReturn={register('remark')}
              currentInputValue={watch().remark}
              errorMessage={errors.remark?.message}
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
