import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { formatDateShort, formatReadingTime } from '@/lib/utils';
import { getAllPosts, getAllCategories } from '@/lib/sanity/queries';

export const metadata = generatePageMetadata({
  title: 'Florida Payday Loan Blog | Financial Tips & Borrower Guides',
  description:
    'Expert articles about Florida payday loans, borrower rights, fees, financial tips, and loan comparisons. Written for Florida residents.',
  path: '/blog',
  keywords: ['Florida payday loan blog', 'payday loan tips', 'borrower rights articles', 'financial tips Florida'],
});

// Fallback seed posts if Sanity is not yet configured
const SEED_POSTS = [
  {
    _id: '1',
    title: 'What Is a Payday Loan and How Does It Work in Florida?',
    slug: { current: 'what-is-a-payday-loan-florida' },
    excerpt: 'A clear, factual explanation of how payday loans work in Florida, including regulations, fees, and borrower protections unique to the state.',
    publishedAt: '2024-01-15T00:00:00Z',
    readingTime: 6,
    categories: [{ title: 'Payday Loan Basics', slug: { current: 'basics' }, color: 'blue' }],
    author: { name: 'Sunshine Team' },
  },
  {
    _id: '2',
    title: 'Understanding Payday Loan Fees: A Complete Florida Guide',
    slug: { current: 'understanding-payday-loan-fees-florida' },
    excerpt: 'Break down exactly what you pay for a Florida payday loan—the 10% fee, the $5 verification fee, APR disclosure, and what those numbers actually mean for you.',
    publishedAt: '2024-01-22T00:00:00Z',
    readingTime: 5,
    categories: [{ title: 'Fees & Rates', slug: { current: 'fees-rates' }, color: 'green' }],
    author: { name: 'Sunshine Team' },
  },
  {
    _id: '3',
    title: '5 Things to Know Before Taking Out a Short-Term Loan',
    slug: { current: '5-things-to-know-before-short-term-loan' },
    excerpt: 'Before you borrow, make sure you understand these five critical facts about short-term lending in Florida—from repayment terms to grace periods.',
    publishedAt: '2024-02-01T00:00:00Z',
    readingTime: 7,
    categories: [{ title: 'Financial Tips', slug: { current: 'tips' }, color: 'purple' }],
    author: { name: 'Sunshine Team' },
  },
  {
    _id: '4',
    title: 'Your Rights as a Payday Loan Borrower in Florida',
    slug: { current: 'borrower-rights-florida-payday-loan' },
    excerpt: 'Florida law provides strong protections for payday loan borrowers. Learn about the 60-day grace period, the one-loan rule, and how to file a complaint.',
    publishedAt: '2024-02-10T00:00:00Z',
    readingTime: 8,
    categories: [{ title: 'Borrower Rights', slug: { current: 'rights' }, color: 'navy' }],
    author: { name: 'Sunshine Team' },
  },
  {
    _id: '5',
    title: 'Payday Loan vs Personal Loan: Which Is Right for You?',
    slug: { current: 'payday-loan-vs-personal-loan' },
    excerpt: 'Compare payday loans and personal loans side-by-side—loan amounts, approval speed, fees, credit requirements, and when each option makes sense.',
    publishedAt: '2024-02-18T00:00:00Z',
    readingTime: 9,
    categories: [{ title: 'Loan Comparison', slug: { current: 'comparison' }, color: 'blue' }],
    author: { name: 'Sunshine Team' },
  },
];

export default async function BlogPage() {
  const breadcrumbs = [{ name: 'Blog', href: '/blog' }];
  const bSchema = generateBreadcrumbSchema([{ name: 'Home', href: '/' }, ...breadcrumbs]);

  let posts = [];
  let categories = [];

  try {
    [posts, categories] = await Promise.all([getAllPosts(20), getAllCategories()]);
  } catch {
    // Sanity not configured yet—use seed posts
    posts = SEED_POSTS;
    categories = [];
  }

  const displayPosts = posts.length > 0 ? posts : SEED_POSTS;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }} />

      {/* Hero */}
      <section className="bg-[#F8FAFC] py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          <div className="max-w-2xl">
            <span className="section-label mb-4">Knowledge Base</span>
            <h1 className="mt-4 text-4xl font-bold text-[#0A2540] md:text-5xl">
              Florida Payday Loan Blog
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Expert guides, borrower rights information, and financial tips for Florida residents
              navigating short-term lending.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="border-b border-border bg-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className="rounded-full border border-[#00A6FB] bg-[#00A6FB]/10 px-4 py-1.5 text-xs font-medium text-[#00A6FB]"
              >
                All Posts
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/blog?category=${cat.slug?.current}`}
                  className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-[#00A6FB] hover:text-[#00A6FB]"
                >
                  {cat.title}
                  {cat.postCount > 0 && (
                    <span className="ml-1.5 text-[10px] text-muted-foreground/60">({cat.postCount})</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((post) => (
              <article
                key={post._id}
                className="flex flex-col rounded-2xl border border-border bg-white shadow-card overflow-hidden transition-all duration-300 hover:border-[#00A6FB]/40 hover:shadow-card-hover"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-[#0A2540] to-[#00A6FB] flex items-center justify-center">
                  {post.mainImage?.asset?.url ? (
                    <Image
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt || post.title}
                      width={400}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <p className="text-white/60 text-xs">Sunshine Micro Lending</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  {/* Category */}
                  {post.categories?.[0] && (
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00A6FB]/10 px-3 py-0.5 text-xs font-medium text-[#00A6FB]">
                        <Tag className="h-3 w-3" />
                        {post.categories[0].title}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="mb-3 text-lg font-semibold text-[#0A2540] leading-snug">
                    <Link
                      href={`/blog/${post.slug?.current || post.slug}`}
                      className="hover:text-[#00A6FB] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDateShort(post.publishedAt)}
                        </span>
                      )}
                      {post.readingTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {formatReadingTime(post.readingTime)}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/blog/${post.slug?.current || post.slug}`}
                      className="flex items-center gap-1 text-xs font-semibold text-[#00A6FB] hover:underline"
                      aria-label={`Read ${post.title}`}
                    >
                      Read
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
