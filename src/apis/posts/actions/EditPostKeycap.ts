import { EditPostKeycapInput, EditPostKeycapOutput } from '@/apis/posts/dtos/EditPostKeycap.dto';

import apiClient from '@/libs/api-client';

export const editPostKeycap = async (input: EditPostKeycapInput): Promise<EditPostKeycapOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/keycaps`,
    method: 'PATCH',
    data: input,
  });

  return res;
};
