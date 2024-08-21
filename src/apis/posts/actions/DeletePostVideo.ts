import { DeletePostVideoInput, DeletePostVideoOutput } from '@/apis/posts/dtos/DeletePostVideo.dto';

import apiClient from '@/libs/api-client';

export const deletePostVideo = async (input: DeletePostVideoInput): Promise<DeletePostVideoOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/video`,
    method: 'DELETE',
  });

  return res;
};
