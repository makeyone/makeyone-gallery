import apiClient from '@/api/ApiClient';
import { FindPostByIdReq } from '@/api/post/request/FindPostByIdReq';
import { FindPostListReq } from '@/api/post/request/FindPostListReq';
import { FindPostListRes } from '@/api/post/response/FindPostListRes';
import { FindPostRes } from '@/api/post/response/FindPostRes';
import { FindPostListViewModel } from '@/api/post/view-model/FindPostListViewModel';
import { FindPostViewModel } from '@/api/post/view-model/FindPostViewModel';
import { ViewModelMapper } from '@/api/support/view-model/ViewModelMapper';

import { generateQueryString } from '@/libs/GenerateQueryString';

export const postQueryKey = {
  findPostById: (findPostReq: FindPostByIdReq) => ['findPostById', findPostReq] as const,
  findPostList: (findPostList: FindPostListReq) => ['findPostList', findPostList] as const,
};

export class PostQuery {
  static async findPostList({ limit, nextCursor }: FindPostListReq): Promise<ViewModelMapper<FindPostListViewModel>> {
    const queryString = generateQueryString({ limit, ...(nextCursor && { nextCursor }) });
    const apiResponse = await apiClient<FindPostListRes>({
      urlPath: `/v1/posts?${queryString}`,
      method: 'GET',
    });
    return ViewModelMapper.of(apiResponse, FindPostListViewModel);
  }

  static async findPostById({ postId }: FindPostByIdReq): Promise<ViewModelMapper<FindPostViewModel>> {
    const apiResponse = await apiClient<FindPostRes>({
      urlPath: `/v1/posts/${postId}`,
      method: 'GET',
    });
    return ViewModelMapper.of(apiResponse, FindPostViewModel);
  }
}
