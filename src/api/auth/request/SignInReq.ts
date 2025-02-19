import { UserSocialProviderUnion } from '@/constants/enum/UserSocialProvider.enum';

export class SignInReq {
  readonly socialProvider!: UserSocialProviderUnion;
  readonly email!: string;
  readonly accessToken!: string;
}
