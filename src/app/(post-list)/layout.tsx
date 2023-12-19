import '@/styles/reset.css';
import '@/styles/react-toastify.css';
import '@/styles/sweet-alert2.css';
import '@/styles/global.css';

import React from 'react';

import Footer from '@/app/(post-list)/_components/Footer';
import Header from '@/app/(post-list)/_components/Header';

type Props = {
  children: React.ReactNode;
};

export default async function PostListLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
