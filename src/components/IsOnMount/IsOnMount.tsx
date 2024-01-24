'use client';

import React, { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function IsOnMount({ children }: Props) {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return <>{mounted === true && children}</>;
}
