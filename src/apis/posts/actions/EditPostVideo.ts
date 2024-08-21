import { EditPostVideoInput, EditPostVideoOutput } from '@/apis/posts/dtos/EditPostVideo.dto';

import apiClient from '@/libs/api-client';

export const editPostVideo = async (input: EditPostVideoInput): Promise<EditPostVideoOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/video`,
    method: 'PATCH',
    data: input,
  });

  return res;
};
