import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag, User } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTASection } from '@/components/sections/CTASection';
import { generateBlogPostMetadata } from '@/lib/seo/metadata';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { formatDate, formatReadingTime } from '@/lib/utils';

const BLOG_POSTS = {
  'what-is-a-payday-loan-florida': {
    title: 'What Is a Payday Loan and How Does It Work in Florida?',
    excerpt: 'A clear, factual explanation of how payday loans work in Florida, including regulations, fees, and borrower protections unique to the state.',
    publishedAt: '2024-01-15T00:00:00Z',
    readingTime: 6,
    category: 'Payday Loan Basics',
    author: { name: 'Sunshine Team', jobTitle: 'Financial Education' },
    content: [
      { type: 'h2', text: 'What Is a Payday Loan?' },
      { type: 'p', text: 'A payday loan is a short-term, small-dollar loan designed to help you cover unexpected expenses until your next paycheck. In Florida, payday loans are legally regulated under the Florida Deferred Presentment Act, which sets strict rules to protect borrowers.' },
      { type: 'p', text: 'You write a personal check (or authorize an electronic debit) for the loan amount plus fees. The lender holds the check until your next payday — typically 7 to 31 days — then deposits it or you repay in cash.' },
      { type: 'h2', text: 'How Payday Loans Work in Florida' },
      { type: 'p', text: 'Florida law caps payday loan amounts at $500 per loan. You cannot have more than one outstanding payday loan at a time in the state, thanks to the statewide database all licensed lenders must check before issuing a new loan.' },
      { type: 'p', text: 'Here is the step-by-step process:' },
      { type: 'li', text: 'You apply online or in-store with a valid ID, proof of income, and an active checking account.' },
      { type: 'li', text: 'The lender verifies your information and checks the state database.' },
      { type: 'li', text: 'If approved, you receive funds — often the same day or within one business day.' },
      { type: 'li', text: 'On your due date, the lender deposits your check or debits your account.' },
      { type: 'h2', text: 'Florida Regulations That Protect You' },
      { type: 'p', text: 'Florida has some of the strongest payday lending regulations in the country. Key protections include:' },
      { type: 'li', text: 'Maximum loan amount: $500' },
      { type: 'li', text: 'Maximum fee: 10% of the loan amount plus a $5 verification fee' },
      { type: 'li', text: 'Loan term: 7 to 31 days' },
      { type: 'li', text: 'One loan at a time: enforced through a statewide database' },
      { type: 'li', text: '60-day grace period if you cannot repay on time (with credit counseling enrollment)' },
      { type: 'li', text: 'No rollovers: lenders cannot charge additional fees to extend your loan' },
      { type: 'h2', text: 'When Does a Payday Loan Make Sense?' },
      { type: 'p', text: 'A payday loan can be a reasonable option when you face a genuine short-term emergency — a car repair, a medical copay, or an overdue utility bill — and you are confident you can repay the full amount on your next payday.' },
      { type: 'p', text: 'It is not a good fit for ongoing financial shortfalls, rent, or large recurring expenses. If you find yourself needing payday loans repeatedly, speaking with a nonprofit credit counselor can help you find a longer-term solution.' },
      { type: 'h2', text: 'The Bottom Line' },
      { type: 'p', text: 'Payday loans in Florida are a regulated, legal financial product with clear costs and terms. Understanding exactly how they work — and what protections you have — helps you make an informed decision when you need fast cash.' },
    ],
  },
  'understanding-payday-loan-fees-florida': {
    title: 'Understanding Payday Loan Fees: A Complete Florida Guide',
    excerpt: 'Break down exactly what you pay for a Florida payday loan — the 10% fee, the $5 verification fee, APR disclosure, and what those numbers actually mean for you.',
    publishedAt: '2024-01-22T00:00:00Z',
    readingTime: 5,
    category: 'Fees & Rates',
    author: { name: 'Sunshine Team', jobTitle: 'Financial Education' },
    content: [
      { type: 'h2', text: 'The Two Fees on Every Florida Payday Loan' },
      { type: 'p', text: 'Florida law limits payday loan charges to exactly two fees. There are no hidden charges, no prepayment penalties, and no rollover fees. Here is what you will pay:' },
      { type: 'li', text: '10% of the loan amount — the lender\'s fee for providing the loan' },
      { type: 'li', text: '$5.00 verification fee — a flat fee for the mandatory statewide database check' },
      { type: 'h2', text: 'Real-World Fee Examples' },
      { type: 'p', text: 'Here is what the total cost looks like at different loan amounts:' },
      { type: 'li', text: '$100 loan: $10 fee + $5 = $15 total cost. You repay $115.' },
      { type: 'li', text: '$200 loan: $20 fee + $5 = $25 total cost. You repay $225.' },
      { type: 'li', text: '$300 loan: $30 fee + $5 = $35 total cost. You repay $335.' },
      { type: 'li', text: '$400 loan: $40 fee + $5 = $45 total cost. You repay $445.' },
      { type: 'li', text: '$500 loan: $50 fee + $5 = $55 total cost. You repay $555.' },
      { type: 'h2', text: 'What Is the APR on a Florida Payday Loan?' },
      { type: 'p', text: 'You will see a high APR (Annual Percentage Rate) disclosed on your loan documents — often 300% or more. This number can be alarming, but it is important to understand what it means.' },
      { type: 'p', text: 'APR is calculated as if you paid the fee for an entire year. Since payday loans are typically 14-day loans, the annualized rate appears very high. On a $300 loan for 14 days with a $35 fee, the APR is approximately 304%. In dollar terms, you pay $35 — not 304% of $300.' },
      { type: 'p', text: 'Florida law requires lenders to disclose the APR so you can make an informed comparison, not because you will actually pay that annualized rate.' },
      { type: 'h2', text: 'No Rollovers, No Compounding Fees' },
      { type: 'p', text: 'Unlike some states, Florida bans rollovers — the practice of paying a fee to extend the loan without reducing the principal. This means your costs are fixed and transparent from day one. You know exactly what you owe before you sign.' },
      { type: 'h2', text: 'What Happens If You Cannot Repay on Time?' },
      { type: 'p', text: 'Florida law gives you a 60-day grace period if you cannot repay your loan when it is due. To access the grace period, you must contact the lender before the due date and enroll in a payment plan with a state-approved credit counseling agency. No additional fees can be charged during this period.' },
      { type: 'h2', text: 'The Bottom Line on Fees' },
      { type: 'p', text: 'Florida payday loan fees are capped, disclosed upfront, and non-compounding. The total cost of borrowing $500 is $55. While that is significant, it may compare favorably to a bounced check fee, a late utility disconnection fee, or a credit card cash advance with higher effective costs over the same period.' },
    ],
  },
  '5-things-to-know-before-short-term-loan': {
    title: '5 Things to Know Before Taking Out a Short-Term Loan',
    excerpt: 'Before you borrow, make sure you understand these five critical facts about short-term lending in Florida — from repayment terms to grace periods.',
    publishedAt: '2024-02-01T00:00:00Z',
    readingTime: 7,
    category: 'Financial Tips',
    author: { name: 'Sunshine Team', jobTitle: 'Financial Education' },
    content: [
      { type: 'p', text: 'Taking out any loan is a financial commitment. Before you sign a short-term loan agreement in Florida, make sure you understand these five facts that every borrower should know.' },
      { type: 'h2', text: '1. You Can Only Have One Payday Loan at a Time in Florida' },
      { type: 'p', text: 'Florida maintains a statewide database of all active payday loans. Every licensed lender must check this database before issuing a new loan. If you already have an open payday loan with any lender in Florida, you cannot get another one until the first is repaid. This rule protects you from getting trapped in multiple simultaneous high-cost loans.' },
      { type: 'h2', text: '2. The Loan Term Is Short — Plan Accordingly' },
      { type: 'p', text: 'Florida payday loans must be repaid within 7 to 31 days. The due date is typically set to your next payday. Before borrowing, ask yourself: "Will I have enough money on payday to cover my normal expenses AND repay this loan?" If the answer is uncertain, it may not be the right time to borrow.' },
      { type: 'h2', text: '3. Fees Are Fixed — But They Are Real Costs' },
      { type: 'p', text: 'The maximum fee in Florida is 10% of the loan amount plus a $5 verification fee. On a $500 loan, that is $55 in fees. There are no hidden charges or rollovers. Treat the fee as a real cost — because it is. Factor it into your repayment budget before signing.' },
      { type: 'h2', text: '4. You Have a 60-Day Grace Period Option' },
      { type: 'p', text: 'If you cannot repay your loan on the due date, Florida law entitles you to a 60-day grace period — but you must proactively request it. Contact your lender before the due date and arrange to enroll in a credit counseling plan through a state-approved agency. During the grace period, the lender cannot charge additional fees or report you to collections.' },
      { type: 'h2', text: '5. Rollovers Are Illegal in Florida' },
      { type: 'p', text: 'Some states allow lenders to roll over loans — charging you another fee to push the due date back without reducing your principal. Florida prohibits this practice. If a lender offers to "extend" your loan for an additional fee, that is illegal. You should report it to the Florida Office of Financial Regulation.' },
      { type: 'h2', text: 'One Bonus Tip: Verify Your Lender Is Licensed' },
      { type: 'p', text: 'Only borrow from lenders licensed by the Florida Office of Financial Regulation. Licensed lenders are legally bound by all the protections described above. Unlicensed online lenders may not follow Florida law, leaving you without these protections. You can verify a lender\'s license on the OFR\'s public database.' },
    ],
  },
  'borrower-rights-florida-payday-loan': {
    title: 'Your Rights as a Payday Loan Borrower in Florida',
    excerpt: 'Florida law provides strong protections for payday loan borrowers. Learn about the 60-day grace period, the one-loan rule, and how to file a complaint.',
    publishedAt: '2024-02-10T00:00:00Z',
    readingTime: 8,
    category: 'Borrower Rights',
    author: { name: 'Sunshine Team', jobTitle: 'Financial Education' },
    content: [
      { type: 'p', text: 'Florida has enacted some of the strongest payday lending regulations in the United States. As a borrower, you have specific legal rights that every licensed lender must honor. Here is a comprehensive breakdown.' },
      { type: 'h2', text: 'Right 1: Transparent Fees — No Hidden Charges' },
      { type: 'p', text: 'Florida law caps payday loan fees at 10% of the loan amount plus a $5 verification fee. Lenders must disclose the total cost of borrowing in writing before you sign. No additional fees, no processing charges, and no origination fees are permitted.' },
      { type: 'h2', text: 'Right 2: The One-Loan Rule' },
      { type: 'p', text: 'You are legally entitled to have only one active payday loan at a time in Florida. Lenders must check the statewide database before issuing any loan. This prevents lenders from stacking multiple loans on top of each other — a predatory practice common in unregulated states.' },
      { type: 'h2', text: 'Right 3: The 60-Day Grace Period' },
      { type: 'p', text: 'If you cannot repay your loan on the due date, you have the right to request a 60-day grace period. To exercise this right:' },
      { type: 'li', text: 'Contact your lender before the loan\'s due date' },
      { type: 'li', text: 'Request enrollment in a credit counseling plan' },
      { type: 'li', text: 'The lender must refer you to a state-approved credit counseling agency' },
      { type: 'li', text: 'During the 60 days, no additional fees can be charged' },
      { type: 'p', text: 'The grace period allows you to work out a repayment plan with guidance from a credit counselor at no extra cost.' },
      { type: 'h2', text: 'Right 4: No Rollovers' },
      { type: 'p', text: 'Lenders cannot roll over your loan — meaning they cannot charge you another fee to push back the due date while leaving the original principal untouched. If a lender attempts this, they are violating Florida law.' },
      { type: 'h2', text: 'Right 5: No Criminal Action for Non-Payment' },
      { type: 'p', text: 'A lender cannot threaten criminal prosecution if you fail to repay a payday loan. Defaulting on a payday loan is a civil matter — not a criminal one. If a lender threatens arrest or criminal charges, that is an illegal debt collection practice.' },
      { type: 'h2', text: 'Right 6: Right to Rescind' },
      { type: 'p', text: 'You have the right to cancel your payday loan by the end of the following business day after signing — before the lender has deposited or cashed your check. Simply return the full loan amount in cash to the lender and the transaction is cancelled.' },
      { type: 'h2', text: 'How to File a Complaint' },
      { type: 'p', text: 'If a lender violates any of your rights, you can file a complaint with the Florida Office of Financial Regulation (OFR). The OFR investigates complaints against licensed lenders and can take enforcement action including fines and license revocation. Always keep copies of your loan documents.' },
    ],
  },
  'payday-loan-vs-personal-loan': {
    title: 'Payday Loan vs Personal Loan: Which Is Right for You?',
    excerpt: 'Compare payday loans and personal loans side-by-side — loan amounts, approval speed, fees, credit requirements, and when each option makes sense.',
    publishedAt: '2024-02-18T00:00:00Z',
    readingTime: 9,
    category: 'Loan Comparison',
    author: { name: 'Sunshine Team', jobTitle: 'Financial Education' },
    content: [
      { type: 'p', text: 'When you need money quickly, two common options are payday loans and personal loans. They serve different needs, have different costs, and suit different financial situations. Here is an honest, side-by-side comparison.' },
      { type: 'h2', text: 'Loan Amount' },
      { type: 'p', text: 'Payday loans in Florida are capped at $500. Personal loans typically range from $1,000 to $50,000 or more depending on the lender and your creditworthiness. If you need more than $500, a payday loan is not an option.' },
      { type: 'h2', text: 'Credit Requirements' },
      { type: 'p', text: 'Payday loans generally do not require a credit check. Approval is based primarily on your income and having an active bank account. Personal loans almost always require a credit check, and approval and interest rates depend heavily on your credit score.' },
      { type: 'h2', text: 'Speed of Funding' },
      { type: 'p', text: 'Payday loans are among the fastest financing options available — many borrowers receive funds the same day or by the next business day. Personal loans from banks or credit unions may take several days to a week for approval and funding. Some online personal loan lenders advertise same-day or next-day funding.' },
      { type: 'h2', text: 'Cost Comparison' },
      { type: 'p', text: 'A Florida payday loan on $500 costs $55 in fees (10% + $5). Repaid in 14 days, the APR is approximately 287%. A personal loan for $500 at 20% APR for 6 months would cost about $30 in interest total. The personal loan is cheaper — if you qualify and can wait for approval.' },
      { type: 'h2', text: 'Repayment Term' },
      { type: 'p', text: 'Payday loans must be repaid in 7 to 31 days — a very short window. Personal loans are repaid over months or years through fixed monthly installments. If you need longer to repay, a personal loan is a better fit.' },
      { type: 'h2', text: 'When a Payday Loan Makes Sense' },
      { type: 'li', text: 'You need less than $500' },
      { type: 'li', text: 'You need funds today or tomorrow' },
      { type: 'li', text: 'You do not qualify for a personal loan due to poor credit' },
      { type: 'li', text: 'You are certain you can repay in full on your next payday' },
      { type: 'h2', text: 'When a Personal Loan Makes Sense' },
      { type: 'li', text: 'You need more than $500' },
      { type: 'li', text: 'You have good credit and can qualify for a lower rate' },
      { type: 'li', text: 'You need more than 31 days to repay' },
      { type: 'li', text: 'You want predictable monthly payments over time' },
      { type: 'h2', text: 'The Bottom Line' },
      { type: 'p', text: 'Neither option is universally better — it depends on your specific situation. If you have good credit, a personal loan is usually the more affordable option. If you need cash fast for a small amount and have a clear repayment plan, a payday loan may be the practical choice when no better alternative exists.' },
    ],
  },
  'budget-paycheck-to-paycheck': {
    title: 'How to Budget When Living Paycheck to Paycheck',
    excerpt: 'Practical budgeting strategies for Florida workers managing tight monthly finances, including when a short-term loan makes sense as a bridge.',
    publishedAt: '2024-03-01T00:00:00Z',
    readingTime: 6,
    category: 'Financial Tips',
    author: { name: 'Sunshine Team', jobTitle: 'Financial Education' },
    content: [
      { type: 'p', text: 'Living paycheck to paycheck is stressful — but it is more common than many people realize. If your income barely covers your monthly expenses, a structured budget can help you take control and build a small financial cushion over time.' },
      { type: 'h2', text: 'Step 1: Know Your Exact Monthly Numbers' },
      { type: 'p', text: 'Start with two lists: everything you earn each month and everything you spend. Include your net (take-home) pay, any side income, and every regular expense — rent, utilities, groceries, transportation, insurance, and subscriptions. Many people discover they are spending more than they realize on small recurring charges.' },
      { type: 'h2', text: 'Step 2: Separate Fixed and Variable Expenses' },
      { type: 'p', text: 'Fixed expenses (rent, car payment, insurance) stay the same each month. Variable expenses (groceries, gas, entertainment) fluctuate. You can only realistically cut variable expenses in the short term, so focus your attention there first.' },
      { type: 'h2', text: 'Step 3: Apply the 50/30/20 Framework — Loosely' },
      { type: 'p', text: 'The classic budget rule is 50% needs, 30% wants, 20% savings. If you are paycheck to paycheck, this may not be realistic right away. Start with a modified version: 70% needs, 20% wants, 10% savings (or debt repayment). Even saving $20-$50 per paycheck builds a small emergency buffer over time.' },
      { type: 'h2', text: 'Step 4: Build a $500 Emergency Fund First' },
      { type: 'p', text: 'Financial advisors often recommend a 3-6 month emergency fund, but that goal can feel overwhelming when you are living paycheck to paycheck. Start smaller: aim for $500. That amount covers most common emergencies — a car repair, a medical copay, an unexpected utility bill — reducing your need to borrow.' },
      { type: 'h2', text: 'Step 5: Address Recurring Expenses You Can Cut' },
      { type: 'p', text: 'Review all subscriptions and memberships. Cancel anything you do not use weekly. Renegotiate your phone plan. Check if you qualify for lower utility rates through Florida assistance programs. Small cuts ($10-$30 per service) add up to meaningful monthly savings.' },
      { type: 'h2', text: 'When a Short-Term Loan Makes Sense as a Bridge' },
      { type: 'p', text: 'Even with the best budget, unexpected emergencies happen. A short-term loan can be a reasonable bridge when you face a genuine one-time emergency, you have a specific plan to repay on your next payday, and the cost of not acting (a disconnected utility, a towed car) exceeds the loan fee.' },
      { type: 'p', text: 'A short-term loan should never be used to cover regular monthly expenses like rent or groceries — that signals a budget gap that requires a longer-term solution.' },
      { type: 'h2', text: 'Free Resources for Florida Residents' },
      { type: 'p', text: 'Florida residents have access to several free financial resources: 211 Florida connects you to local assistance programs, the Florida Department of Economic Opportunity offers workforce and income support, and credit counseling agencies approved by the Florida OFR offer free or low-cost budgeting help.' },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = BLOG_POSTS[params.slug];
  if (!post) return { title: 'Post Not Found' };
  return generateBlogPostMetadata({
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    slug: { current: params.slug },
    seoTitle: null,
    seoDescription: null,
  });
}

function ContentRenderer({ content }) {
  const elements = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="mb-4 space-y-2 pl-5 list-disc marker:text-[#00A6FB]">
          {listBuffer.map((text, i) => (
            <li key={i} className="text-muted-foreground">{text}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  content.forEach((block, i) => {
    if (block.type === 'li') {
      listBuffer.push(block.text);
    } else {
      flushList();
      if (block.type === 'h2') {
        elements.push(
          <h2 key={i} className="mt-8 mb-4 text-xl font-semibold text-[#0A2540] sm:text-2xl">{block.text}</h2>
        );
      } else if (block.type === 'h3') {
        elements.push(
          <h3 key={i} className="mt-6 mb-3 text-lg font-semibold text-[#0A2540] sm:text-xl">{block.text}</h3>
        );
      } else {
        elements.push(
          <p key={i} className="mb-4 text-foreground leading-relaxed">{block.text}</p>
        );
      }
    }
  });

  flushList();
  return <>{elements}</>;
}

export default function BlogPostPage({ params }) {
  const post = BLOG_POSTS[params.slug];
  if (!post) notFound();

  const articleSchema = generateArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    slug: { current: params.slug },
    author: post.author,
  });
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
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00A6FB]/10 px-3 py-1 text-xs font-semibold text-[#00A6FB]">
                <Tag className="h-3 w-3" />
                {post.category}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#0A2540] sm:text-3xl md:text-4xl">{post.title}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {formatReadingTime(post.readingTime)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
            {/* Article */}
            <article className="lg:col-span-3">
              {/* Excerpt */}
              <p className="mb-8 text-base text-muted-foreground border-l-4 border-[#00A6FB] pl-5 italic sm:text-lg">
                {post.excerpt}
              </p>

              {/* Body */}
              <div className="prose-content">
                <ContentRenderer content={post.content} />
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
                <div className="rounded-xl border border-border p-5">
                  <h3 className="mb-3 text-sm font-semibold text-[#0A2540]">About the Author</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A2540] text-sm font-bold text-white">
                      {post.author.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0A2540]">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">{post.author.jobTitle}</p>
                    </div>
                  </div>
                </div>

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

                {/* More Articles */}
                <div className="rounded-xl border border-border p-5">
                  <h3 className="mb-3 text-sm font-semibold text-[#0A2540]">More Articles</h3>
                  <Link
                    href="/blog"
                    className="text-sm text-[#00A6FB] hover:underline"
                  >
                    View all articles →
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
