import { CreatePostOutput } from '@/apis/posts/dtos/CreatePost.dto';

import apiClient from '@/libs/api-client';

export const createPost = async (): Promise<CreatePostOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts`,
    method: 'POST',
  });

  return res?.data;
};
