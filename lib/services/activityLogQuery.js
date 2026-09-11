import 'server-only';

// Enriches raw AuditLog entries (from .lean()) with a display name for the
// application/contact they belong to. Done as a manual batch lookup rather
// than .populate() so it works cleanly on plain lean objects and only fetches
// the couple of fields actually needed for display.
export async function attachEntityNames(entries) {
  const { Application } = await import('@/models/Application');
  const { Contact } = await import('@/models/Contact');

  const applicationIds = [
    ...new Set(
      entries.filter((e) => e.entityType === 'application' && e.applicationId).map((e) => String(e.applicationId))
    ),
  ];
  const contactIds = [
    ...new Set(entries.filter((e) => e.entityType === 'contact' && e.contactId).map((e) => String(e.contactId))),
  ];

  const [applications, contacts] = await Promise.all([
    applicationIds.length
      ? Application.find({ _id: { $in: applicationIds } }).select('firstName lastName').lean()
      : [],
    contactIds.length ? Contact.find({ _id: { $in: contactIds } }).select('name').lean() : [],
  ]);

  const applicationNameMap = new Map(applications.map((a) => [String(a._id), `${a.firstName} ${a.lastName}`]));
  const contactNameMap = new Map(contacts.map((c) => [String(c._id), c.name]));

  return entries.map((entry) => ({
    ...entry,
    entityName:
      entry.entityType === 'contact'
        ? contactNameMap.get(String(entry.contactId)) || null
        : applicationNameMap.get(String(entry.applicationId)) || null,
  }));
}
