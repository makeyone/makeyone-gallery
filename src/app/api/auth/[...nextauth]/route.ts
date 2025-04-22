import NextAuth, { ISODateString } from 'next-auth';

import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

import { getServerLocale } from '@/api/ApiClient.util';

import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRENT,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  KAKAO_CLIENT_SECRENT,
  KAKAO_REST_API_KEY,
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRENT,
  NEXTAUTH_URL,
  NODE_ENV,
  TEST_DISCORD_CLIENT_ID,
  TEST_DISCORD_CLIENT_SECRENT,
  TEST_GOOGLE_OAUTH_CLIENT_ID,
  TEST_GOOGLE_OAUTH_CLIENT_SECRET,
  TEST_KAKAO_CLIENT_SECRENT,
  TEST_KAKAO_REST_API_KEY,
  TEST_NAVER_CLIENT_ID,
  TEST_NAVER_CLIENT_SECRENT,
} from '@/constants/environment';

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

const isProd = NODE_ENV === 'production';
const handler = NextAuth({
  providers: [
    NaverProvider({
      clientId: isProd === true ? NAVER_CLIENT_ID : TEST_NAVER_CLIENT_ID,
      clientSecret: isProd === true ? NAVER_CLIENT_SECRENT : TEST_NAVER_CLIENT_SECRENT,
      authorization: {
        params: {
          redirect_uri: `${NEXTAUTH_URL}/api/auth/callback/naver`,
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    DiscordProvider({
      clientId: isProd === true ? DISCORD_CLIENT_ID : TEST_DISCORD_CLIENT_ID,
      clientSecret: isProd === true ? DISCORD_CLIENT_SECRENT : TEST_DISCORD_CLIENT_SECRENT,
      authorization: {
        params: {
          redirect_uri: `${NEXTAUTH_URL}/api/auth/callback/discord`,
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    GoogleProvider({
      clientId: isProd === true ? GOOGLE_OAUTH_CLIENT_ID : TEST_GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: isProd === true ? GOOGLE_OAUTH_CLIENT_SECRET : TEST_GOOGLE_OAUTH_CLIENT_SECRET,
      authorization: {
        params: {
          redirect_uri: `${NEXTAUTH_URL}/api/auth/callback/google`,
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    KakaoProvider({
      clientId: isProd === true ? KAKAO_REST_API_KEY : TEST_KAKAO_REST_API_KEY,
      clientSecret: isProd === true ? KAKAO_CLIENT_SECRENT : TEST_KAKAO_CLIENT_SECRENT,
      authorization: {
        params: {
          redirect_uri: `${NEXTAUTH_URL}/api/auth/callback/kakao`,
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
