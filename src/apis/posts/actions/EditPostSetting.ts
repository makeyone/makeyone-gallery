import { EditPostSettingInput, EditPostSettingOutput } from '@/apis/posts/dtos/EditPostSetting.dto';

import apiClient from '@/libs/api-client';

export const editPostSetting = async (input: EditPostSettingInput): Promise<EditPostSettingOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/setting`,
    method: 'PATCH',
    data: input,
  });

  return res;
};
