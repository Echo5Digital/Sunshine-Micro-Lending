import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { formatDateShort, formatReadingTime } from '@/lib/utils';

export const metadata = generatePageMetadata({
  title: 'Florida Payday Loan Blog | Financial Tips & Borrower Guides',
  description:
    'Expert articles about Florida payday loans, borrower rights, fees, financial tips, and loan comparisons. Written for Florida residents.',
  path: '/blog',
  keywords: ['Florida payday loan blog', 'payday loan tips', 'borrower rights articles', 'financial tips Florida'],
});

const BLOG_POSTS = [
  {
    id: '1',
    title: 'What Is a Payday Loan and How Does It Work in Florida?',
    slug: 'what-is-a-payday-loan-florida',
    excerpt: 'A clear, factual explanation of how payday loans work in Florida, including regulations, fees, and borrower protections unique to the state.',
    publishedAt: '2024-01-15T00:00:00Z',
    readingTime: 6,
    category: 'Payday Loan Basics',
  },
  {
    id: '2',
    title: 'Understanding Payday Loan Fees: A Complete Florida Guide',
    slug: 'understanding-payday-loan-fees-florida',
    excerpt: 'Break down exactly what you pay for a Florida payday loan — the 10% fee, the $5 verification fee, APR disclosure, and what those numbers actually mean for you.',
    publishedAt: '2024-01-22T00:00:00Z',
    readingTime: 5,
    category: 'Fees & Rates',
  },
  {
    id: '3',
    title: '5 Things to Know Before Taking Out a Short-Term Loan',
    slug: '5-things-to-know-before-short-term-loan',
    excerpt: 'Before you borrow, make sure you understand these five critical facts about short-term lending in Florida — from repayment terms to grace periods.',
    publishedAt: '2024-02-01T00:00:00Z',
    readingTime: 7,
    category: 'Financial Tips',
  },
  {
    id: '4',
    title: 'Your Rights as a Payday Loan Borrower in Florida',
    slug: 'borrower-rights-florida-payday-loan',
    excerpt: 'Florida law provides strong protections for payday loan borrowers. Learn about the 60-day grace period, the one-loan rule, and how to file a complaint.',
    publishedAt: '2024-02-10T00:00:00Z',
    readingTime: 8,
    category: 'Borrower Rights',
  },
  {
    id: '5',
    title: 'Payday Loan vs Personal Loan: Which Is Right for You?',
    slug: 'payday-loan-vs-personal-loan',
    excerpt: 'Compare payday loans and personal loans side-by-side — loan amounts, approval speed, fees, credit requirements, and when each option makes sense.',
    publishedAt: '2024-02-18T00:00:00Z',
    readingTime: 9,
    category: 'Loan Comparison',
  },
  {
    id: '6',
    title: 'How to Budget When Living Paycheck to Paycheck',
    slug: 'budget-paycheck-to-paycheck',
    excerpt: 'Practical budgeting strategies for Florida workers managing tight monthly finances, including when a short-term loan makes sense as a bridge.',
    publishedAt: '2024-03-01T00:00:00Z',
    readingTime: 6,
    category: 'Financial Tips',
  },
];

const CATEGORY_COLORS = {
  'Payday Loan Basics': 'bg-blue-100 text-blue-700',
  'Fees & Rates': 'bg-green-100 text-green-700',
  'Financial Tips': 'bg-purple-100 text-purple-700',
  'Borrower Rights': 'bg-amber-100 text-amber-700',
  'Loan Comparison': 'bg-[#00A6FB]/10 text-[#00A6FB]',
};

export default function BlogPage() {
  const breadcrumbs = [{ name: 'Blog', href: '/blog' }];
  const bSchema = generateBreadcrumbSchema([{ name: 'Home', href: '/' }, ...breadcrumbs]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }} />

      {/* Hero */}
      <section className="bg-[#F8FAFC] border-b border-border py-10 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          <div className="max-w-2xl">
            <span className="section-label mb-3 block">Knowledge Base</span>
            <h1 className="text-3xl font-bold text-[#0A2540] sm:text-4xl md:text-5xl">
              Florida Payday Loan Blog
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Expert guides, borrower rights information, and financial tips for Florida residents
              navigating short-term lending.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                className="flex flex-col rounded-2xl border border-border bg-white shadow-card overflow-hidden transition-all duration-300 hover:border-[#00A6FB]/40 hover:shadow-card-hover"
              >
                {/* Card Header Gradient */}
                <div className="h-40 bg-gradient-to-br from-[#0A2540] to-[#00A6FB] flex items-center justify-center px-6">
                  <p className="text-center text-sm font-semibold text-white/80 leading-snug">{post.title}</p>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  {/* Category */}
                  <div className="mb-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-medium ${CATEGORY_COLORS[post.category] || 'bg-[#00A6FB]/10 text-[#00A6FB]'}`}>
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-2 text-base font-semibold text-[#0A2540] leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
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
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDateShort(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatReadingTime(post.readingTime)}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
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
