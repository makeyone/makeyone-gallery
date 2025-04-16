'use client';

import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import snakecase from 'snakecase';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';

import {
  keyboardHousingFunctionKeyLayoutKeys,
  KeyboardHousingFunctionKeyLayoutUnion,
  keyboardHousingFunctionKeyLayoutValues,
} from '@/constants/enum/KeyboardHousingFunctionKeyLayout.enum';
import {
  keyboardHousingLayoutKeys,
  KeyboardHousingLayoutUnion,
  keyboardHousingLayoutValues,
} from '@/constants/enum/KeyboardHousingLayout.enum';
import {
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

import PrevOrNextStep from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/[locale]/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormFloatingLabelSelect from '@/components/Form/FormFloatingLabelSelect';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { useRouter } from '@/i18n/routing';

import styles from './PostHousing.module.css';

const cx = bindClassNames(styles);

class EditPostHousingFormInput {
  @IsNotEmpty({ message: 'edit_post_input_housing_name_is_required' })
  @IsString()
  @MaxLength(200, { message: 'edit_post_input_housing_name_max_length_is_200' })
  housingName!: string;

  @IsNotEmpty({ message: 'edit_post_input_housing_color_is_required' })
  @IsString()
  @MaxLength(50, { message: 'edit_post_input_housing_color_max_length_is_50' })
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
  const tEditPost = useClientI18n('edit-post');
  const tHousingEnum = useClientI18n('housing-enum');

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
    onSuccess: () => push(`/posts/${postId}/edit/pcb`),
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
      <StepCard
        cardTitle={tEditPost('edit_post_housing_card_title')}
        cardDescription={tEditPost('edit_post_housing_card_description')}
      >
        <FormFloatingLabelInput
          label={tEditPost('edit_post_input_housing_name_label')}
          inputId="housingName"
          inputType="text"
          maxLength={200}
          inputRegisterReturn={register('housingName')}
          currentInputValue={watch().housingName}
          errorMessage={errors.housingName?.message && tEditPost(errors.housingName.message)}
        />
        <FormFloatingLabelInput
          label={tEditPost('edit_post_input_housing_color_label')}
          inputId="housingColor"
          inputType="text"
          maxLength={50}
          inputRegisterReturn={register('housingColor')}
          currentInputValue={watch().housingColor}
          errorMessage={errors.housingColor?.message && tEditPost(errors.housingColor.message)}
        />
        <FormRadioGroupWithLabel
          label={tEditPost('edit_post_input_housing_re_anodized_label')}
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
          label={tEditPost('edit_post_input_housing_mount_label')}
          fieldName="housingMount"
          register={register('housingMount')}
          setValue={setValue}
          defaultLabel={
            postData?.postHousing?.housingMount && tHousingEnum(`housing_${snakecase(postData.postHousing.housingMount)}`)
          }
          defaultValue={postData?.postHousing?.housingMount}
          allowSearch
          options={keyboardHousingMountValues.map((mount) => ({
            key: mount.code,
            label: tHousingEnum(`housing_${snakecase(mount.code)}`),
            value: mount.code,
            searchKeywords: [tHousingEnum(`housing_${snakecase(mount.code)}`)],
          }))}
        />
        <FormFloatingLabelSelect
          inputId="housingLayout"
          label={tEditPost('edit_post_input_housing_layout_label')}
          fieldName="housingLayout"
          register={register('housingLayout')}
          setValue={setValue}
          defaultLabel={
            postData?.postHousing?.housingLayout &&
            tHousingEnum(`housing_layout_${snakecase(postData.postHousing.housingLayout)}`)
          }
          defaultValue={postData?.postHousing?.housingLayout}
          allowSearch
          options={keyboardHousingLayoutValues.map((layout) => ({
            key: layout.code,
            label: tHousingEnum(`housing_layout_${snakecase(layout.code)}`),
            value: layout.code,
            searchKeywords: [tHousingEnum(`housing_layout_${snakecase(layout.code)}`)],
          }))}
        />
        <FormRadioGroupWithLabel
          label={tEditPost('edit_post_input_housing_window_key_label')}
          register={register('housingWindowKeyLayout')}
          required
          align="Row"
          name="housingWindowKey"
          items={keyboardHousingWindowKeyLayoutValues.map((windowKey) => ({
            id: `housingWindowKey_${windowKey.code}`,
            label: tHousingEnum(`housing_window_key_layout_${snakecase(windowKey.code)}`),
            value: windowKey.code,
          }))}
        />
        <FormRadioGroupWithLabel
          label={tEditPost('edit_post_input_housing_function_key_label')}
          register={register('housingFunctionKeyLayout')}
          required
          align="Row"
          name="housingFunctionKey"
          items={keyboardHousingFunctionKeyLayoutValues.map((functionKeyLayout) => ({
            id: `housingFunctionKey_${functionKeyLayout.code}`,
            label: tHousingEnum(`housing_function_key_layout_${snakecase(functionKeyLayout.code)}`),
            value: functionKeyLayout.code,
          }))}
        />
      </StepCard>
      <PrevOrNextStep isFormValid={isValid} onNextStep={handleSubmitAndNextStep(onSubmit)} isNextStepLoading={isPending} />
    </div>
  );
}
