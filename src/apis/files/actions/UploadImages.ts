import { UploadImagesInput, UploadImagesOutput } from '@/apis/files/dtos/UploadImages.dto';

import apiClient from '@/libs/api-client';

export const uploadImages = async (input: UploadImagesInput): Promise<UploadImagesOutput> => {
  const res = await apiClient({
    urlPath: `/v1/files/images`,
    method: 'POST',
    data: input,
  });

  return res;
};
