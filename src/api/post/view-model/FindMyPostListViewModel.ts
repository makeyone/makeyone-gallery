import { FindMyPostListRes } from '@/api/post/response/FindMyPostListRes';

import timeAgo from '@/utils/time-ago';

export class FindMyPostListViewModel {
  constructor(
    readonly totalResults: number,
    readonly cursor: {
      readonly beforeCursor?: string | null;
      readonly afterCursor?: string | null;
    } | null,
    readonly posts: {
      readonly id: number;
      readonly createdDateTimeAgo: string;
      readonly postTitle: string | null;
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
      readonly isPublished: boolean;
    }[],
  ) {}

  static of({ totalResults, cursor, posts }: FindMyPostListRes): FindMyPostListViewModel {
    return new FindMyPostListViewModel(
      totalResults,
      cursor,
      posts.map((post) => ({
        id: post.id,
        createdDateTimeAgo: timeAgo(post.createdAt),
        postTitle: post?.postTitle || null,
        postedUser: post.postedUser,
        postThumbnail: post.postImages[0]?.imageUrl || '/images/posts/blank_thumbnail.png',
        postImages: post.postImages,
        isPublished: post.isPublished,
      })),
    );
  }
}
