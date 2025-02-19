import { RefreshTokenRes } from '@/api/auth/response/RefreshTokenRes';

export class RefreshTokenViewModel {
  constructor(readonly accessToken: string) {}

  static of(refreshTokenResponse: RefreshTokenRes): RefreshTokenViewModel {
    return new RefreshTokenViewModel(refreshTokenResponse.accessToken);
  }
}
