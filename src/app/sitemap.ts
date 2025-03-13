import type { MetadataRoute } from 'next';

import { PostQuery } from '@/api/post/Post.query';

import { FRONT_SERVER_URL } from '@/constants/environment';

async function getPostList() {
  const postList = await PostQuery.findPostList({ limit: 50000 });
  return postList.data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postList = await getPostList();
  const postIds = postList.posts.map((post) => post.id);

  return [
    {
      url: FRONT_SERVER_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...postIds.map((postId) => ({
      url: `${FRONT_SERVER_URL}/posts/${postId}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
