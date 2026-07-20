import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'loanProduct',
  title: 'Loan Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Loan Type',
      type: 'string',
      options: {
        list: [
          { title: 'Single Payment Loan', value: 'single_payment' },
          { title: 'Installment Loan', value: 'installment' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'minAmount',
      title: 'Minimum Amount ($)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'maxAmount',
      title: 'Maximum Amount ($)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(500),
    }),
    defineField({
      name: 'termMin',
      title: 'Minimum Term (days)',
      type: 'number',
    }),
    defineField({
      name: 'termMax',
      title: 'Maximum Term (days)',
      type: 'number',
    }),
    defineField({
      name: 'feePercentage',
      title: 'Fee Percentage',
      type: 'number',
      description: 'As a decimal, e.g. 10 for 10%',
    }),
    defineField({
      name: 'verificationFee',
      title: 'Verification Fee ($)',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'eligibility',
      title: 'Eligibility Requirements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isActive',
      title: 'Active Product',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
    },
  },
});
