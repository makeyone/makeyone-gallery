'use client';

import { useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { editPostHousing } from '@/apis/posts/actions/EditPostHousing';
import { getPostById } from '@/apis/posts/actions/GetPostById';
import { EditPostHousingInput, EditPostHousingOutput } from '@/apis/posts/dtos/EditPostHousing.dto';
import { keyboardHousingFunctionKeyLayoutValues } from '@/apis/posts/enums/KeyboardHousingFunctionKeyLayout.enum';
import { KeyboardHousingLayout, keyboardHousingLayoutValues } from '@/apis/posts/enums/KeyboardHousingLayout.enum';
import { KeyboardHousingMount, keyboardHousingMountValues } from '@/apis/posts/enums/KeyboardHousingMount.enum';
import { keyboardHousingReAnodizedValues } from '@/apis/posts/enums/KeyboardHousingReAnodized.enum';
import { keyboardHousingWindowKeyLayoutValues } from '@/apis/posts/enums/KeyboardHousingWindowKeyLayout.enum';
import { EditPostHousingFormInput } from '@/apis/posts/form-inputs/EditPostHousing.input';
import { postsQueryKeys } from '@/apis/posts/posts.query-keys';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/FormFloatingLabelInput';
import FormFloatingLabelSelect from '@/components/FormFloatingLabelSelect';
import FormRadioGroupWithLabel from '@/components/FormRadioGroupWithLabel';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './PostHousing.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PostHousing({}: Props) {
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
    setValue,
    handleSubmit: handleSubmitAndNextStep,
    formState: { isValid, errors },
  } = useForm<EditPostHousingFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditPostHousingFormInput),
    defaultValues: {
      housingName: post?.postHousing?.housingName,
      housingColor: post?.postHousing?.housingColor,
      housingMount: post?.postHousing?.housingMount,
      housingLayout: post?.postHousing?.housingLayout,
      housingWindowKeyLayout: post?.postHousing?.housingWindowKeyLayout,
      housingFunctionKeyLayout: post?.postHousing?.housingFunctionKeyLayout,
      housingReAnodized: post?.postHousing?.isHousingReAnodized ? 'Y' : 'N',
    },
  });

  const { isPending, mutate } = useMutation<EditPostHousingOutput, AxiosError<EditPostHousingOutput>, EditPostHousingInput>({
    mutationFn: editPostHousing,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        return push(`/posts/${postId}/edit/pcb`);
      }
    },
  });
  const onSubmit = () => {
    const {
      housingName,
      housingColor,
      housingMount,
      housingLayout,
      housingWindowKeyLayout,
      housingFunctionKeyLayout,
      housingReAnodized,
    } = getValues();
    mutate({
      postId,
      housingName,
      housingColor,
      housingMount,
      housingLayout,
      housingWindowKeyLayout,
      housingFunctionKeyLayout,
      isHousingReAnodized: housingReAnodized === 'Y',
    });
  };

  return (
    <div className={cx('root')}>
      <StepCard cardTitle="하우징에 대한 정보를 입력해주세요." cardDescription="항목이나 내용의 잘못된 점이 있다면 문의해주세요!">
        <FormFloatingLabelInput
          label="하우징 이름"
          inputId="housingName"
          inputType="text"
          maxLength={200}
          inputRegisterReturn={register('housingName')}
          currentInputValue={watch().housingName}
          errorMessage={errors.housingName?.message}
        />
        <FormFloatingLabelInput
          label="하우징 색상"
          inputId="housingColor"
          inputType="text"
          maxLength={50}
          inputRegisterReturn={register('housingColor')}
          currentInputValue={watch().housingColor}
          errorMessage={errors.housingColor?.message}
        />
        <FormRadioGroupWithLabel
          label="하우징 구매 이후 아노다이징 여부"
          register={register('housingReAnodized')}
          required
          align="Row"
          name="housingReAnodized"
          items={keyboardHousingReAnodizedValues.map((reAnodized) => ({
            id: `housingReAnodized_${reAnodized.code}`,
            label: reAnodized.name,
            value: reAnodized.code,
          }))}
        />
        <FormFloatingLabelSelect
          inputId="housingMount"
          label="하우징 결합방식"
          fieldName="housingMount"
          register={register('housingMount')}
          setValue={setValue}
          defaultLabel={post?.postHousing?.housingMount && KeyboardHousingMount.findName(post.postHousing.housingMount)}
          defaultValue={post?.postHousing?.housingMount}
          allowSearch
          options={keyboardHousingMountValues.map((mount) => ({
            key: mount.code,
            label: mount.name,
            value: mount.code,
            searchKeywords: [mount.name, mount.name.replaceAll(' ', '')],
          }))}
        />
        <FormFloatingLabelSelect
          inputId="housingLayout"
          label="하우징 레이아웃"
          fieldName="housingLayout"
          register={register('housingLayout')}
          setValue={setValue}
          defaultLabel={post?.postHousing?.housingLayout && KeyboardHousingLayout.findName(post.postHousing.housingLayout)}
          defaultValue={post?.postHousing?.housingLayout}
          allowSearch
          options={keyboardHousingLayoutValues.map((layout) => ({
            key: layout.code,
            label: layout.name,
            value: layout.code,
            searchKeywords: [layout.name, layout.name.replaceAll(' ', '')],
          }))}
        />
        <FormRadioGroupWithLabel
          label="윈도우 레이아웃"
          register={register('housingWindowKeyLayout')}
          required
          align="Row"
          name="housingWindowKey"
          items={keyboardHousingWindowKeyLayoutValues.map((windowKey) => ({
            id: `housingWindowKey_${windowKey.code}`,
            label: windowKey.name,
            value: windowKey.code,
          }))}
        />
        <FormRadioGroupWithLabel
          label="Function 레이아웃"
          register={register('housingFunctionKeyLayout')}
          required
          align="Row"
          name="housingFunctionKey"
          items={keyboardHousingFunctionKeyLayoutValues.map((functionKeyLayout) => ({
            id: `housingFunctionKey_${functionKeyLayout.code}`,
            label: functionKeyLayout.name,
            value: functionKeyLayout.code,
          }))}
        />
      </StepCard>
      <PrevOrNextStep isFormValid={isValid} onNextStep={handleSubmitAndNextStep(onSubmit)} isNextStepLoading={isPending} />
    </div>
  );
}
