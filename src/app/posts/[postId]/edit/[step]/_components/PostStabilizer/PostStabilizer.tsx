'use client';

import 'reflect-metadata';

import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useParams, useRouter } from 'next/navigation';

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

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import { bindClassNames } from '@/libs/BindClassName.ts';
import { sweetConfirm } from '@/libs/CustomAlert';

import styles from './PostStabilizer.module.css';

const cx = bindClassNames(styles);

// NOTE: react-hook-form의 useFieldArray append메서드의 초기화 문제 때문에 모든 필드에 optional chaining을 걸어둠. (실제 type check는 class validator 참고)
class EditPostStabilizer {
  @IsOptional()
  @IsNumber()
  stabilizerId?: number;

  @IsNotEmpty({ message: '스테빌라이저 이름을 입력해주세요.' })
  @IsString()
  @MaxLength(100, { message: '스테빌라이저 이름은 100자 이하로 입력이 가능합니다.' })
  stabilizerName?: string;

  @IsEnum(keyboardStabilizerTypeKeys)
  stabilizerType?: KeyboardStabilizerTypeUnion;

  @IsEnum(keyboardStabilizerMountKeys)
  stabilizerMount?: KeyboardStabilizerMountUnion;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '특이사항은 300자 이하로 입력이 가능합니다.' })
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
      return toast.error('스테빌라이저 정보는 1개 이상 등록해야합니다.');
    }

    if (stabilizerName && stabilizerName.replaceAll(' ', '') === '') {
      return remove(index);
    }

    const confirm = await sweetConfirm.fire({
      icon: 'warning',
      titleText: `'${stabilizerName}' 스테빌라이저를 제거하시겠습니까?`,
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
        cardTitle="스테빌라이저 정보를 등록해주세요."
        cardDescription="이 키보드에 장착된 모든 스테빌라이저에 대한 정보를 입력해주세요!"
      >
        <ul className={cx('stabilizerList')}>
          {fields.map((field, index) => {
            return (
              <li key={field.id} className={cx('stabilizerItem')}>
                <FormFloatingLabelInput
                  label="스테빌라이저 이름"
                  inputId={`stabilizerName-${index}`}
                  inputType="text"
                  maxLength={100}
                  inputRegisterReturn={register(`stabilizers.${index}.stabilizerName`)}
                  currentInputValue={watch().stabilizers?.[index].stabilizerName}
                  errorMessage={errors.stabilizers?.[index]?.stabilizerName?.message}
                />
                <FormRadioGroupWithLabel
                  label="스테빌라이저 롱폴 여부"
                  register={register(`stabilizers.${index}.stabilizerType`)}
                  required
                  align="Row"
                  name={`stabilizerType-${index}`}
                  items={keyboardStabilizerTypeValues.map((stabilizerType) => ({
                    id: `stabilizerType_${stabilizerType.code}_${index}`,
                    label: stabilizerType.name,
                    value: stabilizerType.code,
                  }))}
                />
                <FormRadioGroupWithLabel
                  label="스테빌라이저 체결방식"
                  register={register(`stabilizers.${index}.stabilizerMount`)}
                  required
                  align="Row"
                  name={`stabilizerMount-${index}`}
                  items={keyboardStabilizerMountValues.map((stabilizerMount) => ({
                    id: `stabilizerMount_${stabilizerMount.code}_${index}`,
                    label: stabilizerMount.name,
                    value: stabilizerMount.code,
                  }))}
                />
                <FormFloatingLabelInput
                  label="[선택입력] 특이사항"
                  inputId={`remark-${index}`}
                  inputType="text"
                  maxLength={300}
                  inputRegisterReturn={register(`stabilizers.${index}.remark`)}
                  currentInputValue={watch().stabilizers?.[index].remark}
                  errorMessage={errors.stabilizers?.[index]?.remark?.message}
                />
                <button
                  type="button"
                  className={cx('deleteStabilizerBtn')}
                  onClick={() => handleClickDeleteStabilizer(index, watch().stabilizers?.[index].stabilizerName)}
                >
                  <FcFullTrash className={cx('deleteIcon')} />
                  스테빌라이저 삭제하기
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" className={cx('addStabilizerBtn')} onClick={handleClickAddStabilizer}>
          <IoMdAdd className={cx('addIcon')} />
          장착된 스테빌라이저 추가하기
        </button>
      </StepCard>
      <PrevOrNextStep isFormValid={isValid} onNextStep={handleSubmitAndNextStep(onSubmit)} isNextStepLoading={isPending} />
    </form>
  );
}
