// NextJS 13+ 버전의 서버컴포넌트와 클라이언트 컴포넌트 별 쿠키를 가져오는 방법이 달라 window 객체로 판단하여 서버컴포넌트일 경우 headers.cookie에 accessToken을 넣어서 전달한다.

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { refreshJwtToken } from '@/apis/users/actions/RefreshJwtToken';

import { getClientCookie, removeClientCookie, setClientCookie } from '@/cookies/client-cookies';
import { getServerCookie } from '@/cookies/server-cookies';

interface ApiClientProps {
  urlPath: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  data?: any;
}

interface JwtTokenErrorOutput {
  ok?: false;
  error?: {
    statusType: 'UNAUTHORIZED';
    statusCode: 401;
    message: 'EXPIRED_JWT_ACCESS_TOKEN' | 'INVALID_JWT_ACCESS_TOKEN' | 'EXPIRED_JWT_REFRESH_TOKEN' | 'INVALID_JWT_REFRESH_TOKEN';
  };
}

export const baseApiClient = axios.create();
baseApiClient.interceptors.request.use(async (request) => {
  let accessToken = '';

  if (typeof window === 'undefined') {
    accessToken = ((await getServerCookie('accessToken')) as string) || '';

    if (accessToken !== '') {
      request.headers.cookie = `accessToken=${accessToken};`;
    }
  }

  return request;
});

baseApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<JwtTokenErrorOutput>) => {
    const { config, response } = error;

    if (response?.data?.error?.message === 'EXPIRED_JWT_REFRESH_TOKEN') {
      if (typeof window !== 'undefined') {
        removeClientCookie('accessToken');
        removeClientCookie('refreshToken');
      }
    }

    if (response?.data?.error?.message === 'EXPIRED_JWT_ACCESS_TOKEN') {
      const originRequest = config;

      const refreshToken =
        typeof window !== 'undefined' ? getClientCookie('refreshToken') : await getServerCookie('refreshToken');
      const refreshJwtTokenRes = await refreshJwtToken({ refreshToken });
      const newAccessToken = refreshJwtTokenRes?.accessToken;

      if (!newAccessToken && typeof window !== 'undefined') {
        removeClientCookie('accessToken');
        removeClientCookie('refreshToken');
      }

      if (newAccessToken && typeof window !== 'undefined') {
        setClientCookie('accessToken', newAccessToken);
      }

      if (typeof window === 'undefined' && originRequest) {
        originRequest.headers.cookie = `accessToken=${newAccessToken || ''};`;
      }

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
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}
