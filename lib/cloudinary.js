import 'server-only';
import { v2 as cloudinary } from 'cloudinary';

let configured = false;

function getCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  if (!configured) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    configured = true;
  }

  return cloudinary;
}

function resourceTypeForFile(fileName) {
  const extension = (fileName.split('.').pop() || '').toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
    return 'image';
  }
  return 'raw';
}

// ─── Applicant Document Upload ────────────────────────────────────────────────
export async function uploadApplicantDocument({ base64Data, fileName, referenceNumber }) {
  const client = getCloudinary();
  if (!client) {
    throw new Error('Document storage is not configured. Please contact support.');
  }

  const resourceType = resourceTypeForFile(fileName);

  const result = await client.uploader.upload(`data:application/octet-stream;base64,${base64Data}`, {
    public_id: `${referenceNumber}-${fileName}`,
    folder: 'applications/documents',
    resource_type: resourceType,
    type: 'authenticated',
    use_filename: false,
    unique_filename: true,
  });

  return {
    fileId: result.public_id,
    url: result.secure_url,
    name: fileName,
    size: result.bytes,
  };
}

// ─── Signed Document URL (admin viewing) ──────────────────────────────────────
// Generates a CDN-backed signed URL for viewing a previously-uploaded,
// "authenticated"-type document inline. Cloudinary's token-authentication
// (time-limited signed URLs) requires a paid add-on not available on this
// account, so this uses basic URL signing instead: the URL is cryptographically
// signed and cannot be forged or altered, but does not expire on its own.
export function getSignedDocumentUrl(documentUrl) {
  const client = getCloudinary();
  if (!client) {
    throw new Error('Document storage is not configured.');
  }

  const { publicId, resourceType, format } = parseDocumentUrl(documentUrl);

  return client.url(publicId, {
    resource_type: resourceType,
    type: 'authenticated',
    format,
    sign_url: true,
  });
}

// The delivery URL stored at upload time already encodes resource_type/public_id/format,
// so we recover them from it rather than storing separate columns.
function parseDocumentUrl(documentUrl) {
  const match = documentUrl.match(
    /\/(image|video|raw)\/authenticated\/(?:[^/]+\/)*?v\d+\/(.+?)(?:\.([a-zA-Z0-9]+))?$/
  );

  if (!match) {
    throw new Error('Stored document URL is not a recognized Cloudinary URL.');
  }

  const [, resourceType, publicId, format] = match;
  return { resourceType, publicId, format: format || undefined };
}
