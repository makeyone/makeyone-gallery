import { EditPostContentInput, EditPostContentOutput } from '@/apis/posts/dtos/EditPostContent.dto';

import apiClient from '@/libs/api-client';

export const editPostContent = async (input: EditPostContentInput): Promise<EditPostContentOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/content`,
    method: 'PATCH',
    data: input,
  });

  return res?.data;
};
