import { LoginInput, LoginOutput } from '@/apis/users/dtos/Login.dto';

import apiClient from '@/libs/api-client';

export const login = async (input: LoginInput): Promise<LoginOutput> => {
  const res = await apiClient({
    urlPath: `/v1/auth/login`,
    method: 'POST',
    data: input,
  });

  return res?.data;
};
