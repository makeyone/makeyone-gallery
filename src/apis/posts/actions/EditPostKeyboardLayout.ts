import { EditPostKeyboardLayoutInput, EditPostKeyboardLayoutOutput } from '@/apis/posts/dtos/EditPostKeyboardLayout.dto';

import apiClient from '@/libs/api-client';

export const editPostKeyboardLayout = async (input: EditPostKeyboardLayoutInput): Promise<EditPostKeyboardLayoutOutput> => {
  const res = await apiClient({
    urlPath: `/v1/posts/${input.postId}/keyboard-layout`,
    method: 'PATCH',
    data: input,
  });

  return res?.data;
};
