'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { UserMutation } from '@/api/user/User.mutation';
import { UserQuery, userQueryKey } from '@/api/user/User.query';

import { UserSocialProvider } from '@/constants/enum/UserSocialProvider.enum';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './EditProfileFormWithoutImage.module.css';

const cx = bindClassNames(styles);

class EditProfileFormInput {
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  @IsString()
  @MaxLength(20, { message: '닉네임은 20자 이하로 입력이 가능합니다.' })
  nickname!: string;

  socialProvider!: string;

  email!: string;
}

type Props = {};

export default function EditProfileFormWithoutImage({}: Props) {
  const { data: meData, refetch: refetchMe } = useSuspenseQuery({
    queryKey: userQueryKey.getMe(),
    queryFn: () => UserQuery.getMe(),
    select: (selectData) => selectData.data,
  });
  const { id: userId, socialProvider, email, nickname } = meData!;

  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<EditProfileFormInput>({
    mode: 'all',
    resolver: classValidatorResolver(EditProfileFormInput),
    defaultValues: {
      nickname,
      socialProvider: UserSocialProvider[socialProvider].name,
      email,
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: UserMutation.editUser,
    onSuccess: () => {
      toast.success('내 프로필 변경이 완료되었습니다.');
      refetchMe();
    },
  });

  const onSubmit = handleSubmit((formData) => {
    if (isPending === true) {
      return;
    }

    const { nickname } = formData;
    mutate({ userId, nickname });
  });

  return (
    <form className={cx('form')} onSubmit={onSubmit}>
      <div className={cx('inputBlock')}>
        <FormFloatingLabelInput
          readOnly
          label="이메일 (변경 불가)"
          inputId="email"
          inputType="email"
          inputRegisterReturn={register('email')}
          currentInputValue={watch().email}
          errorMessage={errors.email?.message}
        />
        <FormFloatingLabelInput
          readOnly
          label="소셜 (변경 불가)"
          inputId="socialProvider"
          inputType="text"
          inputRegisterReturn={register('socialProvider')}
          currentInputValue={watch().socialProvider}
          errorMessage={errors.socialProvider?.message}
        />
        <FormFloatingLabelInput
          label="닉네임"
          inputId="nickname"
          inputType="text"
          maxLength={20}
          inputRegisterReturn={register('nickname')}
          currentInputValue={watch().nickname}
          errorMessage={errors.nickname?.message}
        />
      </div>
      <button type="submit" className={cx('formSubmitBtn')} disabled={isValid === false}>
        프로필 변경하기
      </button>
    </form>
  );
}
