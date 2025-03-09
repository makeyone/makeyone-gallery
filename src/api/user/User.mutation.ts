import apiClient from '@/api/ApiClient';
import { ViewModelMapper } from '@/api/support/view-model/ViewModelMapper';
import { EditUserReq } from '@/api/user/request/EditUserReq';
import { EditUserRes } from '@/api/user/response/EditUserRes';
import { EditUserViewModel } from '@/api/user/view-model/EditUserViewModel';

export class UserMutation {
  static async editUser({ userId, nickname, profileImgUrl }: EditUserReq): Promise<ViewModelMapper<EditUserViewModel>> {
    const apiResponse = await apiClient<EditUserRes>({
      urlPath: `/v1/users/${userId}`,
      method: 'PATCH',
      data: {
        nickname,
        profileImgUrl,
      },
    });

    return ViewModelMapper.of(apiResponse, EditUserViewModel);
  }
}
