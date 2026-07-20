import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Global SEO Settings',
      readOnly: true,
    }),
    defineField({
      name: 'defaultTitle',
      title: 'Default Site Title',
      type: 'string',
    }),
    defineField({
      name: 'defaultDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'defaultImage',
      title: 'Default OG Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'twitterHandle',
      title: 'Twitter Handle',
      type: 'string',
    }),
    defineField({
      name: 'googleVerification',
      title: 'Google Search Console Verification',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'SEO Settings' };
    },
  },
});
