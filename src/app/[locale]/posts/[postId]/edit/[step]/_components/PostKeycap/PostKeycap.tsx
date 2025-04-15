'use client';

import 'reflect-metadata';

import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useParams } from 'next/navigation';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { FcFullTrash } from 'react-icons/fc';
import { IoMdAdd } from 'react-icons/io';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';
import { EditPostKeycapReq } from '@/api/post/request/EditPostKeycapReq';

import {
  keyboardKeycapProfileKeys,
  KeyboardKeycapProfileUnion,
  keyboardKeycapProfileValues,
} from '@/constants/enum/KeyboardKeycapProfile.enum';
import {
  keyboardKeycapTextureKeys,
  KeyboardKeycapTextureUnion,
  keyboardKeycapTextureValues,
} from '@/constants/enum/KeyboardKeycapTexture.enum';

import PrevOrNextStep from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/[locale]/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';
import { sweetConfirm } from '@/libs/CustomAlert';

import { useRouter } from '@/i18n/routing';

import styles from './PostKeycap.module.css';

const cx = bindClassNames(styles);

// NOTE: react-hook-form의 useFieldArray append메서드의 초기화 문제 때문에 모든 필드에 optional chaining을 걸어둠. (실제 type check는 class validator 참고)
class EditPostKeycap {
  @IsOptional()
  @IsNumber()
  keycapId?: number;

  @IsNotEmpty({ message: 'edit_post_input_keycap_name_is_required' })
  @IsString()
  @MaxLength(200, { message: 'edit_post_input_keycap_name_max_length_is_200' })
  keycapName?: string;

  @IsEnum(keyboardKeycapProfileKeys)
  keycapProfile?: KeyboardKeycapProfileUnion;

  @IsEnum(keyboardKeycapTextureKeys)
  keycapTexture?: KeyboardKeycapTextureUnion;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'edit_post_input_keycap_manufacturer_max_length_is_100' })
  manufacturer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: 'edit_post_input_keycap_remark_max_length_is_300' })
  remark?: string;
}

class EditPostKeycapFormInput {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EditPostKeycap)
  keycaps!: EditPostKeycap[];
}

type Props = {};

export default function PostKeycap({}: Props) {
  const t = useClientI18n('edit-post');

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
    control,
    handleSubmit: handleSubmitAndNextStep,
    formState: { isValid, errors },
  } = useForm<EditPostKeycapFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditPostKeycapFormInput),
    defaultValues: {
      keycaps:
        postData?.postKeycaps.length === 0
          ? [{}]
          : postData?.postKeycaps.map((keycap) => ({
              keycapId: keycap.id,
              keycapName: keycap.keycapName,
              keycapProfile: keycap.keycapProfile,
              keycapTexture: keycap.keycapTexture,
              ...(keycap.manufacturer && { manufacturer: keycap.manufacturer }),
              ...(keycap.remark && { remark: keycap.remark }),
            })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'keycaps',
    control,
  });
  const handleClickAddKeycap = () => append({});
  const handleClickDeleteKeycap = async (index: number, keycapName?: string) => {
    if (fields.length === 1) {
      return toast.error(t('edit_post_keycap_is_required'));
    }

    if (keycapName && keycapName.replaceAll(' ', '') === '') {
      return remove(index);
    }

    const confirm = await sweetConfirm.fire({
      icon: 'warning',
      titleText: t('edit_post_delete_keycap_confirm', { keycapName }),
    });
    if (confirm.isConfirmed) {
      remove(index);
    }
  };

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.editPostKeycap,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        push(`/posts/${postId}/edit/stabilizer`);
      }
    },
  });

  const onSubmit = () => {
    const { keycaps } = getValues();
    const editPostKeycapsInput: EditPostKeycapReq['keycaps'] = keycaps.map((keycap) => ({
      ...(keycap.keycapId && { keycapId: keycap.keycapId }),
      keycapName: keycap.keycapName as string,
      keycapProfile: keycap.keycapProfile as KeyboardKeycapProfileUnion,
      keycapTexture: keycap.keycapTexture as KeyboardKeycapTextureUnion,
      ...(keycap.manufacturer && { manufacturer: keycap.manufacturer }),
      ...(keycap.remark && { remark: keycap.remark }),
    }));
    mutate({ postId, keycaps: editPostKeycapsInput });
  };

  return (
    <form className={cx('root')}>
      <StepCard cardTitle={t('edit_post_keycap_card_title')} cardDescription={t('edit_post_keycap_card_description')}>
        <ul className={cx('keycapList')}>
          {fields.map((field, index) => {
            return (
              <li key={field.id} className={cx('keycapItem')}>
                <FormFloatingLabelInput
                  label={t('edit_post_input_keycap_name_label')}
                  inputId={`keycapName-${index}`}
                  inputType="text"
                  maxLength={200}
                  inputRegisterReturn={register(`keycaps.${index}.keycapName`)}
                  currentInputValue={watch().keycaps?.[index].keycapName}
                  errorMessage={errors.keycaps?.[index]?.keycapName?.message && t(errors.keycaps?.[index].keycapName.message)}
                />
                <FormRadioGroupWithLabel
                  label={t('edit_post_input_keycap_profile_label')}
                  register={register(`keycaps.${index}.keycapProfile`)}
                  required
                  align="Row"
                  name={`keycapProfile-${index}`}
                  items={keyboardKeycapProfileValues.map((keycapProfile) => ({
                    id: `keycapProfile_${keycapProfile.code}_${index}`,
                    label: keycapProfile.code,
                    value: keycapProfile.code,
                  }))}
                />
                <FormRadioGroupWithLabel
                  label={t('edit_post_input_keycap_texture_label')}
                  register={register(`keycaps.${index}.keycapTexture`)}
                  required
                  align="Row"
                  name={`keycapTexture-${index}`}
                  items={keyboardKeycapTextureValues.map((keycapTexture) => ({
                    id: `keycapTexture_${keycapTexture.code}_${index}`,
                    label: keycapTexture.code,
                    value: keycapTexture.code,
                  }))}
                />
                <FormFloatingLabelInput
                  label={t('edit_post_input_keycap_manufacturer_label')}
                  inputId={`manufacturer-${index}`}
                  inputType="text"
                  maxLength={100}
                  inputRegisterReturn={register(`keycaps.${index}.manufacturer`)}
                  currentInputValue={watch().keycaps?.[index].manufacturer}
                  errorMessage={errors.keycaps?.[index]?.manufacturer?.message}
                />
                <FormFloatingLabelInput
                  label={t('edit_post_input_keycap_remark_label')}
                  inputId={`remark-${index}`}
                  inputType="text"
                  maxLength={300}
                  inputRegisterReturn={register(`keycaps.${index}.remark`)}
                  currentInputValue={watch().keycaps?.[index].remark}
                  errorMessage={errors.keycaps?.[index]?.remark?.message}
                />
                <button
                  type="button"
                  className={cx('deleteKeycapBtn')}
                  onClick={() => handleClickDeleteKeycap(index, watch().keycaps?.[index].keycapName)}
                >
                  <FcFullTrash className={cx('deleteIcon')} />
                  {t('edit_post_input_keycap_remove_btn')}
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" className={cx('addKeycapBtn')} onClick={handleClickAddKeycap}>
          <IoMdAdd className={cx('addIcon')} />
          {t('edit_post_input_keycap_add_btn')}
        </button>
      </StepCard>
      <PrevOrNextStep isFormValid={isValid} onNextStep={handleSubmitAndNextStep(onSubmit)} isNextStepLoading={isPending} />
    </form>
  );
}
