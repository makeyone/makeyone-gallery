import { UploadImageInput, UploadImageOutput } from '@/apis/files/dtos/UploadImage.dto';

import apiClient from '@/libs/api-client';

export const uploadImage = async (input: UploadImageInput): Promise<UploadImageOutput> => {
  const res = await apiClient({
    urlPath: `/v1/files/upload/image`,
    method: 'POST',
    data: input,
  });

  return res?.data;
};
