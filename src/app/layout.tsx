'use client';

import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  useEffect(() => {
    const documentHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    documentHeight();
    window.addEventListener('resize', documentHeight);
    return () => {
      window.removeEventListener('resize', documentHeight);
    };
  }, []);

  return children;
}
