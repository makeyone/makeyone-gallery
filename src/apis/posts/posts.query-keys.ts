import { GetPostsInput } from '@/apis/posts/dtos/GetPosts.dto';

export const postsQueryKeys = {
  all: () => ['posts_all'] as const,
  listByCursorPagination: (getPostsInput: GetPostsInput) => ['posts_all', getPostsInput] as const,
  byId: (postId: number) => [...postsQueryKeys.all(), postId] as const,
};
