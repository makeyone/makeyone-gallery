import { DeletePostPlateInput, DeletePostPlateOutput } from '@/apis/posts/dtos/DeletePostPlate.dto';

import apiClient from '@/libs/api-client';

export const deletePostPlate = async (input: DeletePostPlateInput): Promise<DeletePostPlateOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/plate`,
    method: 'DELETE',
  });

  return res?.data;
};
