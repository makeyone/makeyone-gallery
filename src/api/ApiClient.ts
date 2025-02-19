import { getServerAuthTokenCookies } from '@/api/ApiClient.util';
import { ApiResponse } from '@/api/support/response/ApiResponse';

import { API_SERVER_URL } from '@/constants/environment';

interface ApiClientProps {
  urlPath: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  data?: any;
}

export default async function apiClient<SuccessData = null, ErrorData = null>(
  props: ApiClientProps,
): Promise<ApiResponse<SuccessData, ErrorData>> {
  const baseApiUrl = API_SERVER_URL;
  const url = `${baseApiUrl}${props.urlPath}`;

  const headers: HeadersInit = {};

  if (typeof window === 'undefined') {
    const authTokenCookies = await getServerAuthTokenCookies();
    if (authTokenCookies) {
      headers['Cookie'] = authTokenCookies;
    }
  }

  const isFormData = props.data instanceof FormData;
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const options: RequestInit = {
    method: props.method,
    headers,
    credentials: 'include',
    ...(props.data && { body: isFormData ? props.data : JSON.stringify(props.data) }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData: ApiResponse<SuccessData, ErrorData> = await response.json();
      throw ApiResponse.result(errorData);
    }

    const successData: ApiResponse<SuccessData, ErrorData> = await response.json();
    return ApiResponse.result(successData);
  } catch (error: any) {
    console.error('🔴 Fetch API Error:', error);
    throw error;
  }
}
