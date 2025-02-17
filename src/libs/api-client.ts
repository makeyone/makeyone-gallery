// NextJS 13+ 버전의 서버컴포넌트와 클라이언트 컴포넌트 별 쿠키를 가져오는 방법이 달라 window 객체로 판단하여 서버컴포넌트일 경우 headers.cookie에 accessToken을 넣어서 전달한다.

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { refreshJwtToken } from '@/apis/users/actions/RefreshJwtToken';

import { getServerCookie } from '@/cookies/server-cookies';

interface ApiClientProps {
  urlPath: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  data?: any;
}

export const baseApiClient = axios.create();
baseApiClient.interceptors.request.use(async (request) => {
  // 서버 쿠키 셋업
  if (typeof window === 'undefined') {
    const accessToken = ((await getServerCookie('MAKEYONE__A_JWT')) as string) || '';
    const refreshToken = ((await getServerCookie('MAKEYONE__R_JWT')) as string) || '';

    const cookies = [];
    if (accessToken !== '') {
      cookies.push(`MAKEYONE__A_JWT=${accessToken}`);
    }
    if (refreshToken !== '') {
      cookies.push(`MAKEYONE__R_JWT=${refreshToken}`);
    }

    if (cookies.length > 0) {
      request.headers.cookie = cookies.join('; ');
    }
  }

  return request;
});

baseApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<CoreOutput>) => {
    const { config, response } = error;

    const errorCode = response?.data?.error?.code;

    // AccessToken 만료시 RefreshToken 재 발급
    if (errorCode === 'EXPIRED_JWT_ACCESS_TOKEN') {
      const originRequest = config;
      await refreshJwtToken();

      return axios(originRequest as InternalAxiosRequestConfig<any>);
    }

    return Promise.reject(error);
  },
);

export default async function apiClient(props: ApiClientProps): Promise<any> {
  const onSuccess = (response: any) => response;
  const onError = (error: any) => Promise.reject(error);

  const baseUrl = process.env.API_SERVER_URL;
  const options = {
    url: `${baseUrl}${props.urlPath}`,
    method: props.method,
    ...(props.data && { data: props.data }),
    withCredentials: true,
  };

  try {
    const response = await baseApiClient(options);
    const { data: resData } = response;

    return onSuccess(resData);
  } catch (error) {
    return onError(error);
  }
}
