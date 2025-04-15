'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { UserMutation } from '@/api/user/User.mutation';
import { UserQuery, userQueryKey } from '@/api/user/User.query';

import FormFloatingLabelInput from '@/components/Form/FormFloatingLabelInput';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './EditProfileFormWithoutImage.module.css';

const cx = bindClassNames(styles);

class EditProfileFormInput {
  @IsNotEmpty({ message: 'edit_profile_input_nickname_is_required' })
  @IsString()
  @MaxLength(20, { message: 'edit_profile_input_nickname_max_length_is_20' })
  nickname!: string;

  socialProvider!: string;

  email!: string;
}

type Props = {};

export default function EditProfileFormWithoutImage({}: Props) {
  const t = useClientI18n('mypage');

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
      socialProvider: socialProvider,
      email,
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: UserMutation.editUser,
    onSuccess: () => {
      toast.success(t('edit_profile_success'));
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
          label={t('edit_profile_input_email_label')}
          inputId="email"
          inputType="email"
          inputRegisterReturn={register('email')}
          currentInputValue={watch().email}
          errorMessage={errors.email?.message}
        />
        <FormFloatingLabelInput
          readOnly
          label={t('edit_profile_input_social_label')}
          inputId="socialProvider"
          inputType="text"
          inputRegisterReturn={register('socialProvider')}
          currentInputValue={watch().socialProvider}
          errorMessage={errors.socialProvider?.message}
        />
        <FormFloatingLabelInput
          label={t('edit_profile_input_nickname_label')}
          inputId="nickname"
          inputType="text"
          maxLength={20}
          inputRegisterReturn={register('nickname')}
          currentInputValue={watch().nickname}
          errorMessage={errors.nickname?.message && t(errors.nickname.message)}
        />
      </div>
      <button type="submit" className={cx('formSubmitBtn')} disabled={isValid === false}>
        {t('edit_profile_submit_btn')}
      </button>
    </form>
  );
}
