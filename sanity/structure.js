import { StructureBuilder } from 'sanity/structure';

export const structure = (S) =>
  S.list()
    .title('Sunshine Micro Lending CMS')
    .items([
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('All Posts')
                .schemaType('post')
                .child(S.documentTypeList('post').title('All Posts')),
              S.listItem()
                .title('Categories')
                .schemaType('category')
                .child(S.documentTypeList('category').title('Categories')),
              S.listItem()
                .title('Authors')
                .schemaType('author')
                .child(S.documentTypeList('author').title('Authors')),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.listItem()
                .title('FAQs')
                .schemaType('faq')
                .child(S.documentTypeList('faq').title('FAQs')),
              S.listItem()
                .title('Testimonials')
                .schemaType('testimonial')
                .child(S.documentTypeList('testimonial').title('Testimonials')),
              S.listItem()
                .title('Loan Products')
                .schemaType('loanProduct')
                .child(S.documentTypeList('loanProduct').title('Loan Products')),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Site Settings')
                .child(
                  S.document().schemaType('siteSettings').documentId('siteSettings')
                ),
              S.listItem()
                .title('SEO Settings')
                .child(
                  S.document().schemaType('seoSettings').documentId('seoSettings')
                ),
            ])
        ),
    ]);
