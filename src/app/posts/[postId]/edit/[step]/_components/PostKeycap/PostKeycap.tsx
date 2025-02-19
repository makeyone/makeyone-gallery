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

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import { bindClassNames } from '@/libs/BindClassName.ts';
import { sweetConfirm } from '@/libs/CustomAlert';

import styles from './PostKeycap.module.css';

const cx = bindClassNames(styles);

// NOTE: react-hook-form의 useFieldArray append메서드의 초기화 문제 때문에 모든 필드에 optional chaining을 걸어둠. (실제 type check는 class validator 참고)
class EditPostKeycap {
  @IsOptional()
  @IsNumber()
  keycapId?: number;

  @IsNotEmpty({ message: '키캡 이름을 입력해주세요.' })
  @IsString()
  @MaxLength(200, { message: '키캡 이름은 200자 이하로 입력이 가능합니다.' })
  keycapName?: string;

  @IsEnum(keyboardKeycapProfileKeys)
  keycapProfile?: KeyboardKeycapProfileUnion;

  @IsEnum(keyboardKeycapTextureKeys)
  keycapTexture?: KeyboardKeycapTextureUnion;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: '키캡 제조사는 100자 이하로 입력이 가능합니다.' })
  manufacturer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '특이사항은 300자 이하로 입력이 가능합니다.' })
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
      return toast.error('키캡 정보는 1개 이상 등록해야합니다.');
    }

    if (keycapName && keycapName.replaceAll(' ', '') === '') {
      return remove(index);
    }

    const confirm = await sweetConfirm.fire({ icon: 'warning', titleText: `'${keycapName}' 키캡을 제거하시겠습니까?` });
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
      <StepCard cardTitle="키캡 정보를 등록해주세요." cardDescription="이 키보드에 장착된 모든 키캡에 대한 정보를 입력해주세요!">
        <ul className={cx('keycapList')}>
          {fields.map((field, index) => {
            return (
              <li key={field.id} className={cx('keycapItem')}>
                <FormFloatingLabelInput
                  label="키캡 이름"
                  inputId={`keycapName-${index}`}
                  inputType="text"
                  maxLength={200}
                  inputRegisterReturn={register(`keycaps.${index}.keycapName`)}
                  currentInputValue={watch().keycaps?.[index].keycapName}
                  errorMessage={errors.keycaps?.[index]?.keycapName?.message}
                />
                <FormRadioGroupWithLabel
                  label="키캡 프로파일"
                  register={register(`keycaps.${index}.keycapProfile`)}
                  required
                  align="Row"
                  name={`keycapProfile-${index}`}
                  items={keyboardKeycapProfileValues.map((keycapProfile) => ({
                    id: `keycapProfile_${keycapProfile.code}_${index}`,
                    label: keycapProfile.name,
                    value: keycapProfile.code,
                  }))}
                />
                <FormRadioGroupWithLabel
                  label="키캡 재질"
                  register={register(`keycaps.${index}.keycapTexture`)}
                  required
                  align="Row"
                  name={`keycapTexture-${index}`}
                  items={keyboardKeycapTextureValues.map((keycapTexture) => ({
                    id: `keycapTexture_${keycapTexture.code}_${index}`,
                    label: keycapTexture.name,
                    value: keycapTexture.code,
                  }))}
                />
                <FormFloatingLabelInput
                  label="[선택입력] 키캡 제조사"
                  inputId={`manufacturer-${index}`}
                  inputType="text"
                  maxLength={100}
                  inputRegisterReturn={register(`keycaps.${index}.manufacturer`)}
                  currentInputValue={watch().keycaps?.[index].manufacturer}
                  errorMessage={errors.keycaps?.[index]?.manufacturer?.message}
                />
                <FormFloatingLabelInput
                  label="[선택입력] 특이사항"
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
                  키캡 삭제하기
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" className={cx('addKeycapBtn')} onClick={handleClickAddKeycap}>
          <IoMdAdd className={cx('addIcon')} />
          장착된 키캡 추가하기
        </button>
      </StepCard>
      <PrevOrNextStep isFormValid={isValid} onNextStep={handleSubmitAndNextStep(onSubmit)} isNextStepLoading={isPending} />
    </form>
  );
}
