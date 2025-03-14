import { useEffect, useState } from 'react';

import { Union } from '@/utils/union-type';

export const device = {
  desktop: 'desktop',
  tablet: 'tablet',
  mobile: 'mobile',
} as const;
export type DeviceType = Union<typeof device>;

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [windowHeight, setWindowHeight] = useState<number | null>(null);
  const [userDevice, setUserDevice] = useState<DeviceType | null>(null);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);

      if (window.innerWidth >= 1025) {
        return setUserDevice('desktop');
      }

      if (window.innerWidth >= 769) {
        return setUserDevice('tablet');
      }

      return setUserDevice('mobile');
    };
    updateWindowSize();

    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  return { windowWidth, windowHeight, userDevice };
};

export default useWindowSize;
