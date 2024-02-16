import { AxiosError } from 'axios';

import { CoreOutput } from '@/apis/common/dtos/output.dto';

export default function getAxiosErrorMessage<TOutput = unknown, TError = unknown>(err: any) {
  const axiosError: AxiosError<CoreOutput<TOutput>> = err;
  const message = axiosError.response?.data.error?.message as unknown as keyof TError;
  return message;
}
