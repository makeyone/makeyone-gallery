import { EditPostImagesInput, EditPostImagesOutput } from '@/apis/posts/dtos/EditPostImages.dto';

import apiClient from '@/libs/api-client';

export const editPostImages = async (input: EditPostImagesInput): Promise<EditPostImagesOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/images`,
    method: 'PATCH',
    data: input,
  });

  return res;
};
