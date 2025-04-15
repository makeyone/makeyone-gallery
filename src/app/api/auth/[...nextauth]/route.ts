import NextAuth, { ISODateString } from 'next-auth';

import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

import { getServerLocale } from '@/api/ApiClient.util';

export type SocialLoginType = 'NAVER' | 'DISCORD' | 'GOOGLE' | 'KAKAO';
export type CallbackSessionReturnType = {
  expires: ISODateString;
  accessToken: string;
  provider: string;
  user?: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
};

const isProd = process.env.NODE_ENV === 'production';
const handler = NextAuth({
  providers: [
    NaverProvider({
      clientId: isProd === true ? process.env.NAVER_CLIENT_ID : process.env.TEST_NAVER_CLIENT_ID,
      clientSecret: isProd === true ? process.env.NAVER_CLIENT_SECRENT : process.env.TEST_NAVER_CLIENT_SECRENT,
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/naver`,
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    DiscordProvider({
      clientId: isProd === true ? process.env.DISCORD_CLIENT_ID : process.env.TEST_DISCORD_CLIENT_ID,
      clientSecret: isProd === true ? process.env.DISCORD_CLIENT_SECRENT : process.env.TEST_DISCORD_CLIENT_SECRENT,
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/discord`,
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    GoogleProvider({
      clientId: isProd === true ? process.env.GOOGLE_OAUTH_CLIENT_ID : process.env.TEST_GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: isProd === true ? process.env.GOOGLE_OAUTH_CLIENT_SECRET : process.env.TEST_GOOGLE_OAUTH_CLIENT_SECRET,
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    KakaoProvider({
      clientId: isProd === true ? process.env.KAKAO_REST_API_KEY : process.env.TEST_KAKAO_REST_API_KEY,
      clientSecret: isProd === true ? process.env.KAKAO_CLIENT_SECRENT : process.env.TEST_KAKAO_CLIENT_SECRENT,
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/kakao`,
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }

      return token;
    },
    async session({ session, token }) {
      const sessionReturn: CallbackSessionReturnType = {
        expires: session.expires,
        accessToken: token.accessToken as string,
        provider: (token.provider as string).toUpperCase(),
        user: {
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
        },
      };
      return sessionReturn;
    },
    async redirect() {
      const locale = await getServerLocale();

      return `/${locale}/users/login/callback`;
    },
  },
});

export { handler as GET, handler as POST };
