import { NextResponse } from 'next/server';
import { uploadApplicantDocument } from '@/lib/cloudinary';
import { sanitizeInput, generateReferenceNumber } from '@/lib/utils';

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // ~10MB

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'File must be a PDF, JPG, or PNG.' },
        { status: 422 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File must be 10MB or smaller.' },
        { status: 422 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');
    const referenceNumber = generateReferenceNumber();

    const result = await uploadApplicantDocument({
      base64Data,
      fileName: sanitizeInput(file.name).substring(0, 150),
      referenceNumber,
    });

    return NextResponse.json(
      {
        success: true,
        fileId: result.fileId,
        url: result.url,
        name: result.name,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
