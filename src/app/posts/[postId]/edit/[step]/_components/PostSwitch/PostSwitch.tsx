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
import { EditPostSwitchReq } from '@/api/post/request/EditPostSwitchReq';

import {
  keyboardSwitchLubeKeys,
  KeyboardSwitchLubeUnion,
  keyboardSwitchLubeValues,
} from '@/constants/enum/KeyboardSwitchLube.enum';
import {
  keyboardSwitchSlientKeys,
  KeyboardSwitchSlientUnion,
  keyboardSwitchSlientValues,
} from '@/constants/enum/KeyboardSwitchSlient.enum';
import {
  keyboardSwitchTypeKeys,
  KeyboardSwitchTypeUnion,
  keyboardSwitchTypeValues,
} from '@/constants/enum/KeyboardSwitchType.enum';

import PrevOrNextStep from '@/app/posts/[postId]/edit/[step]/_components/PrevOrNextStep';
import StepCard from '@/app/posts/[postId]/edit/[step]/_components/StepCard';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';
import FormFloatingLabelInputNumber from '@/components/Form/FormFloatingLabelInputNumber';
import FormRadioGroupWithLabel from '@/components/Form/FormRadioGroupWithLabel';

import { bindClassNames } from '@/libs/BindClassName.ts';
import { sweetConfirm } from '@/libs/CustomAlert';

import styles from './PostSwitch.module.css';

const cx = bindClassNames(styles);

// NOTE: react-hook-form의 useFieldArray append메서드의 초기화 문제 때문에 모든 필드에 optional chaining을 걸어둠. (실제 type check는 class validator 참고)
class EditPostSwitch {
  @IsOptional()
  @IsNumber()
  switchId?: number;

  @IsNotEmpty({ message: '스위치 이름을 입력해주세요.' })
  @IsString()
  @MaxLength(100, { message: '스위치 이름은 100자 이하로 입력이 가능합니다.' })
  switchName?: string;

  @IsEnum(keyboardSwitchTypeKeys)
  switchType?: KeyboardSwitchTypeUnion;

  @IsEnum(keyboardSwitchSlientKeys)
  isSlientSwitch?: KeyboardSwitchSlientUnion;

  @IsEnum(keyboardSwitchLubeKeys)
  switchLube?: KeyboardSwitchLubeUnion;

  @IsOptional()
  @IsNumber({ allowNaN: true }, { message: '숫자 또는 소수점만 입력이 가능합니다.' })
  bottomOutForce?: number;

  @IsOptional()
  @IsNumber({ allowNaN: true }, { message: '숫자 또는 소수점만 입력이 가능합니다.' })
  springLength?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: '스위치 필름은 50자 이하로 입력이 가능합니다.' })
  switchFilm?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: '특이사항은 300자 이하로 입력이 가능합니다.' })
  remark?: string;
}

class EditPostSwitchFormInput {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => EditPostSwitch)
  switches!: EditPostSwitch[];
}

type Props = {};

export default function PostSwitch({}: Props) {
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
  } = useForm<EditPostSwitchFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditPostSwitchFormInput),
    defaultValues: {
      switches:
        postData?.postSwitches.length === 0
          ? [{}]
          : postData?.postSwitches.map((keyboardSwitch) => ({
              switchId: keyboardSwitch.id,
              switchName: keyboardSwitch.switchName,
              switchType: keyboardSwitch.switchType,
              isSlientSwitch: keyboardSwitch.isSlientSwitch ? 'Y' : 'N',
              switchLube: keyboardSwitch.switchLube,
              bottomOutForce: keyboardSwitch.bottomOutForce || undefined,
              springLength: keyboardSwitch.springLength || undefined,
              switchFilm: keyboardSwitch.switchFilm || undefined,
              remark: keyboardSwitch.remark || undefined,
            })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'switches',
    control,
  });
  const handleClickAddSwitch = () => append({});
  const handleClickDeleteSwitch = async (index: number, switchName?: string) => {
    if (fields.length === 1) {
      return toast.error('스위치 정보는 1개 이상 등록해야합니다.');
    }

    if (switchName?.replaceAll(' ', '') === '') {
      return remove(index);
    }

    const confirm = await sweetConfirm.fire({ icon: 'warning', titleText: `'${switchName}' 스위치를 제거하시겠습니까?` });
    if (confirm.isConfirmed) {
      remove(index);
    }
  };

  const { isPending, mutate } = useMutation({
    mutationFn: PostMutation.editPostSwitch,
    onSuccess: async () => {
      const refetched = await refetch();
      if (refetched.status === 'success') {
        push(`/posts/${postId}/edit/keycap`);
      }
    },
  });

  const onSubmit = () => {
    const { switches } = getValues();
    const editPostSwitchesInput: EditPostSwitchReq['switches'] = switches.map((keyboardSwitch) => ({
      ...(keyboardSwitch.switchId && { switchId: keyboardSwitch.switchId }),
      switchName: keyboardSwitch.switchName as string,
      switchType: keyboardSwitch.switchType as KeyboardSwitchTypeUnion,
      isSlientSwitch: keyboardSwitch.isSlientSwitch === 'Y',
      switchLube: keyboardSwitch.switchLube as KeyboardSwitchLubeUnion,
      ...(keyboardSwitch.bottomOutForce && { bottomOutForce: keyboardSwitch.bottomOutForce }),
      ...(keyboardSwitch.springLength && { springLength: keyboardSwitch.springLength }),
      ...(keyboardSwitch.switchFilm && { switchFilm: keyboardSwitch.switchFilm }),
      ...(keyboardSwitch.remark && { remark: keyboardSwitch.remark }),
    }));
    mutate({ postId, switches: editPostSwitchesInput });
  };

  return (
    <form className={cx('root')}>
      <StepCard
        cardTitle="스위치 정보를 등록해주세요."
        cardDescription="이 키보드에 장착된 모든 스위치에 대한 정보를 입력해주세요!"
      >
        <ul className={cx('switchList')}>
          {fields.map((field, index) => {
            return (
              <li key={field.id} className={cx('switchItem')}>
                <FormFloatingLabelInput
                  label="스위치 이름"
                  inputId={`switchName-${index}`}
                  inputType="text"
                  maxLength={50}
                  inputRegisterReturn={register(`switches.${index}.switchName`)}
                  currentInputValue={watch().switches?.[index].switchName}
                  errorMessage={errors.switches?.[index]?.switchName?.message}
                />
                <FormRadioGroupWithLabel
                  label="스위치 타입"
                  register={register(`switches.${index}.switchType`)}
                  required
                  align="Row"
                  name={`switchType-${index}`}
                  items={keyboardSwitchTypeValues.map((switchType) => ({
                    id: `switchType_${switchType.code}_${index}`,
                    label: switchType.name,
                    value: switchType.code,
                  }))}
                />
                <FormRadioGroupWithLabel
                  label="저소음 스위치 여부"
                  register={register(`switches.${index}.isSlientSwitch`)}
                  required
                  align="Row"
                  name={`isSlientSwitch-${index}`}
                  items={keyboardSwitchSlientValues.map((slient) => ({
                    id: `isSlientSwitch_${slient.code}_${index}`,
                    label: slient.name,
                    value: slient.code,
                  }))}
                />
                <FormRadioGroupWithLabel
                  label="운활 여부"
                  register={register(`switches.${index}.switchLube`)}
                  required
                  align="Row"
                  name={`switchLube-${index}`}
                  items={keyboardSwitchLubeValues.map((lube) => ({
                    id: `switchLube_${lube.code}_${index}`,
                    label: lube.name,
                    value: lube.code,
                  }))}
                />
                <FormFloatingLabelInputNumber
                  label="[선택입력] 스위치 바닥압 (단위 : g)"
                  inputId={`bottomOutForce-${index}`}
                  step="0.01"
                  inputRegisterReturn={register(`switches.${index}.bottomOutForce`, {
                    valueAsNumber: true,
                  })}
                  currentInputValue={Number(watch().switches?.[index].bottomOutForce)}
                  errorMessage={errors.switches?.[index]?.bottomOutForce?.message}
                />
                <FormFloatingLabelInputNumber
                  label="[선택입력] 스프링길이 (단위 : mm)"
                  inputId={`springLength-${index}`}
                  step="0.01"
                  inputRegisterReturn={register(`switches.${index}.springLength`, {
                    valueAsNumber: true,
                  })}
                  currentInputValue={Number(watch().switches?.[index].springLength)}
                  errorMessage={errors.switches?.[index]?.springLength?.message}
                />
                <FormFloatingLabelInput
                  label="[선택입력] 스위치 필름"
                  inputId={`switchFilm-${index}`}
                  inputType="text"
                  maxLength={50}
                  inputRegisterReturn={register(`switches.${index}.switchFilm`)}
                  currentInputValue={watch().switches?.[index].switchFilm}
                  errorMessage={errors.switches?.[index]?.switchFilm?.message}
                />
                <FormFloatingLabelInput
                  label="[선택입력] 특이사항"
                  inputId={`remark-${index}`}
                  inputType="text"
                  maxLength={300}
                  inputRegisterReturn={register(`switches.${index}.remark`)}
                  currentInputValue={watch().switches?.[index].remark}
                  errorMessage={errors.switches?.[index]?.remark?.message}
                />
                <button
                  type="button"
                  className={cx('deleteSwitchBtn')}
                  onClick={() => handleClickDeleteSwitch(index, watch().switches?.[index].switchName)}
                >
                  <FcFullTrash className={cx('deleteIcon')} />
                  스위치 삭제하기
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" className={cx('addSwitchBtn')} onClick={handleClickAddSwitch}>
          <IoMdAdd className={cx('addIcon')} />
          장착된 스위치 추가하기
        </button>
      </StepCard>
      <PrevOrNextStep isFormValid={isValid} onNextStep={handleSubmitAndNextStep(onSubmit)} isNextStepLoading={isPending} />
    </form>
  );
}
