export const STATUS_OPTIONS = [
  { value: 'new', label: 'New', badgeVariant: 'default' },
  { value: 'under_review', label: 'Under Review', badgeVariant: 'warning' },
  { value: 'veritec_check_pending', label: 'Veritec Check Pending', badgeVariant: 'warning' },
  { value: 'veritec_cleared', label: 'Veritec Cleared', badgeVariant: 'success' },
  { value: 'approved', label: 'Approved', badgeVariant: 'success' },
  { value: 'declined', label: 'Declined', badgeVariant: 'destructive' },
  { value: 'funded', label: 'Funded', badgeVariant: 'success' },
  { value: 'repaid', label: 'Repaid', badgeVariant: 'success' },
  { value: 'past_due', label: 'Past Due', badgeVariant: 'destructive' },
];

const STATUS_MAP = new Map(STATUS_OPTIONS.map((o) => [o.value, o]));

export function getStatusLabel(status) {
  return STATUS_MAP.get(status)?.label || status;
}

export function getStatusBadgeVariant(status) {
  return STATUS_MAP.get(status)?.badgeVariant || 'muted';
}
