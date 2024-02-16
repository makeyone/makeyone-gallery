import { GetPostByIdInput, GetPostByIdOutput } from '@/apis/posts/dtos/GetPostById.dto';

import apiClient from '@/libs/api-client';

export const getPostById = async (input: GetPostByIdInput): Promise<GetPostByIdOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}`,
    method: 'GET',
  });

  return res?.data;
};
