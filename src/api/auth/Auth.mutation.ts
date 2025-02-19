import apiClient from '@/api/ApiClient';
import { SignInReq } from '@/api/auth/request/SignInReq';
import { RefreshTokenRes } from '@/api/auth/response/RefreshTokenRes';
import { SignInRes } from '@/api/auth/response/SignInRes';
import { RefreshTokenViewModel } from '@/api/auth/view-model/RefreshTokenViewModel';
import { SignInViewModel } from '@/api/auth/view-model/SignInViewModel';
import { ViewModelMapper } from '@/api/support/view-model/ViewModelMapper';

export class AuthMutation {
  static async signIn(signInReq: SignInReq): Promise<ViewModelMapper<SignInViewModel>> {
    const apiResponse = await apiClient<SignInRes>({
      urlPath: `/v1/auth/sign-in`,
      method: 'POST',
      data: signInReq,
    });

    return ViewModelMapper.of(apiResponse, SignInViewModel);
  }

  static async refreshJwt(): Promise<ViewModelMapper<RefreshTokenViewModel>> {
    const apiResponse = await apiClient<RefreshTokenRes>({
      urlPath: `/v1/auth/refresh-token`,
      method: 'POST',
    });

    return ViewModelMapper.of(apiResponse, RefreshTokenViewModel);
  }

  static async signOut(): Promise<ViewModelMapper<null>> {
    const apiResponse = await apiClient<null>({
      urlPath: `/v1/auth/sign-out`,
      method: 'POST',
    });

    return ViewModelMapper.of(apiResponse);
  }
}
