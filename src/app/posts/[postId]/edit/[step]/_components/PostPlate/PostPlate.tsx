'use client';

import { useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { deletePostPlate } from '@/apis/posts/actions/DeletePostPlate';
import { editPostPlate } from '@/apis/posts/actions/EditPostPlate';
import { getPostById } from '@/apis/posts/actions/GetPostById';
import { DeletePostPlateInput, DeletePostPlateOutput } from '@/apis/posts/dtos/DeletePostPlate.dto';
import { EditPostPlateInput, EditPostPlateOutput } from '@/apis/posts/dtos/EditPostPlate.dto';
import { keyboardPlateFlexCutValues } from '@/apis/posts/enums/KeyboardPlateFlexCut.enum';
import { keyboardPlateHalfValues } from '@/apis/posts/enums/KeyboardPlateHalf.enum';
import { keyboardPlateTextureValues } from '@/apis/posts/enums/KeyboardPlateTexture.enum';
import { keyboardPlateUsedValues } from '@/apis/posts/enums/KeyboardPlateUsed.enum';
import { EditPostPlateFormInput } from '@/apis/posts/form-inputs/EditPostPlate.input';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/FormFloatingLabelInput';
import FormRadioGroupWithLabel from '@/components/FormRadioGroupWithLabel';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostPlate.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostPlate({}: Props) {
  const params = useParams();
  const postId = parseInt(params.postId as string, 10);
  const { data, refetch } = useQuery({
    queryKey: postsQueryKeys.byId(postId),
    queryFn: () => getPostById({ postId }),
  });
  const post = data?.post;

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
      isUsedPlate: post?.postPlate ? 'Y' : 'N',
      plateName: post?.postPlate?.plateName,
      plateTexture: post?.postPlate?.plateTexture,
      isFlexCutPlate: post?.postPlate?.isFlexCutPlate === true ? 'Y' : 'N',
      isHalfPlate: post?.postPlate?.isHalfPlate === true ? 'Y' : 'N',
      remark: post?.postPlate?.remark || '',
    },
  });
  const isUsedPlate = watch().isUsedPlate === 'Y';

  const { isPending: isEditPostPlatePending, mutate: editPostPlateMutate } = useMutation<
    EditPostPlateOutput,
    AxiosError<EditPostPlateOutput>,
    EditPostPlateInput
  >({
    mutationFn: editPostPlate,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        return push(`/posts/${postId}/edit/foam`);
      }
    },
  });

  const { isPending: isDeletePostPlatePending, mutate: deletePostPlateMutate } = useMutation<
    DeletePostPlateOutput,
    AxiosError<DeletePostPlateOutput>,
    DeletePostPlateInput
  >({
    mutationFn: deletePostPlate,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        return push(`/posts/${postId}/edit/foam`);
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
