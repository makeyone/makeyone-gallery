import {
  EditPostKeyboardDefinitionInput,
  EditPostKeyboardDefinitionOutput,
} from '@/apis/posts/dtos/EditPostKeyboardDefinition.dto';

import apiClient from '@/libs/api-client';

export const editPostKeyboardDefinition = async (
  input: EditPostKeyboardDefinitionInput,
): Promise<EditPostKeyboardDefinitionOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/keyboard-definition`,
    method: 'PATCH',
    data: input,
  });

  return res?.data;
};
