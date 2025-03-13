import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/mypage/', '/terms/', '/posts/*/edit/', '/users/'],
      },
    ],
    sitemap: 'https://www.makeyone.com/sitemap.xml',
  };
}
