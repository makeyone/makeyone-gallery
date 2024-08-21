import { GetMeOutput } from '@/apis/users/dtos/GetMe.dto';

import apiClient from '@/libs/api-client';

export const getMe = async (): Promise<GetMeOutput> => {
  const res = await apiClient({
    urlPath: `/v1/users/me`,
    method: 'GET',
  });

  return res;
};
