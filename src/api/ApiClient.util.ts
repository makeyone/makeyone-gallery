import { JWT_ACCESS_TOKEN_COOKIE_NAME, JWT_REFRESH_TOKEN_COOKIE_NAME } from '@/constants/environment';

export async function getServerAuthTokenCookies(): Promise<string | null> {
  const { cookies } = await import('next/headers');

  const cookieStore = await cookies();

  const refreshToken = cookieStore.get(JWT_REFRESH_TOKEN_COOKIE_NAME)?.value || '';
  const accessToken = cookieStore.get(JWT_ACCESS_TOKEN_COOKIE_NAME)?.value || '';

  const serverAuthToken = `${JWT_REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}; ${
    accessToken ? `${JWT_ACCESS_TOKEN_COOKIE_NAME}=${accessToken};` : ''
  }`;

  return serverAuthToken;
}

export async function getServerRefreshToken(): Promise<string | null> {
  const { cookies } = await import('next/headers');

  const cookieStore = await cookies();

  const refreshToken = cookieStore.get(JWT_REFRESH_TOKEN_COOKIE_NAME)?.value || null;

  return refreshToken;
}

export async function getServerAccessToken(): Promise<string | null> {
  const { cookies } = await import('next/headers');

  const cookieStore = await cookies();

  const accessToken = cookieStore.get(JWT_ACCESS_TOKEN_COOKIE_NAME)?.value || null;

  return accessToken;
}

export async function getServerLocale(): Promise<string> {
  const { cookies } = await import('next/headers');

  const cookieStore = await cookies();

  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en-US';

  return locale;
}

export function getClientAuthTokenCookies(): string {
  const locale = document.cookie
    .split('; ')
    .filter((cookie) => cookie.startsWith('MAKEYONE__A_JWT') || cookie.startsWith('MAKEYONE__R_JWT'))
    .join(';');

  return locale;
}

export function getClientRefreshToken(): string {
  const refreshToken =
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('MAKEYONE__R_JWT'))
      ?.split('=')[1] || '';

  return refreshToken;
}

export function getClientAccessToken(): string {
  const accessToken =
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('MAKEYONE__A_JWT'))
      ?.split('=')[1] || '';

  return accessToken;
}

export function getClientLocale(): string {
  const locale =
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('NEXT_LOCALE'))
      ?.split('=')[1] || 'en-US';

  return locale;
}
