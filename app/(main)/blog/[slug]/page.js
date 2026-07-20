import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag, User } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTASection } from '@/components/sections/CTASection';
import { generateBlogPostMetadata } from '@/lib/seo/metadata';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { formatDate, formatReadingTime } from '@/lib/utils';
import { getPostBySlug, getAllPostSlugs } from '@/lib/sanity/queries';
import { PortableText } from 'next-sanity';

// Fallback posts for development without Sanity
const FALLBACK_POSTS = {
  'what-is-a-payday-loan-florida': {
    title: 'What Is a Payday Loan and How Does It Work in Florida?',
    excerpt: 'A clear, factual explanation of how payday loans work in Florida.',
    publishedAt: '2024-01-15T00:00:00Z',
    readingTime: 6,
    author: { name: 'Sunshine Team', jobTitle: 'Financial Education' },
    categories: [{ title: 'Payday Loan Basics' }],
    body: null,
    seoTitle: null,
    seoDescription: null,
  },
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((item) => ({ slug: item.slug }));
  } catch {
    return Object.keys(FALLBACK_POSTS).map((slug) => ({ slug }));
  }
}

export async function generateMetadata({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) {
      return { title: 'Post Not Found' };
    }
    return generateBlogPostMetadata(post);
  } catch {
    const fallback = FALLBACK_POSTS[params.slug];
    if (!fallback) {
      return { title: 'Post Not Found' };
    }
    return {
      title: fallback.title,
      description: fallback.excerpt,
    };
  }
}

const portableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 text-2xl font-semibold text-[#0A2540]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-xl font-semibold text-[#0A2540]">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 mb-2 text-lg font-semibold text-[#0A2540]">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-foreground leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-[#00A6FB] pl-5 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 space-y-2 pl-5 list-disc marker:text-[#00A6FB]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 space-y-2 pl-5 list-decimal marker:text-[#00A6FB]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-muted-foreground">{children}</li>,
    number: ({ children }) => <li className="text-muted-foreground">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[#0A2540]">{children}</strong>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-[#00A6FB] underline-offset-2 hover:underline"
      >
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }) {
  let post = null;

  try {
    post = await getPostBySlug(params.slug);
  } catch {
    // Sanity not configured
  }

  // Use fallback if no Sanity post
  if (!post) {
    const fallback = FALLBACK_POSTS[params.slug];
    if (!fallback) {
      notFound();
    }
    post = { ...fallback, slug: { current: params.slug } };
  }

  const articleSchema = generateArticleSchema(post);
  const bSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.title },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }} />

      {/* Hero */}
      <section className="bg-[#F8FAFC] py-10 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { name: 'Blog', href: '/blog' },
              { name: post.title },
            ]}
            className="mb-6"
          />
          <div className="max-w-3xl">
            {/* Category */}
            {post.categories?.[0] && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00A6FB]/10 px-3 py-1 text-xs font-semibold text-[#00A6FB]">
                  <Tag className="h-3 w-3" />
                  {post.categories[0].title}
                </span>
              </div>
            )}
            <h1 className="text-3xl font-bold text-[#0A2540] md:text-4xl">{post.title}</h1>

            {/* Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author.name}
                </span>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
              {post.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {formatReadingTime(post.readingTime)}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {/* Article */}
            <article className="lg:col-span-3">
              {/* Featured Image */}
              {post.mainImage?.asset?.url && (
                <div className="mb-8 overflow-hidden rounded-2xl">
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt || post.title}
                    width={800}
                    height={450}
                    className="w-full object-cover"
                  />
                </div>
              )}

              {/* Excerpt */}
              {post.excerpt && (
                <p className="mb-8 text-lg text-muted-foreground border-l-4 border-[#00A6FB] pl-5 italic">
                  {post.excerpt}
                </p>
              )}

              {/* Body */}
              <div className="prose-content">
                {post.body ? (
                  <PortableText value={post.body} components={portableTextComponents} />
                ) : (
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      This article is coming soon. Subscribe to our newsletter or check back for the
                      full content.
                    </p>
                    <Link href="/blog" className="text-[#00A6FB] hover:underline inline-flex items-center gap-1">
                      <ArrowLeft className="h-4 w-4" />
                      Back to Blog
                    </Link>
                  </div>
                )}
              </div>

              {/* Back to Blog */}
              <div className="mt-10 border-t border-border pt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#00A6FB] hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to All Articles
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Author */}
                {post.author && (
                  <div className="rounded-xl border border-border p-5">
                    <h3 className="mb-3 text-sm font-semibold text-[#0A2540]">About the Author</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A2540] text-sm font-bold text-white">
                        {post.author.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0A2540]">{post.author.name}</p>
                        {post.author.jobTitle && (
                          <p className="text-xs text-muted-foreground">{post.author.jobTitle}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Apply CTA */}
                <div className="rounded-xl border border-[#00A6FB]/30 bg-[#00A6FB]/5 p-5">
                  <h3 className="mb-2 font-semibold text-[#0A2540]">Need a loan today?</h3>
                  <p className="mb-4 text-xs text-muted-foreground">
                    Apply online in minutes. Up to $500. Transparent fees.
                  </p>
                  <Link
                    href="/apply"
                    className="block w-full rounded-lg bg-[#00A6FB] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#0097e8]"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
