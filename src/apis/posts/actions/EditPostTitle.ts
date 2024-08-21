import { EditPostTitleInput, EditPostTitleOutput } from '@/apis/posts/dtos/EditPostTitle.dto';

import apiClient from '@/libs/api-client';

export const editPostTitle = async (input: EditPostTitleInput): Promise<EditPostTitleOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/title`,
    method: 'PATCH',
    data: input,
  });

  return res;
};
