import React from 'react';

import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

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
