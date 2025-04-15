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
import snakecase from 'snakecase';

import { PostMutation } from '@/api/post/Post.mutation';
import { PostQuery, postQueryKey } from '@/api/post/Post.query';
import { EditPostStabilizerReq } from '@/api/post/request/EditPostStabilizerReq';

import {
  keyboardStabilizerMountKeys,
  KeyboardStabilizerMountUnion,
  keyboardStabilizerMountValues,
} from '@/constants/enum/KeyboardStabilizerMount.enum';
import {
  keyboardStabilizerTypeKeys,
  KeyboardStabilizerTypeUnion,
  keyboardStabilizerTypeValues,
} from '@/constants/enum/KeyboardStabilizerType.enum';

import PrevOrNextStep from '@/app/[locale]/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/[locale]/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';
import { sweetConfirm } from '@/libs/CustomAlert';

import { useRouter } from '@/i18n/routing';

import styles from './PostStabilizer.module.css';

const cx = bindClassNames(styles);

// NOTE: react-hook-form의 useFieldArray append메서드의 초기화 문제 때문에 모든 필드에 optional chaining을 걸어둠. (실제 type check는 class validator 참고)
class EditPostStabilizer {
  @IsOptional()
  @IsNumber()
  stabilizerId?: number;

  @IsNotEmpty({ message: 'edit_post_input_stabilizer_name_is_required' })
  @IsString()
  @MaxLength(100, { message: 'edit_post_input_stabilizer_name_max_length_is_100' })
  stabilizerName?: string;

  @IsEnum(keyboardStabilizerTypeKeys)
  stabilizerType?: KeyboardStabilizerTypeUnion;

  @IsEnum(keyboardStabilizerMountKeys)
  stabilizerMount?: KeyboardStabilizerMountUnion;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: 'edit_post_input_stabilizer_remark_max_length_is_300' })
  remark?: string;
}

class EditPostStabilizerFormInput {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EditPostStabilizer)
  stabilizers!: EditPostStabilizer[];
}

type Props = {};

export default function PostStabilizer({}: Props) {
  const tEditPost = useClientI18n('edit-post');
  const tStabilizerEnum = useClientI18n('stabilizer-enum');

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
  } = useForm<EditPostStabilizerFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditPostStabilizerFormInput),
    defaultValues: {
      stabilizers:
        postData?.postStabilizers.length === 0
          ? [{}]
          : postData?.postStabilizers.map((stabilizer) => ({
              stabilizerId: stabilizer.id,
              stabilizerName: stabilizer.stabilizerName,
              stabilizerType: stabilizer.stabilizerType,
              stabilizerMount: stabilizer.stabilizerMount,
              ...(stabilizer.remark && { remark: stabilizer.remark }),
            })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'stabilizers',
    control,
  });
  const handleClickAddStabilizer = () => append({});
  const handleClickDeleteStabilizer = async (index: number, stabilizerName?: string) => {
    if (fields.length === 1) {
      return toast.error(tEditPost('edit_post_stabilizer_is_required'));
    }

    if (stabilizerName && stabilizerName.replaceAll(' ', '') === '') {
      return remove(index);
    }

    const confirm = await sweetConfirm.fire({
      icon: 'warning',
      titleText: tEditPost('edit_post_delete_stabilizer_confirm', { stabilizerName }),
    });
    if (confirm.isConfirmed) {
      remove(index);
    }
  };

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.editPostStabilizer,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        push(`/posts/${postId}/edit/keyboard-definition`);
      }
    },
  });

  const onSubmit = () => {
    const { stabilizers } = getValues();
    const editPostStabilizersInput: EditPostStabilizerReq['stabilizers'] = stabilizers.map((stabilizer) => ({
      ...(stabilizer.stabilizerId && { stabilizerId: stabilizer.stabilizerId }),
      stabilizerName: stabilizer.stabilizerName as string,
      stabilizerType: stabilizer.stabilizerType as KeyboardStabilizerTypeUnion,
      stabilizerMount: stabilizer.stabilizerMount as KeyboardStabilizerMountUnion,
      ...(stabilizer.remark && { remark: stabilizer.remark }),
    }));
    mutate({ postId, stabilizers: editPostStabilizersInput });
  };

  return (
    <form className={cx('root')}>
      <StepCard
        cardTitle={tEditPost('edit_post_stabilizer_card_title')}
        cardDescription={tEditPost('edit_post_stabilizer_card_description')}
      >
        <ul className={cx('stabilizerList')}>
          {fields.map((field, index) => {
            return (
              <li key={field.id} className={cx('stabilizerItem')}>
                <FormFloatingLabelInput
                  label={tEditPost('edit_post_input_stabilizer_name_label')}
                  inputId={`stabilizerName-${index}`}
                  inputType="text"
                  maxLength={100}
                  inputRegisterReturn={register(`stabilizers.${index}.stabilizerName`)}
                  currentInputValue={watch().stabilizers?.[index].stabilizerName}
                  errorMessage={
                    errors.stabilizers?.[index]?.stabilizerName?.message &&
                    tEditPost(errors.stabilizers?.[index].stabilizerName.message)
                  }
                />
                <FormRadioGroupWithLabel
                  label={tEditPost('edit_post_input_stabilizer_type_label')}
                  register={register(`stabilizers.${index}.stabilizerType`)}
                  required
                  align="Row"
                  name={`stabilizerType-${index}`}
                  items={keyboardStabilizerTypeValues.map((stabilizerType) => ({
                    id: `stabilizerType_${stabilizerType.code}_${index}`,
                    label: tStabilizerEnum(`stabilizer_type_${snakecase(stabilizerType.code)}`),
                    value: stabilizerType.code,
                  }))}
                />
                <FormRadioGroupWithLabel
                  label={tEditPost('edit_post_input_stabilizer_mount_label')}
                  register={register(`stabilizers.${index}.stabilizerMount`)}
                  required
                  align="Row"
                  name={`stabilizerMount-${index}`}
                  items={keyboardStabilizerMountValues.map((stabilizerMount) => ({
                    id: `stabilizerMount_${stabilizerMount.code}_${index}`,
                    label: tStabilizerEnum(`stabilizer_mount_${snakecase(stabilizerMount.code)}`),
                    value: stabilizerMount.code,
                  }))}
                />
                <FormFloatingLabelInput
                  label={tEditPost('edit_post_input_stabilizer_remark_label')}
                  inputId={`remark-${index}`}
                  inputType="text"
                  maxLength={300}
                  inputRegisterReturn={register(`stabilizers.${index}.remark`)}
                  currentInputValue={watch().stabilizers?.[index].remark}
                  errorMessage={
                    errors.stabilizers?.[index]?.remark?.message && tEditPost(errors.stabilizers?.[index].remark.message)
                  }
                />
                <button
                  type="button"
                  className={cx('deleteStabilizerBtn')}
                  onClick={() => handleClickDeleteStabilizer(index, watch().stabilizers?.[index].stabilizerName)}
                >
                  <FcFullTrash className={cx('deleteIcon')} />
                  {tEditPost('edit_post_input_stabilizer_remove_btn')}
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" className={cx('addStabilizerBtn')} onClick={handleClickAddStabilizer}>
          <IoMdAdd className={cx('addIcon')} />
          {tEditPost('edit_post_input_stabilizer_add_btn')}
        </button>
      </StepCard>
      <PrevOrNextStep isFormValid={isValid} onNextStep={handleSubmitAndNextStep(onSubmit)} isNextStepLoading={isPending} />
    </form>
  );
}
