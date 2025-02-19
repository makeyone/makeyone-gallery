import { UserRoleUnion } from '@/constants/enum/UserRole.enum';
import { UserSocialProviderUnion } from '@/constants/enum/UserSocialProvider.enum';

export class SignInRes {
  readonly loggedInUser!: {
    readonly id: number;
    readonly email: string;
    readonly nickname: string;
    readonly profileImg: string | null;
    readonly socialProvider: UserSocialProviderUnion;
    readonly role: UserRoleUnion;
  };
  readonly accessToken!: string;
  readonly refreshToken!: string;
}

export class SignInErrorData {
  readonly registeredEmail!: string;
  readonly registeredSocialProvider!: string;
}
