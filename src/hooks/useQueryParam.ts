'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type NewQueryParams = {
  [key: string]: string | number;
};

type Props = {
  pushNewUrl: boolean;
  resetPageParam?: boolean;
};

/**
 * @description 쿼리파라메터를 업데이트 하는 커스텀 훅
 * @param { pushNewUrl } (Required) 변경된 파라메터 값이 적용된 Url로 이동할 것인지
 * @param { resetPageParam } (Optional) 페이징 처리된 부분을 초기화 시킬 것인지
 */
export default function useQueryParam({ pushNewUrl, resetPageParam = false }: Props) {
  const [newQueryParams, setNewQueryParams] = useState<NewQueryParams[] | []>([]);

  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(Array.from(searchParams.entries()));

  if (resetPageParam === true) {
    urlSearchParams.delete('page');
  }

  for (const newQueryParam of newQueryParams) {
    const key = Object.keys(newQueryParam)[0];
    const value = Object.values(newQueryParam)[0] as string;

    urlSearchParams.set(key, value);
  }

  const queryParamsToString = urlSearchParams.toString();
  const pathname = usePathname();
  const query = queryParamsToString ? `?${queryParamsToString}` : '';
  const url = `${pathname}${query}`;

  const [newUrl, setNewUrl] = useState<string>('');

  useEffect(() => {
    if (newQueryParams.length > 0) {
      setNewUrl(url);
      setNewQueryParams([]);
    }
  }, [newQueryParams]);

  const { push } = useRouter();
  useEffect(() => {
    if (newUrl) {
      setNewUrl('');
      if (pushNewUrl === true) {
        push(newUrl);
      }
    }
  }, [newUrl, pushNewUrl]);

  return { setNewQueryParams, url, newUrl, query, pathname } as const;
}
