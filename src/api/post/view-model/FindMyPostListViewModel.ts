import { FindMyPostListRes } from '@/api/post/response/FindMyPostListRes';

import dateTimeAgo from '@/utils/date-time-ago';

export class FindMyPostListViewModel {
  constructor(
    readonly totalResults: number,
    readonly cursor: {
      readonly beforeCursor?: string | null;
      readonly afterCursor?: string | null;
    } | null,
    readonly posts: {
      readonly id: number;
      readonly postedDate: string;
      readonly postTitle: string;
      readonly postedUser: {
        readonly id: number;
        readonly nickname: string;
        readonly profileImg: string;
      };
      readonly postThumbnail: string;
      readonly postImages: {
        readonly id: number;
        readonly imageUrl: string;
      }[];
    }[],
  ) {}

  static of({ totalResults, cursor, posts }: FindMyPostListRes): FindMyPostListViewModel {
    return new FindMyPostListViewModel(
      totalResults,
      cursor,
      posts.map((post) => ({
        id: post.id,
        postedDate: dateTimeAgo(post.createdAt),
        postTitle: post.postTitle,
        postedUser: post.postedUser,
        postThumbnail: post.postImages[0].imageUrl,
        postImages: post.postImages,
      })),
    );
  }
}
