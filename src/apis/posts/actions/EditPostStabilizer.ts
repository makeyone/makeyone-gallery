import { EditPostStabilizerInput, EditPostStabilizerOutput } from '@/apis/posts/dtos/EditPostStabilizer.dto';

import apiClient from '@/libs/api-client';

export const editPostStabilizer = async (input: EditPostStabilizerInput): Promise<EditPostStabilizerOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/stabilizers`,
    method: 'PATCH',
    data: input,
  });

  return res;
};
