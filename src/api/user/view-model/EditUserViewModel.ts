import { GetMeRes } from '@/api/user/response/GetMeRes';

import { UserRoleUnion } from '@/constants/enum/UserRole.enum';
import { UserSocialProviderUnion } from '@/constants/enum/UserSocialProvider.enum';

export class EditUserViewModel {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly nickname: string,
    readonly profileImg: string,
    readonly socialProvider: UserSocialProviderUnion,
    readonly role: UserRoleUnion,
  ) {}

  static of(editUserResponse: GetMeRes): EditUserViewModel {
    return new EditUserViewModel(
      editUserResponse.id,
      editUserResponse.email,
      editUserResponse.nickname,
      editUserResponse.profileImg,
      editUserResponse.socialProvider,
      editUserResponse.role,
    );
  }
}
