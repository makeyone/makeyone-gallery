import apiClient from '@/api/ApiClient';
import { ViewModelMapper } from '@/api/support/view-model/ViewModelMapper';
import { EditUserReq } from '@/api/user/request/EditUserReq';
import { WithdrawalUserReq } from '@/api/user/request/WithdrawalUserReq';
import { EditUserRes } from '@/api/user/response/EditUserRes';
import { WithdrawalUserRes } from '@/api/user/response/WithdrawalUserRes';
import { EditUserViewModel } from '@/api/user/view-model/EditUserViewModel';
import { WithdrawalUserViewModel } from '@/api/user/view-model/WithdrawalUserViewModel';

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

  static async withdrawal({ userId }: WithdrawalUserReq): Promise<ViewModelMapper<WithdrawalUserViewModel>> {
    const apiResponse = await apiClient<WithdrawalUserRes>({
      urlPath: `/v1/users/${userId}`,
      method: 'DELETE',
    });

    return ViewModelMapper.of(apiResponse, WithdrawalUserViewModel);
  }
}
