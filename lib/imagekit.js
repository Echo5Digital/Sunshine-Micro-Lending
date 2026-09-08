import 'server-only';
import ImageKit from 'imagekit';

let client = null;

function getImageKit() {
  if (client) {
    return client;
  }

  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    return null;
  }

  client = new ImageKit({ publicKey, privateKey, urlEndpoint });
  return client;
}

// ─── Applicant Document Upload ────────────────────────────────────────────────
export async function uploadApplicantDocument({ base64Data, fileName, referenceNumber }) {
  const imagekit = getImageKit();
  if (!imagekit) {
    throw new Error('Document storage is not configured. Please contact support.');
  }

  const result = await imagekit.upload({
    file: base64Data,
    fileName: `${referenceNumber}-${fileName}`,
    folder: '/applications/documents',
    useUniqueFileName: true,
  });

  return {
    fileId: result.fileId,
    url: result.url,
    name: result.name,
    size: result.size,
  };
}

// ─── Signed Document URL (admin viewing) ──────────────────────────────────────
// Generates a short-lived signed URL for viewing a previously-uploaded document.
// Works for any existing file regardless of type or upload-time privacy setting.
export function getSignedDocumentUrl(documentUrl, expireSeconds = 300) {
  const imagekit = getImageKit();
  if (!imagekit) {
    throw new Error('Document storage is not configured.');
  }

  return imagekit.url({
    src: documentUrl,
    signed: true,
    expireSeconds,
  });
}
