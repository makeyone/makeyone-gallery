import { UserRoleUnion } from '@/constants/enum/UserRole.enum';
import { UserSocialProviderUnion } from '@/constants/enum/UserSocialProvider.enum';

export class EditUserRes {
  readonly id!: number;
  readonly email!: string;
  readonly nickname!: string;
  readonly profileImg!: string;
  readonly socialProvider!: UserSocialProviderUnion;
  readonly role!: UserRoleUnion;
}
