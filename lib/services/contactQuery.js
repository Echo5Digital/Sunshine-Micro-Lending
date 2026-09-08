import 'server-only';

const SORTABLE_FIELDS = new Set(['createdAt', 'resolvedAt']);

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Mirrors lib/services/applicationQuery.js — shared filter-building logic
// for the Messages list route.
export function buildContactFilter({ status, search, dateFrom, dateTo }) {
  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (search) {
    const safe = escapeRegex(search.trim());
    if (safe) {
      const regex = new RegExp(safe, 'i');
      filter.$or = [{ name: regex }, { email: regex }, { subject: regex }];
    }
  }

  if (dateFrom || dateTo) {
    filter.createdAt = {};
    if (dateFrom) {
      const from = new Date(dateFrom);
      if (!Number.isNaN(from.getTime())) {
        filter.createdAt.$gte = from;
      }
    }
    if (dateTo) {
      const to = new Date(dateTo);
      if (!Number.isNaN(to.getTime())) {
        filter.createdAt.$lte = to;
      }
    }
    if (Object.keys(filter.createdAt).length === 0) {
      delete filter.createdAt;
    }
  }

  return filter;
}

export function buildContactSort(sortParam) {
  if (!sortParam) {
    return { createdAt: -1 };
  }

  const [field, direction] = sortParam.split(':');
  if (!SORTABLE_FIELDS.has(field)) {
    return { createdAt: -1 };
  }

  return { [field]: direction === 'asc' ? 1 : -1 };
}
