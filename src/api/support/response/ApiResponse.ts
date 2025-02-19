import { ApiErrorResponse } from '@/api/support/response/ApiErrorResponse';

export class ApiResponse<SuccessData = null, ErrorData = null> {
  constructor(
    readonly result: 'SUCCESS' | 'ERROR',
    readonly data: SuccessData | null = null,
    readonly error: ApiErrorResponse<ErrorData> | null = null,
  ) {}

  static result<SuccessData = null, ErrorData = null>({
    result,
    data,
    error,
  }: ApiResponse<SuccessData, ErrorData>): ApiResponse<SuccessData, ErrorData> {
    return new ApiResponse(result, data, error ? new ApiErrorResponse<ErrorData>(error.code, error.message, error.data) : null);
  }
}
