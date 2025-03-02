'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { UserQuery, userQueryKey } from '@/api/user/User.query';

import BasicModel from '@/components/Modal/BasicModal';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './EditProfile.module.css';

const cx = bindClassNames(styles);

type Props = { onClose: () => void };

export default function EditProfile({ onClose }: Props) {
  const { data: meData } = useSuspenseQuery({
    queryKey: userQueryKey.getMe(),
    queryFn: () => UserQuery.getMe(),
    select: (selectData) => selectData.data,
  });
  const { profileImg, nickname, email, socialProvider } = meData!;

  return (
    <BasicModel isShowModal handleAfterModalClose={onClose} title="프로필 수정">
      <div className={cx('block')}>Edit Profile</div>
    </BasicModel>
  );
}
