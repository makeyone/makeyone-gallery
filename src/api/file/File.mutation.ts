import apiClient from '@/api/ApiClient';
import { UploadImageListReq } from '@/api/file/request/UploadImageListReq';
import { UploadImageListRes } from '@/api/file/response/UploadImageListRes';
import { UploadImageListViewModel } from '@/api/file/view-model/UploadImageListModel';
import { ViewModelMapper } from '@/api/support/view-model/ViewModelMapper';

import { NODE_ENV } from '@/constants/environment';

export const uploadPathAndSize = {
  posts: {
    mainAndListImages: {
      uploadPath: `uploads/${NODE_ENV}/posts/images/main_and_list`,
      maxSize: 10,
    },
    contentImages: {
      uploadPath: `uploads/${NODE_ENV}/posts/images/content`,
      maxSize: 10,
    },
  },
};

export class FileMutation {
  static async uploadImageList(uploadImageListReq: UploadImageListReq): Promise<ViewModelMapper<UploadImageListViewModel[]>> {
    const apiResponse = await apiClient<UploadImageListRes>({
      urlPath: `/v1/files/images`,
      method: 'POST',
      data: uploadImageListReq,
    });

    return ViewModelMapper.of(apiResponse, UploadImageListViewModel);
  }
}
