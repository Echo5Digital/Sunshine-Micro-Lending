// ─── Feature Flags ─────────────────────────────────────────────────────────────
// Flip these without a redeploy where noted (env-driven), or edit + redeploy otherwise.

// When true, the application form's confirmation message and emails say the
// service is "launching soon" instead of implying a loan is being processed.
// Set NEXT_PUBLIC_LAUNCHING_SOON=false in the environment to flip live once the
// lender is licensed and actually processing applications.
export const LAUNCHING_SOON = process.env.NEXT_PUBLIC_LAUNCHING_SOON !== 'false';
