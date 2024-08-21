import { LogoutOutput } from '@/apis/users/dtos/Logout.dto';

import apiClient from '@/libs/api-client';

export const logout = async (): Promise<LogoutOutput> => {
  const res = await apiClient({
    urlPath: `/v1/auth/sign-out`,
    method: 'POST',
  });

  return res;
};
