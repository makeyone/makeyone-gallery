'use client';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './EditProfileFormWithoutImage.module.css';

const cx = bindClassNames(styles);

// class EditProfileFormInput {
//   @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
//   @IsString()
//   @MaxLength(20, { message: '닉네임은 20자 이하로 입력이 가능합니다.' })
//   nickname!: string;
// }

type Props = {};

export default function EditProfileFormWithoutImage({}: Props) {
  // const {
  //   register,
  //   watch,
  //   getValues,
  //   setValue,
  //   handleSubmit,
  //   formState: { isValid, errors },
  // } = useForm<EditProfileFormInput>({
  //   mode: 'all',
  //   resolver: classValidatorResolver(EditProfileFormInput),
  //   defaultValues: {
  //     nickname,
  //   },
  // });
  return (
    <form className={cx('form')}>
      <div>EditProfileFormWithoutImage</div>
    </form>
  );
}
