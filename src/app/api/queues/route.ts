// app/api/queues/route.js
import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for queues
const queues: { [index: string]: string[] } = {
  queue1: ['message1', 'message2'],
  queue2: ['message1'],
  queue3: [],
};

export async function GET(request: NextRequest) {
  const queueData = Object.keys(queues).map((name) => ({
    name,
    messageCount: queues[name].length,
  }));

  return NextResponse.json(queueData);
}
