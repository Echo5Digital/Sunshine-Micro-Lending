import { client } from './client';

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export async function getAllPosts(limit = 20) {
  return client.fetch(
    `*[_type == "post" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      isFeatured,
      readingTime,
      mainImage {
        asset->{ _id, url, metadata { dimensions } },
        alt
      },
      author->{ name, image { asset->{ url } }, jobTitle },
      categories[]->{ title, slug, color }
    }`,
    { limit: limit - 1 }
  );
}

export async function getPostBySlug(slug) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      body,
      publishedAt,
      readingTime,
      isFeatured,
      seoTitle,
      seoDescription,
      canonicalUrl,
      noIndex,
      mainImage {
        asset->{ _id, url, metadata { dimensions, lqip } },
        alt,
        caption
      },
      author->{
        name,
        bio,
        jobTitle,
        credentials,
        image { asset->{ url } }
      },
      categories[]->{ title, slug, color },
      tags,
      "relatedPosts": relatedPosts[]->{
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage { asset->{ url }, alt }
      }
    }`,
    { slug }
  );
}

export async function getPostsByCategory(categorySlug, limit = 10) {
  return client.fetch(
    `*[_type == "post" && references(*[_type == "category" && slug.current == $categorySlug]._id) && defined(publishedAt)] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readingTime,
      mainImage { asset->{ url }, alt },
      author->{ name },
      categories[]->{ title, slug }
    }`,
    { categorySlug, limit: limit - 1 }
  );
}

export async function getFeaturedPost() {
  return client.fetch(
    `*[_type == "post" && isFeatured == true && defined(publishedAt)] | order(publishedAt desc)[0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readingTime,
      mainImage { asset->{ url, metadata { dimensions } }, alt },
      author->{ name, image { asset->{ url } } },
      categories[]->{ title, slug }
    }`
  );
}

export async function getAllPostSlugs() {
  return client.fetch(
    `*[_type == "post" && defined(publishedAt) && defined(slug)] { "slug": slug.current }`
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────
export async function getAllCategories() {
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      color,
      "postCount": count(*[_type == "post" && references(^._id)])
    }`
  );
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────
export async function getAllFaqs() {
  return client.fetch(
    `*[_type == "faq" && isPublished == true] | order(category asc, order asc) {
      _id,
      question,
      answer,
      category,
      order,
      isFeatured
    }`
  );
}

export async function getFeaturedFaqs(limit = 6) {
  return client.fetch(
    `*[_type == "faq" && isFeatured == true && isPublished == true] | order(order asc)[0...$limit] {
      _id,
      question,
      answer,
      category
    }`,
    { limit: limit - 1 }
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export async function getTestimonials(featuredOnly = false) {
  const filter = featuredOnly
    ? `*[_type == "testimonial" && isApproved == true && isFeatured == true]`
    : `*[_type == "testimonial" && isApproved == true]`;

  return client.fetch(
    `${filter} | order(_createdAt desc) {
      _id,
      name,
      location,
      rating,
      content,
      loanAmount
    }`
  );
}

// ─── Loan Products ────────────────────────────────────────────────────────────
export async function getLoanProducts() {
  return client.fetch(
    `*[_type == "loanProduct" && isActive == true] | order(type asc) {
      _id,
      name,
      type,
      minAmount,
      maxAmount,
      termMin,
      termMax,
      feePercentage,
      verificationFee,
      description,
      features,
      eligibility
    }`
  );
}

// ─── Site Settings ────────────────────────────────────────────────────────────
export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      title,
      tagline,
      phone,
      email,
      address,
      businessHours,
      socialLinks,
      footerText,
      licenseNumber,
      announcementBar
    }`
  );
}
