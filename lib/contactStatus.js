export const CONTACT_STATUS_OPTIONS = [
  { value: 'new', label: 'New', badgeVariant: 'default' },
  { value: 'in_progress', label: 'In Progress', badgeVariant: 'warning' },
  { value: 'resolved', label: 'Resolved', badgeVariant: 'success' },
  { value: 'closed', label: 'Closed', badgeVariant: 'muted' },
];

const STATUS_MAP = new Map(CONTACT_STATUS_OPTIONS.map((o) => [o.value, o]));

export function getContactStatusLabel(status) {
  return STATUS_MAP.get(status)?.label || status;
}

export function getContactStatusBadgeVariant(status) {
  return STATUS_MAP.get(status)?.badgeVariant || 'muted';
}
