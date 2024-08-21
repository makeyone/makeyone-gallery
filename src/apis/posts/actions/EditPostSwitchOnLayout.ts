import { EditPostSwitchOnLayoutInput, EditPostSwitchOnLayoutOutput } from '@/apis/posts/dtos/EditPostSwitchOnLayout.dto';

import apiClient from '@/libs/api-client';

export const editPostSwitchOnLayout = async (input: EditPostSwitchOnLayoutInput): Promise<EditPostSwitchOnLayoutOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/switch-on-layout`,
    method: 'PATCH',
    data: input,
  });

  return res;
};
