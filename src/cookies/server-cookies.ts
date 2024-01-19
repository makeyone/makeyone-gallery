'use server';

import { cookies } from 'next/headers';

import { CookieKeys } from '@/cookies/cookie-keys';

export async function getServerCookie(key: CookieKeys) {
  return cookies().get(key)?.value;
}
