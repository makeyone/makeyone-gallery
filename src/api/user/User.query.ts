import apiClient from '@/api/ApiClient';
import { ViewModelMapper } from '@/api/support/view-model/ViewModelMapper';
import { GetMeRes } from '@/api/user/response/GetMeRes';
import { GetMeViewModel } from '@/api/user/view-model/GetMeViewModel';

export const userQueryKey = {
  getMe: () => ['getMe'] as const,
};

export class UserQuery {
  static async getMe(): Promise<ViewModelMapper<GetMeViewModel | null>> {
    const apiResponse = await apiClient<GetMeRes>({
      urlPath: `/v1/users/me`,
      method: 'GET',
    });

    return apiResponse.data === null ? ViewModelMapper.of(apiResponse) : ViewModelMapper.of(apiResponse, GetMeViewModel);
  }

  static async getUserList() {}
}
