import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function seed() {
  console.log('🌱 Seeding database...');

  // Seed Blog Categories
  console.log('  Creating blog categories...');
  await db
    .insert(schema.blogCategories)
    .values([
      {
        name: 'Payday Loan Basics',
        slug: 'payday-loan-basics',
        description: 'Learn the fundamentals of payday loans in Florida',
      },
      {
        name: 'Borrower Rights',
        slug: 'borrower-rights',
        description: 'Know your rights as a payday loan borrower in Florida',
      },
      {
        name: 'Financial Tips',
        slug: 'financial-tips',
        description: 'Practical financial advice for Florida residents',
      },
      {
        name: 'Loan Comparison',
        slug: 'loan-comparison',
        description: 'Compare different loan types and options',
      },
    ])
    .onConflictDoNothing();

  // Seed Testimonials
  console.log('  Creating testimonials...');
  await db
    .insert(schema.testimonials)
    .values([
      {
        name: 'Maria S.',
        location: 'Miami, FL',
        rating: 5,
        content:
          'Sunshine Micro Lending was incredibly transparent about all fees upfront. No hidden charges, exactly what they promised. Got my funds quickly and the repayment process was simple.',
        loanAmount: '300.00',
        isApproved: true,
        isFeatured: true,
      },
      {
        name: 'James T.',
        location: 'Orlando, FL',
        rating: 5,
        content:
          "I needed help covering a car repair and Sunshine came through. The application was straightforward and I appreciated that they explained my rights as a borrower clearly.",
        loanAmount: '500.00',
        isApproved: true,
        isFeatured: true,
      },
      {
        name: 'Rosa M.',
        location: 'Tampa, FL',
        rating: 5,
        content:
          'Professional service from start to finish. The 60-day grace period policy shows they actually care about borrowers. Would use again if needed.',
        loanAmount: '200.00',
        isApproved: true,
        isFeatured: true,
      },
      {
        name: 'David K.',
        location: 'Jacksonville, FL',
        rating: 5,
        content:
          'Quick, easy, and honest. The fee structure was explained clearly and there were no surprises. Exactly the short-term help I needed.',
        loanAmount: '400.00',
        isApproved: true,
        isFeatured: false,
      },
      {
        name: 'Angela R.',
        location: 'Fort Lauderdale, FL',
        rating: 5,
        content:
          'Sunshine Micro Lending treats you with respect. No aggressive tactics, no pressure. Just a clear loan process that helped me through a tough month.',
        loanAmount: '250.00',
        isApproved: true,
        isFeatured: false,
      },
    ])
    .onConflictDoNothing();

  // Seed Site Settings
  console.log('  Creating site settings...');
  await db
    .insert(schema.siteSettings)
    .values([
      {
        key: 'max_loan_amount',
        value: 500,
        description: 'Maximum loan amount in USD',
      },
      {
        key: 'min_loan_amount',
        value: 100,
        description: 'Minimum loan amount in USD',
      },
      {
        key: 'fee_percentage',
        value: 10,
        description: 'Fee percentage of loan amount',
      },
      {
        key: 'verification_fee',
        value: 5,
        description: 'Fixed verification fee in USD',
      },
      {
        key: 'single_payment_term_min',
        value: 7,
        description: 'Minimum days for single payment loan',
      },
      {
        key: 'single_payment_term_max',
        value: 31,
        description: 'Maximum days for single payment loan',
      },
      {
        key: 'installment_term_min',
        value: 60,
        description: 'Minimum days for installment loan',
      },
      {
        key: 'installment_term_max',
        value: 90,
        description: 'Maximum days for installment loan',
      },
      {
        key: 'grace_period_days',
        value: 60,
        description: 'Grace period days with no additional fees',
      },
      {
        key: 'applications_open',
        value: true,
        description: 'Whether loan applications are currently being accepted',
      },
    ])
    .onConflictDoNothing();

  console.log('✅ Database seeded successfully!');
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  process.exit(1);
});
