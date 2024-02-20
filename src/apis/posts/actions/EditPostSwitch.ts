import { EditPostSwitchInput, EditPostSwitchOutput } from '@/apis/posts/dtos/EditPostSwitch.dto';

import apiClient from '@/libs/api-client';

export const editPostSwitch = async (input: EditPostSwitchInput): Promise<EditPostSwitchOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/switch`,
    method: 'PATCH',
    data: input,
  });

  return res?.data;
};
