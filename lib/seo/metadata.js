const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sunshinemicrolending.com';
const SITE_NAME = 'Sunshine Micro Lending';

export function generatePageMetadata({
  title,
  description,
  path = '/',
  image = '/og-image.png',
  noIndex = false,
  keywords = [],
}) {
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords: [
      ...keywords,
      'payday loans Florida',
      'cash advance Florida',
      'online payday loan',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: image.startsWith('http') ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image.startsWith('http') ? image : `${SITE_URL}${image}`],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

export function generateBlogPostMetadata(post) {
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: post.canonicalUrl || `${SITE_URL}/blog/${post.slug?.current || post.slug}`,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `${SITE_URL}/blog/${post.slug?.current || post.slug}`,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : [],
      images: post.mainImage?.asset?.url
        ? [
            {
              url: post.mainImage.asset.url,
              width: 1200,
              height: 630,
              alt: post.mainImage.alt || post.title,
            },
          ]
        : [
            {
              url: `${SITE_URL}/og-image.png`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.mainImage?.asset?.url
        ? [post.mainImage.asset.url]
        : [`${SITE_URL}/og-image.png`],
    },
    robots: post.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
