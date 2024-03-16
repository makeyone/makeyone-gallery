import React from 'react';

import TabMenu from '@/app/(main)/_components/TabMenu';

import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

type Props = {
  children: React.ReactNode;
};

export default async function PostListLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="main">
        <TabMenu />
        {children}
      </main>
      <Footer />
    </>
  );
}
