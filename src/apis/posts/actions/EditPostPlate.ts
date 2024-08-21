import { EditPostPlateInput, EditPostPlateOutput } from '@/apis/posts/dtos/EditPostPlate.dto';

import apiClient from '@/libs/api-client';

export const editPostPlate = async (input: EditPostPlateInput): Promise<EditPostPlateOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/plate`,
    method: 'PATCH',
    data: input,
  });

  return res;
};
