import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

import { jwtDecode } from 'jwt-decode';
import createMiddleware from 'next-intl/middleware';

import { getServerAccessToken, getServerRefreshToken } from '@/api/ApiClient.util';
import { AuthMutation } from '@/api/auth/Auth.mutation';

import { COOKIE_DOMAIN, JWT_ACCESS_TOKEN_COOKIE_NAME } from '@/constants/environment';

import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  let response = intlMiddleware(request);

  if (!response) {
    response = NextResponse.next();
  }

  const responseHeaders = response.headers;
  responseHeaders.set('x-url', request.url);
  responseHeaders.set('x-pathname', request.nextUrl.pathname);
  responseHeaders.set('x-search', request.nextUrl.search);
  responseHeaders.set('x-searchParams', request.nextUrl.searchParams.toString());

  try {
    if (request.nextUrl.pathname.indexOf('/users/login') === -1) {
      const refreshToken = await getServerRefreshToken();
      const accessToken = await getServerAccessToken();

      // NOTE: accessToken이 만료되기 5분전에 토큰을 재발급 받을 수 있게 처리한다.
      let isExpiredAccessToken = false;
      if (accessToken) {
        const decodedAccessToken = jwtDecode<{ exp: number }>(accessToken);
        const currentTimeAddFiveMinues = Math.floor(Date.now() / 1000) + 300;

        if (decodedAccessToken.exp <= currentTimeAddFiveMinues) {
          isExpiredAccessToken = true;
        }
      }

      if ((!accessToken || isExpiredAccessToken) && refreshToken) {
        const refreshTokenResponse = await AuthMutation.refreshJwt();

        if (refreshTokenResponse?.data?.accessToken) {
          const newAccessToken = refreshTokenResponse.data.accessToken;
          const decodedNewAccessToken = jwtDecode(newAccessToken);
          const expiresAt = new Date(decodedNewAccessToken.exp! * 1000);

          response.cookies.set(JWT_ACCESS_TOKEN_COOKIE_NAME, newAccessToken, {
            domain: COOKIE_DOMAIN,
            secure: true,
            sameSite: 'none',
            path: '/',
            expires: expiresAt,
          });
        }
      }
    }
  } catch (err) {
    console.error('- [middleware.ts] Access Token Reissuance Error -');
    console.error(err);
  }

  return response;
}

export const config: MiddlewareConfig = {
  matcher: ['/', '/(en-US|ko|zh-CN|zh-HK|zh-TW|de|es)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
