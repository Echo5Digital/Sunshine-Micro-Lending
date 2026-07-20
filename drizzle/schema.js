import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  decimal,
  boolean,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ─── Enums ───────────────────────────────────────────────────────────────────
export const applicationStatusEnum = pgEnum('application_status', [
  'pending',
  'reviewing',
  'approved',
  'denied',
  'withdrawn',
]);

export const employmentStatusEnum = pgEnum('employment_status', [
  'employed_full_time',
  'employed_part_time',
  'self_employed',
  'unemployed',
  'retired',
  'disability',
]);

export const payFrequencyEnum = pgEnum('pay_frequency', [
  'weekly',
  'biweekly',
  'semimonthly',
  'monthly',
]);

export const loanTypeEnum = pgEnum('loan_type', ['single_payment', 'installment']);

export const contactStatusEnum = pgEnum('contact_status', [
  'new',
  'in_progress',
  'resolved',
  'closed',
]);

export const auditActionEnum = pgEnum('audit_action', [
  'create',
  'update',
  'delete',
  'view',
  'export',
  'login',
  'logout',
]);

// ─── Applications Table ───────────────────────────────────────────────────────
export const applications = pgTable(
  'applications',
  {
    id: serial('id').primaryKey(),
    // Personal Information
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    // Loan Information
    loanAmount: decimal('loan_amount', { precision: 10, scale: 2 }).notNull(),
    loanType: loanTypeEnum('loan_type').notNull().default('single_payment'),
    loanPurpose: text('loan_purpose'),
    // Employment
    employmentStatus: employmentStatusEnum('employment_status').notNull(),
    payFrequency: payFrequencyEnum('pay_frequency').notNull(),
    monthlyIncome: decimal('monthly_income', { precision: 10, scale: 2 }),
    employer: varchar('employer', { length: 200 }),
    // Banking
    hasBankAccount: boolean('has_bank_account').notNull().default(false),
    bankName: varchar('bank_name', { length: 200 }),
    // Application Status
    status: applicationStatusEnum('status').notNull().default('pending'),
    internalNotes: text('internal_notes'),
    // Consent & Compliance
    consentGiven: boolean('consent_given').notNull().default(false),
    consentTimestamp: timestamp('consent_timestamp', { withTimezone: true }),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: text('user_agent'),
    // Fees
    estimatedFee: decimal('estimated_fee', { precision: 10, scale: 2 }),
    verificationFee: decimal('verification_fee', { precision: 10, scale: 2 }).default('5.00'),
    // Timestamps
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
    // Reference
    referenceNumber: varchar('reference_number', { length: 20 }).unique(),
    utmSource: varchar('utm_source', { length: 100 }),
    utmMedium: varchar('utm_medium', { length: 100 }),
    utmCampaign: varchar('utm_campaign', { length: 200 }),
  },
  (table) => ({
    emailIdx: index('applications_email_idx').on(table.email),
    statusIdx: index('applications_status_idx').on(table.status),
    createdAtIdx: index('applications_created_at_idx').on(table.createdAt),
    referenceIdx: uniqueIndex('applications_reference_idx').on(table.referenceNumber),
  })
);

// ─── Contacts Table ───────────────────────────────────────────────────────────
export const contacts = pgTable(
  'contacts',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 200 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }),
    subject: varchar('subject', { length: 300 }).notNull(),
    message: text('message').notNull(),
    status: contactStatusEnum('status').notNull().default('new'),
    ipAddress: varchar('ip_address', { length: 45 }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    resolvedAt: timestamp('resolved_at', { withTimezone: true }),
    internalNotes: text('internal_notes'),
  },
  (table) => ({
    emailIdx: index('contacts_email_idx').on(table.email),
    statusIdx: index('contacts_status_idx').on(table.status),
    createdAtIdx: index('contacts_created_at_idx').on(table.createdAt),
  })
);

// ─── Newsletter Subscribers Table ─────────────────────────────────────────────
export const newsletterSubscribers = pgTable(
  'newsletter_subscribers',
  {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    firstName: varchar('first_name', { length: 100 }),
    isActive: boolean('is_active').notNull().default(true),
    source: varchar('source', { length: 100 }).default('website'),
    subscribedAt: timestamp('subscribed_at', { withTimezone: true }).notNull().defaultNow(),
    unsubscribedAt: timestamp('unsubscribed_at', { withTimezone: true }),
    ipAddress: varchar('ip_address', { length: 45 }),
  },
  (table) => ({
    emailIdx: uniqueIndex('newsletter_email_idx').on(table.email),
    isActiveIdx: index('newsletter_active_idx').on(table.isActive),
  })
);

// ─── Blog Posts Table (DB mirror for Sanity content) ─────────────────────────
export const blogPosts = pgTable(
  'blog_posts',
  {
    id: serial('id').primaryKey(),
    sanityId: varchar('sanity_id', { length: 100 }).unique(),
    slug: varchar('slug', { length: 300 }).notNull().unique(),
    title: text('title').notNull(),
    excerpt: text('excerpt'),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    categoryId: integer('category_id'),
    isPublished: boolean('is_published').notNull().default(false),
    viewCount: integer('view_count').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    slugIdx: uniqueIndex('blog_posts_slug_idx').on(table.slug),
    publishedIdx: index('blog_posts_published_idx').on(table.isPublished, table.publishedAt),
    categoryIdx: index('blog_posts_category_idx').on(table.categoryId),
  })
);

// ─── Blog Categories Table ────────────────────────────────────────────────────
export const blogCategories = pgTable(
  'blog_categories',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    description: text('description'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    slugIdx: uniqueIndex('blog_categories_slug_idx').on(table.slug),
  })
);

// ─── Testimonials Table ───────────────────────────────────────────────────────
export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  location: varchar('location', { length: 100 }),
  rating: integer('rating').notNull().default(5),
  content: text('content').notNull(),
  loanAmount: decimal('loan_amount', { precision: 10, scale: 2 }),
  isApproved: boolean('is_approved').notNull().default(false),
  isFeatured: boolean('is_featured').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// ─── Site Settings Table ──────────────────────────────────────────────────────
export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 100 }).notNull().unique(),
  value: jsonb('value'),
  description: text('description'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ─── Audit Logs Table ─────────────────────────────────────────────────────────
export const auditLogs = pgTable(
  'audit_logs',
  {
    id: serial('id').primaryKey(),
    action: auditActionEnum('action').notNull(),
    entityType: varchar('entity_type', { length: 100 }).notNull(),
    entityId: varchar('entity_id', { length: 100 }),
    previousData: jsonb('previous_data'),
    newData: jsonb('new_data'),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: text('user_agent'),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    entityIdx: index('audit_logs_entity_idx').on(table.entityType, table.entityId),
    actionIdx: index('audit_logs_action_idx').on(table.action),
    createdAtIdx: index('audit_logs_created_at_idx').on(table.createdAt),
  })
);

// ─── Relations ────────────────────────────────────────────────────────────────
export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  category: one(blogCategories, {
    fields: [blogPosts.categoryId],
    references: [blogCategories.id],
  }),
}));

export const blogCategoriesRelations = relations(blogCategories, ({ many }) => ({
  posts: many(blogPosts),
}));
