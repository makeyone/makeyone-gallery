'use client';

import { AxiosError } from 'axios';

import { CoreOutput } from '@/apis/common/dtos/output.dto';

import { sweetAlert } from '@/libs/sweet-alert2';

export default async function mutateCustomErrorAlert<T = any>(error: AxiosError<T, any>) {
  const message = (error.response?.data as CoreOutput).error?.message;
  await sweetAlert.fire({
    icon: 'error',
    titleText: message || '서버에러가 발생하였습니다.\n잠시 후 다시 시도해주세요.',
    confirmButtonText: '확인',
  });
}
