import { SignInRes } from '@/api/auth/response/SignInRes';

export class SignInViewModel {
  constructor(readonly userId: number, readonly accessToken: string, readonly refreshToken: string) {}

  static of(signInResponse: SignInRes): SignInViewModel {
    return new SignInViewModel(signInResponse.loggedInUser.id, signInResponse.accessToken, signInResponse.refreshToken);
  }
}
