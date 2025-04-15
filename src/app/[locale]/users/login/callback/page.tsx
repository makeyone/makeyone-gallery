import React from 'react';

import { Metadata } from 'next';

import Login from '@/app/[locale]/users/login/callback/_components/Login';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '로그인 - 메이키원',
  };
}

export default async function LoginCallbackPage() {
  return <Login />;
}
