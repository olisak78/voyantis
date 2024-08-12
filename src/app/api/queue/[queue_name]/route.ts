import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for queues
const queues: any = {};

export async function POST(request: NextRequest, { params }: any) {
  const { queue_name } = params;
  const message = await request.json();

  if (!queues[queue_name]) {
    queues[queue_name] = [];
  }

  queues[queue_name].push(message);

  return NextResponse.json({
    success: true,
    message: 'Message added to queue.',
  });
}

export async function GET(request: NextRequest, { params }: any) {
  const { queue_name } = params;
  const { searchParams } = new URL(request.url);
  const timeout = searchParams.get('timeout')
    ? parseInt(searchParams.get('timeout') as string)
    : 10000;

  if (!queues[queue_name] || queues[queue_name].length === 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (queues[queue_name] && queues[queue_name].length > 0) {
          const message = queues[queue_name].shift();
          resolve(NextResponse.json(message));
        } else {
          resolve(NextResponse.json({ status: '204', message: 'No content' }));
        }
      }, timeout);
    });
  }

  const message = queues[queue_name].shift();
  return NextResponse.json(message);
}
