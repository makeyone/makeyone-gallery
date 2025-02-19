type QueryStringData = {
  [key: string]: string | number | boolean;
};

export const generateQueryString = (queryStringData: QueryStringData): string => {
  const queryStringObject: { [key: string]: string } = Object.fromEntries(
    Object.entries(queryStringData).map(([key, value]) => [key, String(value)]),
  );

  return encodeURI(new URLSearchParams(queryStringObject).toString());
};
