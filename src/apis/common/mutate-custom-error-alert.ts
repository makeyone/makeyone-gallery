'use client';

import { sweetAlert } from '@/libs/sweet-alert2';

type Props = {
  errorOutput: any;
  errorMessage?: string;
  reset?: () => void;
};

export default async function mutateCustomErrorAlert({ errorOutput, errorMessage, reset }: Props) {
  if (reset) {
    reset();
  }

  await sweetAlert.fire({
    icon: 'error',
    titleText:
      errorMessage && errorMessage !== 'SERVER_ERROR'
        ? errorOutput[errorMessage]
        : '서버에러가 발생하였습니다.\n잠시 후 다시 시도해주세요.',
    confirmButtonText: '확인',
  });
}
