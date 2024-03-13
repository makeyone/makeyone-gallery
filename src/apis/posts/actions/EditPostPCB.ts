import { EditPostPCBInput, EditPostPCBOutput } from '@/apis/posts/dtos/EditPostPCB.dto';

import apiClient from '@/libs/api-client';

export const editPostPCB = async (input: EditPostPCBInput): Promise<EditPostPCBOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/pcb`,
    method: 'PATCH',
    data: input,
  });

  return res?.data;
};
