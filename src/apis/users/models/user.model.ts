import { UserRoleUnion } from '@/apis/users/enums/UserRole.enum';
import { UserSocialProviderUnion } from '@/apis/users/enums/UserSocialProvider.enum';

export class UserModel {
  id!: boolean;

  email!: string;

  nickname!: string;

  profileImg!: string | null;

  socialProvider!: UserSocialProviderUnion;

  role!: UserRoleUnion;
}
