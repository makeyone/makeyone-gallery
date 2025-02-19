import { ApiResponse } from '@/api/support/response/ApiResponse';

export class ViewModelMapper<ViewModelData> {
  constructor(readonly result: 'SUCCESS' | 'ERROR', readonly data: ViewModelData, readonly error: null) {}

  static of<ApiResponseData, ViewModel>(
    response: ApiResponse<ApiResponseData, null>,
    ViewModelClass: { of: (data: ApiResponseData) => ViewModel },
  ): ViewModelMapper<ViewModel>;

  static of<ApiResponseData>(response: ApiResponse<ApiResponseData, null>, ViewModelClass?: undefined): ViewModelMapper<null>;

  static of<ApiResponseData, ViewModel>(
    response: ApiResponse<ApiResponseData, null>,
    ViewModelClass?: { of: (data: ApiResponseData) => ViewModel },
  ): ViewModelMapper<ViewModel | null> {
    const { result, data } = response;
    const dataMapper = data && ViewModelClass ? ViewModelClass.of(data) : null;

    const viewModelResponse = new ViewModelMapper(result, dataMapper, null);

    // NOTE: 직렬화를 해줘야 server component에서 prefetch 가능
    const serializableViewModel = JSON.parse(JSON.stringify(viewModelResponse));

    return serializableViewModel;
  }
}
