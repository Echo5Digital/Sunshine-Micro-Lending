import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTASection } from '@/components/sections/CTASection';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateFaqPageSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata = generatePageMetadata({
  title: 'Payday Loan FAQ | Florida Borrower Questions Answered',
  description:
    'Answers to 20+ common questions about Florida payday loans. Learn about fees, eligibility, repayment, grace periods, and your rights as a Florida borrower.',
  path: '/faq',
  keywords: ['payday loan FAQ Florida', 'payday loan questions', 'Florida payday loan rules', 'borrower FAQ'],
});

const FAQ_CATEGORIES = {
  general: 'General',
  application: 'Application',
  repayment: 'Repayment',
  'fees-rates': 'Fees & Rates',
  eligibility: 'Eligibility',
  'legal-rights': 'Legal & Rights',
};

const FAQS = [
  // General
  {
    category: 'general',
    question: 'What is a payday loan and how does it work in Florida?',
    answer: 'A payday loan is a short-term, small-dollar loan typically repaid on your next payday. In Florida, payday loans are regulated by Florida Statute 560.404 and licensed by the Office of Financial Regulation (OFR). Sunshine Micro Lending offers loans from $100 to $500 with a 10% fee plus a $5 verification fee. You apply online, get verified, and if approved, repay the loan (plus fees) on your agreed repayment date—7 to 31 days for single payment loans.',
  },
  {
    category: 'general',
    question: 'Is Sunshine Micro Lending a licensed payday lender?',
    answer: 'Yes. Sunshine Micro Lending is a Florida-licensed deferred presentment provider regulated by the Florida Office of Financial Regulation (OFR). All our loans comply with Florida Statute 560 and the Florida Deferred Presentment Act. You can verify our license at flofr.com.',
  },
  {
    category: 'general',
    question: 'What states do you lend in?',
    answer: 'We currently lend exclusively to Florida residents. This means you must live in Florida to be eligible for a loan from Sunshine Micro Lending. We do not accept applications from residents of other states at this time.',
  },
  {
    category: 'general',
    question: 'Is this an online-only lender?',
    answer: 'Yes. Sunshine Micro Lending operates entirely online. There are no physical branch locations to visit. Everything—from your application to signing your loan agreement to managing your repayment—is done securely through our website.',
  },
  // Eligibility
  {
    category: 'eligibility',
    question: 'Who is eligible to apply for a payday loan?',
    answer: 'To qualify, you must: (1) Be 18 years of age or older, (2) Be a resident of Florida, (3) Have an active checking account in your name, (4) Have a verifiable source of income, (5) Not currently have an outstanding payday loan with any Florida lender, and (6) Have waited at least 24 hours since repaying your last payday loan.',
  },
  {
    category: 'eligibility',
    question: 'Can I apply if I have bad credit?',
    answer: 'We do not use traditional credit bureau scoring as the primary factor in our lending decisions. However, Florida law requires us to check the statewide payday loan database to verify you do not have an existing active payday loan. Our ability to approve your application depends on several factors including your income, employment status, and banking history.',
  },
  {
    category: 'eligibility',
    question: 'Can I have more than one payday loan at a time?',
    answer: 'No. Florida law (Statute 560.404) strictly prohibits borrowers from having more than one outstanding payday loan at a time from any Florida licensed lender. Before approving any application, we are required by law to check the statewide database to confirm you do not have an active loan. If you do, we cannot legally approve your application.',
  },
  {
    category: 'eligibility',
    question: 'Is there a cooling-off period after I repay a loan?',
    answer: 'Yes. Florida law requires a 24-hour cooling-off period after you repay a payday loan before you can take out another one. If you have taken out three consecutive loans, there is a 24-hour waiting period plus you must attend a credit counseling session before taking a fourth loan.',
  },
  // Application
  {
    category: 'application',
    question: 'What information do I need to apply?',
    answer: 'You will need: your full legal name, address, email, and phone number; proof of income (employment details or income source); your checking account and bank routing numbers; a valid government-issued ID; your Social Security Number (for identity verification); and your desired loan amount.',
  },
  {
    category: 'application',
    question: 'How long does the application take?',
    answer: 'The online application typically takes 5–10 minutes to complete. Once submitted, we begin processing immediately during business hours (Monday–Friday, 9AM–5PM EST). You will receive a lending decision as quickly as possible.',
  },
  {
    category: 'application',
    question: 'Is my application information secure?',
    answer: 'Yes. We use bank-level 256-bit SSL encryption to protect all data transmitted through our website. Your personal and financial information is never sold to third parties. We collect only the information required to process your loan application under Florida law.',
  },
  {
    category: 'application',
    question: 'What happens after I submit my application?',
    answer: 'After submitting, you will receive an email confirmation. Our team will review your application, verify your information (including checking the Florida statewide database), and notify you of a lending decision. If approved, you will receive your loan agreement showing the exact terms, fees, and repayment date before any commitment.',
  },
  // Fees & Rates
  {
    category: 'fees-rates',
    question: 'What is the fee for a payday loan?',
    answer: 'Our fee structure is simple and transparent: 10% of the loan amount plus a $5 verification fee. For example: a $200 loan costs $25 in fees (total repayment: $225). A $300 loan costs $35 in fees (total repayment: $335). A $500 loan costs $55 in fees (total repayment: $555). There are no other charges.',
  },
  {
    category: 'fees-rates',
    question: 'Why is the APR so high on a payday loan?',
    answer: 'APR (Annual Percentage Rate) is a standardized way to express borrowing cost across a full year. Because payday loans are extremely short-term (7–31 days), the APR calculation amplifies even small fees dramatically. The actual dollar cost of a $300 loan is fixed at $35—the APR is just a mathematical way to compare across different loan types. Florida law requires us to disclose APR.',
  },
  {
    category: 'fees-rates',
    question: 'Are there any hidden fees?',
    answer: 'No. There are absolutely no hidden fees. The only charges are the 10% loan fee and the $5 verification fee. There are no application fees, origination fees, prepayment penalties, or late fees during the grace period. Everything is disclosed upfront in your loan agreement before you sign.',
  },
  {
    category: 'fees-rates',
    question: 'What is the verification fee for?',
    answer: 'The $5 verification fee covers the cost of checking the Florida statewide payday loan database, which is required by law before approving any loan. This ensures you are not currently indebted to another Florida payday lender and protects both you and us.',
  },
  // Repayment
  {
    category: 'repayment',
    question: 'How do I repay my loan?',
    answer: 'Your repayment is made via ACH (Automated Clearing House) debit from your checking account on the agreed repayment date specified in your loan agreement. You authorize this when you sign your loan documents. The exact repayment amount (principal plus fees) is deducted automatically.',
  },
  {
    category: 'repayment',
    question: 'Can I repay my loan early?',
    answer: 'Yes. You may repay your loan in full at any time before the due date. There are no prepayment penalties of any kind. Early repayment does not reduce the fees (fees are charged at origination), but you will avoid any potential issues with payment collection.',
  },
  {
    category: 'repayment',
    question: 'What is the 60-day grace period?',
    answer: 'If you cannot repay your loan on the due date, Florida law requires us to offer a 60-day grace period at no additional cost—no extra fees, no penalty interest. To use the grace period, you must request it before the due date, and you must enroll in and complete a consumer credit counseling program during the 60 days. Contact us as soon as you know you may need more time.',
  },
  {
    category: 'repayment',
    question: 'Can my loan be rolled over or extended?',
    answer: 'No. Florida law expressly prohibits loan rollovers, renewals, and extensions on payday loans. This protects borrowers from getting trapped in a cycle of debt. If you cannot repay on time, the only option provided by law is the 60-day grace period. We encourage you to contact us immediately if you anticipate repayment difficulties.',
  },
  // Legal Rights
  {
    category: 'legal-rights',
    question: 'What are my rights as a payday loan borrower in Florida?',
    answer: 'As a Florida payday loan borrower, you have the right to: a clear written loan agreement before signing; a 60-day grace period if you cannot repay; no rollovers or renewals; have only one active loan at a time enforced by law; file a complaint with the Florida OFR; a 24-hour rescission period in some cases; and be treated with dignity and respect. Visit our Borrower Rights page for the full overview.',
  },
  {
    category: 'legal-rights',
    question: 'How do I file a complaint against a payday lender?',
    answer: 'If you have a complaint about a Florida payday lender (including us), you can contact the Florida Office of Financial Regulation (OFR) at 1-850-487-9687 or file a complaint online at flofr.gov. You can also contact the Consumer Financial Protection Bureau (CFPB) at consumerfinance.gov/complaint or call 1-855-411-2372.',
  },
  {
    category: 'legal-rights',
    question: 'What is the Florida statewide payday loan database?',
    answer: 'Florida maintains a statewide database of all outstanding payday loans issued by licensed Florida lenders. This database prevents any borrower from having more than one active payday loan at a time. Every licensed lender must check this database before approving a loan and report every new loan to the database. This is a consumer protection measure.',
  },
];

export default function FAQPage() {
  const breadcrumbs = [{ name: 'FAQ', href: '/faq' }];
  const faqSchema = generateFaqPageSchema(FAQS);
  const bSchema = generateBreadcrumbSchema([{ name: 'Home', href: '/' }, ...breadcrumbs]);

  // Group FAQs by category
  const grouped = {};
  FAQS.forEach((faq) => {
    if (!grouped[faq.category]) {
      grouped[faq.category] = [];
    }
    grouped[faq.category].push(faq);
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }} />

      {/* Hero */}
      <section className="bg-[#F8FAFC] py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          <div className="max-w-3xl">
            <span className="section-label mb-4">Expert Answers</span>
            <h1 className="mt-4 text-4xl font-bold text-[#0A2540] md:text-5xl">
              Florida Payday Loan FAQ
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Straightforward answers to every question Florida borrowers ask about payday loans,
              fees, repayment, and their legal rights.
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="border-b border-border bg-white py-4 sticky top-[4rem] z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {Object.entries(FAQ_CATEGORIES).map(([key, label]) => (
              <a
                key={key}
                href={`#${key}`}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-[#00A6FB] hover:text-[#00A6FB]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs by Category */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-14">
            {Object.entries(grouped).map(([categoryKey, faqs]) => (
              <div key={categoryKey} id={categoryKey}>
                <h2 className="mb-6 text-xl font-semibold text-[#0A2540] border-b border-border pb-3">
                  {FAQ_CATEGORIES[categoryKey]}
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`${categoryKey}-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions? */}
      <section className="bg-[#F8FAFC] py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-3 text-2xl font-semibold text-[#0A2540]">Still Have Questions?</h2>
          <p className="mb-6 text-muted-foreground">
            Our team is available Monday–Friday, 9AM–5PM EST.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" className="btn-secondary text-sm">Contact Us</Link>
            <Link href="/borrower-rights" className="btn-outline text-sm">Borrower Rights</Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
