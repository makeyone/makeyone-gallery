import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { UserSocialProviderUnion } from '@/apis/users/enums/UserSocialProvider.enum';
import { UserModel } from '@/apis/users/models/user.model';

export class LoginInput {
  socialProvider!: UserSocialProviderUnion;

  email!: string;

  accessToken!: string;
}

export const LoginError = {
  DIFFERENT_SOCIAL_PROVIDER: '이미 같은 정보로 가입한 계정이 있습니다.',
  ALREADY_REGISTERED_USER: '이미 회원가입이 되어있습니다.\n다시 로그인 해주세요.',
  GET_NAVER_USER_PROFILE_AUTN_ERROR: '네이버 로그인 인증에러가 발생하였습니다.\n다시 로그인 해주세요.',
  GET_NAVER_USER_PROFILE_SERVER_ERROR: '서버에러가 발생하였습니다.\n잠시 후 다시 시도해주세요.',
  GET_KAKAO_USER_PROFILE_AUTN_ERROR: '카카오 로그인 인증에러가 발생하였습니다.\n다시 로그인 해주세요.',
  GET_KAKAO_USER_PROFILE_SERVER_ERROR: '서버에러가 발생하였습니다.\n잠시 후 다시 시도해주세요.',
  GET_GOOGLE_USER_PROFILE_AUTN_ERROR: '구글 로그인 인증에러가 발생하였습니다.\n다시 로그인 해주세요.',
  GET_GOOGLE_USER_PROFILE_SERVER_ERROR: '서버에러가 발생하였습니다.\n잠시 후 다시 시도해주세요.',
  GET_DISCORD_USER_PROFILE_AUTH_ERROR: '디스코드 로그인 인증에러가 발생하였습니다.\n다시 로그인 해주세요.',
  GET_DISCORD_USER_PROFILE_SERVER_ERROR: '서버에러가 발생하였습니다.\n잠시 후 다시 시도해주세요.',
} as const;

export class LoginErrorDataOutput {
  registeredEmail?: string;
  registeredSocialProvider?: UserSocialProviderUnion;
}

export class LoginOutput extends CoreOutput<typeof LoginError, LoginErrorDataOutput> {
  loggedInUser?: Pick<UserModel, 'id' | 'socialProvider' | 'email' | 'nickname' | 'profileImg' | 'role'>;
  accessToken?: string;
  refreshToken?: string;
}
