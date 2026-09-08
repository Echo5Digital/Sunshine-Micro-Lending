// One-off, idempotent migration: maps the old Application.status enum values
// to the new manual-review workflow enum. Safe to re-run.
//
// Usage: node --env-file=.env.local scripts/migrate-application-status.mjs
/* eslint-disable no-console -- CLI script: progress output is the intended purpose */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not set.');
  process.exit(1);
}

const STATUS_MAP = {
  pending: 'new',
  reviewing: 'under_review',
  approved: 'approved',
  denied: 'declined',
  withdrawn: 'declined',
};

async function main() {
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  const db = mongoose.connection.db;
  const collection = db.collection('applications');

  console.log('Connected. Scanning for applications with legacy status values...\n');

  let totalUpdated = 0;

  for (const [oldStatus, newStatus] of Object.entries(STATUS_MAP)) {
    if (oldStatus === newStatus) {
      continue;
    }
    const result = await collection.updateMany(
      { status: oldStatus },
      { $set: { status: newStatus } }
    );
    if (result.matchedCount > 0) {
      console.log(`  ${oldStatus} -> ${newStatus}: ${result.modifiedCount} updated`);
      totalUpdated += result.modifiedCount;
    }
  }

  if (totalUpdated === 0) {
    console.log('No legacy status values found. Nothing to migrate.');
  } else {
    console.log(`\nDone. ${totalUpdated} application(s) migrated.`);
  }

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
