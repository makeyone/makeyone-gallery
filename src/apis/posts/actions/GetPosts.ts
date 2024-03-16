import { GetPostsInput, GetPostsOutput } from '@/apis/posts/dtos/GetPosts.dto';

import apiClient from '@/libs/api-client';

export const getPosts = async (input: GetPostsInput): Promise<GetPostsOutput> => {
  const nextCursor = input.nextCursor ? `&nextCursor=${input.nextCursor}` : '';
  const res = await apiClient({
    urlPath: `/v1/posts?limit=${input.limit}${nextCursor}`,
    method: 'GET',
  });

  return res?.data;
};
