import { EditPostFoamInput, EditPostFoamOutput } from '@/apis/posts/dtos/EditPostFoam.dto';

import apiClient from '@/libs/api-client';

export const editPostFoam = async (input: EditPostFoamInput): Promise<EditPostFoamOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/foam`,
    method: 'PATCH',
    data: input,
  });

  return res;
};
