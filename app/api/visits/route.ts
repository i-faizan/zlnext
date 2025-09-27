import { NextResponse } from "next/server";

// In-memory store for user sessions.
// In a real-world production app, you would use a persistent database
// like Redis, Vercel KV, or a traditional SQL/NoSQL database.
const userSessions = new Map();

/**
 * @api {get} /api/visits
 * @apiDescription Retrieves a list of all active user sessions with their engagement time.
 * @apiSuccess {Object[]} sessions - List of user sessions.
 * @apiSuccess {string} sessions.uuid - The unique identifier for the session.
 * @apiSuccess {number} sessions.seconds - The total time spent in seconds.
 */
export async function GET() {
  const engagementData = [];
  
  // Iterate over the sessions and calculate the time spent for each one.
  for (const [uuid, session] of userSessions.entries()) {
    const seconds = Math.round((session.lastSeen - session.startTime) / 1000);
    engagementData.push({ uuid, seconds });
  }

  return NextResponse.json(engagementData);
}

/**
 * @api {post} /api/visits
 * @apiDescription Creates a new user session or updates an existing one for beacon calls.
 * This dual purpose is to accommodate `navigator.sendBeacon`, which only uses POST.
 * @apiSuccess {string} uuid - The unique identifier for the new session.
 * @apiSuccess {number} count - The current number of active sessions.
 */
export async function POST(request: Request) {
  const now = Date.now();
  let body;
  try {
    body = await request.json();
  } catch (e) {
    // The request has no body or it's not valid JSON.
    body = null;
  }

  // If a valid UUID is passed, it's a "beacon" update on page unload.
  if (body && body.uuid && userSessions.has(body.uuid)) {
    const session = userSessions.get(body.uuid);
    session.lastSeen = now;
    userSessions.set(body.uuid, session);
    // Beacons don't process responses, so we send a "No Content" status.
    return new Response(null, { status: 204 });
  }

  // Otherwise, create a brand new session.
  const uuid = crypto.randomUUID();
  userSessions.set(uuid, {
    startTime: now,
    lastSeen: now,
  });

  const count = userSessions.size;
  return NextResponse.json({ uuid, count });
}

/**
 * @api {put} /api/visits
 * @apiDescription Updates a session's `lastSeen` timestamp as a heartbeat.
 * @apiParam {string} uuid - The unique identifier for the session to update.
 */
export async function PUT(request: Request) {
    try {
        const { uuid } = await request.json();
        if (uuid && userSessions.has(uuid)) {
            const session = userSessions.get(uuid);
            session.lastSeen = Date.now();
            userSessions.set(uuid, session);
            return NextResponse.json({ message: "Session updated" }, { status: 200 });
        }
        return NextResponse.json({ error: "Invalid or missing UUID" }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}

/**
 * @api {delete} /api/visits
 * @apiDescription Clears all tracked user sessions from memory.
 */
export async function DELETE() {
  userSessions.clear();
  return NextResponse.json({ message: "All sessions cleared", count: 0 });
}
