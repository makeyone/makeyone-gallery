import { RefreshJwtTokenOutput } from '@/apis/users/dtos/RefreshJwtToken.dto';

import apiClient from '@/libs/api-client';

export const refreshJwtToken = async (): Promise<RefreshJwtTokenOutput> => {
  const res = await apiClient({
    urlPath: `/v1/auth/refresh-token`,
    method: 'POST',
  });

  return res;
};
