'use client';

import Cookies from 'universal-cookie';

import { CookieKeys } from '@/cookies/cookie-keys';

const cookies = new Cookies();

export function getClientCookie(key: CookieKeys) {
  return cookies.get(key);
}

export function setClientCookie(key: CookieKeys, value: any) {
  cookies.set(key, value, {
    path: '/',
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    domain: process.env.FRONT_SERVER_URL.replace('https://', '').replace('http://', ''),
  });
}

export function removeClientCookie(key: CookieKeys) {
  cookies.remove(key, { path: '/', domain: `.${process.env.FRONT_SERVER_URL.replace('https://', '').replace('http://', '')}` });
}
