import * as React from 'react';

import useResizeObserver from '@react-hook/resize-observer';

export default function useGetSize(target: React.MutableRefObject<HTMLElement | null>) {
  const [size, setSize] = React.useState<DOMRect>();

  React.useLayoutEffect(() => {
    if (target.current) {
      setSize(target.current.getBoundingClientRect());
    }
  }, [target]);

  useResizeObserver(target, (entry: any) => setSize(entry.contentRect));

  return size;
}
