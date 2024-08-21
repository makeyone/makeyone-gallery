import { EditPostKeycapOnLayoutInput, EditPostKeycapOnLayoutOutput } from '@/apis/posts/dtos/EditPostKeycapOnLayout.dto';

import apiClient from '@/libs/api-client';

export const editPostKeycapOnLayout = async (input: EditPostKeycapOnLayoutInput): Promise<EditPostKeycapOnLayoutOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/keycap-on-layout`,
    method: 'PATCH',
    data: input,
  });

  return res;
};
