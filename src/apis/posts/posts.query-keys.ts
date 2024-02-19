export const postsQueryKeys = {
  all: () => ['posts_all'] as const,
  byId: (postId: number) => [...postsQueryKeys.all(), postId] as const,
};
