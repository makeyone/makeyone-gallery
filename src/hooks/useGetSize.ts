import * as React from 'react';

import useResizeObserver from '@react-hook/resize-observer';

export default function useGetSize(target: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = React.useState<DOMRect>();

  React.useLayoutEffect(() => {
    if (target.current) {
      setSize(target.current.getBoundingClientRect());
    }
  }, [target]);

  useResizeObserver(target as React.RefObject<HTMLElement> | null, (entry: any) => setSize(entry.contentRect));

  return size;
}
