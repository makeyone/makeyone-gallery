import { FindPostListRes } from '@/api/post/response/FindPostListRes';

import dateTimeAgo from '@/utils/date-time-ago';

export class FindPostListViewModel {
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
      readonly postThumbnail: string;
      readonly postImages: {
        readonly id: number;
        readonly imageUrl: string;
      }[];
      readonly postedUser: {
        readonly id: number;
        readonly nickname: string;
        readonly profileImg: string;
      } | null;
    }[],
  ) {}

  static of({ totalResults, cursor, posts }: FindPostListRes): FindPostListViewModel {
    return new FindPostListViewModel(
      totalResults,
      cursor,
      posts.map((post) => ({
        id: post.id,
        postedDate: dateTimeAgo(post.createdAt),
        postTitle: post?.postTitle || '게시글 제목을 등록해주세요.',
        postThumbnail: post.postImages[0]?.imageUrl || '/images/posts/blank_thumbnail.png',
        postImages: post.postImages,
        postedUser: post?.postedUser || null,
      })),
    );
  }
}
