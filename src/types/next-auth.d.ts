import { DefaultSession, ISODateString } from 'next-auth';

import { UserSocialProvider } from '@/apis/users/enums/UserSocialProvider.enum';

declare module 'next-auth' {
  interface Session {
    provider: UserSocialProvider;
    accessToken: string;
    expires: ISODateString;
    user: {} & DefaultSession['user'];
  }
}
