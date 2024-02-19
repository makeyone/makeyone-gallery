import { EditPostHousingInput, EditPostHousingOutput } from '@/apis/posts/dtos/EditPostHousing.dto';

import apiClient from '@/libs/api-client';

export const editPostHousing = async (input: EditPostHousingInput): Promise<EditPostHousingOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/housing`,
    method: 'PATCH',
    data: input,
  });

  return res?.data;
};
