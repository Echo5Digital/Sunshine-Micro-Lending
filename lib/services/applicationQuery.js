import 'server-only';

const SORTABLE_FIELDS = new Set(['createdAt', 'loanAmount', 'nextPayDate', 'statusChangedAt']);

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Shared filter-building logic used by both the admin list route and the
// CSV export route, so query semantics never drift apart between them.
export function buildApplicationFilter({ status, search, dateFrom, dateTo, assignedTo }) {
  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (assignedTo) {
    filter.assignedTo = assignedTo;
  }

  if (search) {
    const safe = escapeRegex(search.trim());
    if (safe) {
      const regex = new RegExp(safe, 'i');
      filter.$or = [{ firstName: regex }, { lastName: regex }, { email: regex }, { phone: regex }];
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

export function buildApplicationSort(sortParam) {
  if (!sortParam) {
    return { createdAt: -1 };
  }

  const [field, direction] = sortParam.split(':');
  if (!SORTABLE_FIELDS.has(field)) {
    return { createdAt: -1 };
  }

  return { [field]: direction === 'asc' ? 1 : -1 };
}
