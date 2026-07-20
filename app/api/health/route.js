import { NextResponse } from 'next/server';

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0',
  };

  // Check MongoDB connectivity
  try {
    const { connectDB } = await import('@/lib/db');
    await connectDB();
    health.database = 'connected';
  } catch {
    health.database = 'disconnected';
    health.status = 'degraded';
  }

  return NextResponse.json(health, { status: health.status === 'ok' ? 200 : 503 });
}
