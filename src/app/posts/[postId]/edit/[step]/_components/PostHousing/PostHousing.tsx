'use client';

import { useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import {
  keyboardHousingFunctionKeyLayoutKeys,
  KeyboardHousingFunctionKeyLayoutUnion,
  keyboardHousingFunctionKeyLayoutValues,
} from '@/constants/enum/KeyboardHousingFunctionKeyLayout.enum';
import {
  KeyboardHousingLayout,
  keyboardHousingLayoutKeys,
  KeyboardHousingLayoutUnion,
  keyboardHousingLayoutValues,
} from '@/constants/enum/KeyboardHousingLayout.enum';
import {
  KeyboardHousingMount,
  keyboardHousingMountKeys,
  KeyboardHousingMountUnion,
  keyboardHousingMountValues,
} from '@/constants/enum/KeyboardHousingMount.enum';
import {
  keyboardHousingReAnodizedKeys,
  KeyboardHousingReAnodizedUnion,
  keyboardHousingReAnodizedValues,
} from '@/constants/enum/KeyboardHousingReAnodized.enum';
import {
  keyboardHousingWindowKeyLayoutKeys,
  KeyboardHousingWindowKeyLayoutUnion,
  keyboardHousingWindowKeyLayoutValues,
} from '@/constants/enum/KeyboardHousingWindowKeyLayout.enum';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormFloatingLabelSelect from '@/components/Form/FormFloatingLabelSelect';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './PostHousing.module.css';

const cx = bindClassNames(styles);

class EditPostHousingFormInput {
  @IsNotEmpty({ message: '하우징 이름을 입력해주세요.' })
  @IsString()
  @MaxLength(200, { message: '하우징 이름은 200자 이하로 입력이 가능합니다.' })
  housingName!: string;

  @IsNotEmpty({ message: '하우징 색상을 입력해주세요.' })
  @IsString()
  @MaxLength(50, { message: '하우징 색상은 50자 이하로 입력이 가능합니다.' })
  housingColor!: string;

  @IsNotEmpty()
  @IsEnum(keyboardHousingMountKeys)
  housingMount!: KeyboardHousingMountUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingLayoutKeys)
  housingLayout!: KeyboardHousingLayoutUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingWindowKeyLayoutKeys)
  housingWindowKeyLayout!: KeyboardHousingWindowKeyLayoutUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingFunctionKeyLayoutKeys)
  housingFunctionKeyLayout!: KeyboardHousingFunctionKeyLayoutUnion;

  @IsNotEmpty()
  @IsEnum(keyboardHousingReAnodizedKeys)
  housingReAnodized!: KeyboardHousingReAnodizedUnion;
}

type Props = {};

export default function PostHousing({}: Props) {
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
    setValue,
    handleSubmit: handleSubmitAndNextStep,
    formState: { isValid, errors },
  } = useForm<EditPostHousingFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditPostHousingFormInput),
    defaultValues: {
      housingName: postData?.postHousing?.housingName,
      housingColor: postData?.postHousing?.housingColor,
      housingMount: postData?.postHousing?.housingMount,
      housingLayout: postData?.postHousing?.housingLayout,
      housingWindowKeyLayout: postData?.postHousing?.housingWindowKeyLayout,
      housingFunctionKeyLayout: postData?.postHousing?.housingFunctionKeyLayout,
      housingReAnodized: postData?.postHousing?.isHousingReAnodized ? 'Y' : 'N',
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.editPostHousing,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        push(`/posts/${postId}/edit/pcb`);
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
          defaultLabel={postData?.postHousing?.housingMount && KeyboardHousingMount.findName(postData.postHousing.housingMount)}
          defaultValue={postData?.postHousing?.housingMount}
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
          defaultLabel={
            postData?.postHousing?.housingLayout && KeyboardHousingLayout.findName(postData.postHousing.housingLayout)
          }
          defaultValue={postData?.postHousing?.housingLayout}
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
