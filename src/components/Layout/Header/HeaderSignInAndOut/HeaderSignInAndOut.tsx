'use client';

import { toast } from 'react-toastify';

import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

import { AuthMutation } from '@/api/auth/Auth.mutation';
import { GetMeViewModel } from '@/api/user/view-model/GetMeViewModel';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';

import styles from './HeaderSignInAndOut.module.css';

const cx = bindClassNames(styles);

type Props = {
  refetchMe: () => Promise<QueryObserverResult<GetMeViewModel | null, Error>>;
  meData?: GetMeViewModel | null;
};

export default function HeaderSignInAndOut({ meData, refetchMe }: Props) {
  const t = useClientI18n('global');
  const { replace } = useRouter();

  const { mutate: signOutMutate } = useMutation({
    mutationFn: () => AuthMutation.signOut(),
    onSuccess: async () => {
      const signOutRes = await signOut({ redirect: false });
      if (signOutRes) {
        await refetchMe();
        toast.success(t('logout_success'));
        replace('/');
      }
    },
  });
  const handleSignOutBtnClick = () => {
    signOutMutate();
  };

  return (
    <div className={cx('root')}>
      {meData ? (
        <button type="button" onClick={handleSignOutBtnClick} className={cx('signInAndSignOut')}>
          {t('header_sign_out_btn')}
        </button>
      ) : (
        <Link href="/users/login" className={cx('signInAndSignOut')}>
          {t('header_sign_in_link')}
        </Link>
      )}
    </div>
  );
}
