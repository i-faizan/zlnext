import { NextResponse } from "next/server";

interface Session {
  startTime: number;
  lastSeen: number;
  path: string;
  userAgent?: string;
  referrer?: string;
}

// In-memory session store
const sessions = new Map<string, Session>();

// Export for dashboard
export function getSessions() {
  return Array.from(sessions.entries()).map(([uuid, session]) => ({
    uuid,
    session,
  }));
}

// GET - Return all sessions
export async function GET() {
  const data = Array.from(sessions.entries()).map(([uuid, session]) => {
    const seconds = Math.round((session.lastSeen - session.startTime) / 1000);
    return { uuid, seconds };
  });

  return NextResponse.json(data);
}

// POST - Create new session
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const path = body.path || '/';

    // Skip dashboard paths
  if (path.startsWith('/dashboard')) {
      return NextResponse.json({ error: 'Dashboard paths not tracked' }, { status: 403 });
    }

  const uuid = crypto.randomUUID();
    const now = Date.now();

  const session: Session = {
    startTime: now,
    lastSeen: now,
      path,
      userAgent: request.headers.get('user-agent') || undefined,
      referrer: request.headers.get('referer') || undefined,
    };

    sessions.set(uuid, session);

    return NextResponse.json({ uuid, count: sessions.size });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// PUT - Update session (heartbeat)
export async function PUT(request: Request) {
    try {
        const body = await request.json();
    const { uuid } = body;

    if (!uuid || !sessions.has(uuid)) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const session = sessions.get(uuid)!;
    session.lastSeen = Date.now();

    return NextResponse.json({ message: 'Session updated' });
    } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

// DELETE - Clear all sessions
export async function DELETE() {
  sessions.clear();
  return NextResponse.json({ message: 'All sessions cleared' });
}
