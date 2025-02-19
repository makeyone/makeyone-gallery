import { GetMeRes } from '@/api/user/response/GetMeRes';

import { UserRoleUnion } from '@/constants/enum/UserRole.enum';
import { UserSocialProviderUnion } from '@/constants/enum/UserSocialProvider.enum';

export class GetMeViewModel {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly nickname: string,
    readonly profileImg: string | null,
    readonly socialProvider: UserSocialProviderUnion,
    readonly role: UserRoleUnion,
  ) {}

  static of(getMeResponse: GetMeRes): GetMeViewModel {
    return new GetMeViewModel(
      getMeResponse.id,
      getMeResponse.email,
      getMeResponse.nickname,
      getMeResponse.profileImg,
      getMeResponse.socialProvider,
      getMeResponse.role,
    );
  }
}
