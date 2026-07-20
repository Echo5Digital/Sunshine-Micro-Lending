/**
 * @fileoverview Shared type definitions (JSDoc)
 * Since this project uses JavaScript (not TypeScript), types are documented
 * here as JSDoc for IDE support and documentation purposes.
 */

/**
 * @typedef {Object} LoanCalculation
 * @property {number} principal - The loan principal amount
 * @property {number} percentFee - The 10% fee on principal
 * @property {number} verificationFee - The $5 verification fee
 * @property {number} totalFee - Total fees (percentFee + verificationFee)
 * @property {number} totalRepayment - Total amount to repay (principal + totalFee)
 */

/**
 * @typedef {Object} ApplicationData
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} phone
 * @property {number} loanAmount
 * @property {'single_payment'|'installment'} loanType
 * @property {'weekly'|'biweekly'|'semimonthly'|'monthly'} payFrequency
 * @property {string} employmentStatus
 * @property {boolean} hasBankAccount
 * @property {boolean} consentGiven
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} _id
 * @property {string} title
 * @property {{current: string}} slug
 * @property {string} excerpt
 * @property {string} [publishedAt]
 * @property {number} [readingTime]
 * @property {Author} [author]
 * @property {Category[]} [categories]
 * @property {SanityImage} [mainImage]
 */

/**
 * @typedef {Object} Author
 * @property {string} name
 * @property {string} [jobTitle]
 * @property {string} [bio]
 * @property {SanityImage} [image]
 */

/**
 * @typedef {Object} Category
 * @property {string} _id
 * @property {string} title
 * @property {{current: string}} slug
 * @property {string} [color]
 */

/**
 * @typedef {Object} FAQ
 * @property {string} _id
 * @property {string} question
 * @property {string} answer
 * @property {string} category
 * @property {number} [order]
 * @property {boolean} [isFeatured]
 */

/**
 * @typedef {Object} Testimonial
 * @property {string} _id
 * @property {string} name
 * @property {string} [location]
 * @property {number} rating
 * @property {string} content
 * @property {number} [loanAmount]
 */

/**
 * @typedef {Object} SanityImage
 * @property {{url: string, metadata: Object}} [asset]
 * @property {string} [alt]
 * @property {string} [caption]
 */

/**
 * @typedef {Object} BreadcrumbItem
 * @property {string} name
 * @property {string} [href]
 */

export {};
