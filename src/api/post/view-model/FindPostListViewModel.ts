import { FindPostListRes } from '@/api/post/response/FindPostListRes';

export class FindPostListViewModel {
  constructor(
    readonly totalResults: number,
    readonly cursor: {
      readonly beforeCursor?: string | null;
      readonly afterCursor?: string | null;
    } | null,
    readonly posts: {
      readonly id: number;
      readonly createdAt: string;
      readonly postTitle: string;
      readonly postedUser: {
        readonly id: number;
        readonly nickname: string;
        readonly profileImg: string;
      };
      readonly postImages: {
        readonly id: number;
        readonly imageUrl: string;
      }[];
    }[],
  ) {}

  static of({ totalResults, cursor, posts }: FindPostListRes): FindPostListViewModel {
    return new FindPostListViewModel(totalResults, cursor, posts);
  }
}
