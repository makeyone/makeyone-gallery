import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { UserSocialProviderUnion } from '@/apis/users/enums/UserSocialProvider.enum';
import { UserModel } from '@/apis/users/models/User.model';

export class LoginInput {
  socialProvider!: UserSocialProviderUnion;

  email!: string;

  accessToken!: string;
}

export class LoginErrorDataOutput {
  registeredEmail?: string;
  registeredSocialProvider?: UserSocialProviderUnion;
}

type LoginResData = {
  loggedInUser: Pick<UserModel, 'id' | 'socialProvider' | 'email' | 'nickname' | 'profileImg' | 'role'>;
  accessToken: string;
  refreshToken: string;
};

export class LoginOutput extends CoreOutput<LoginResData, LoginErrorDataOutput> {}
