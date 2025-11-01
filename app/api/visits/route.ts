import { NextResponse } from "next/server";

interface PageVisit {
  path: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  scrollDepth: number;
  scrollDuration: number;
}

interface CTAClick {
  timestamp: number;
  source: string;
  label: string;
  type: 'booking' | 'other';
  url?: string;
}

interface VideoPlay {
  timestamp: number;
  videoId?: string;
  videoSrc?: string;
  videoTitle?: string;
  videoType: 'youtube' | 'html5';
  duration?: number; // How long the video was played in seconds
  completion?: number; // Percentage watched (0-100)
}

interface Session {
  startTime: number;
  lastSeen: number;
  userAgent?: string;
  referrer?: string;
  pages: PageVisit[];
  ctaClicks: CTAClick[];
  videoPlays: VideoPlay[];
  currentPage?: string;
  totalScrollDuration: number;
  maxScrollDepth: number;
}

// In-memory store for user sessions.
// In a real-world production app, you would use a persistent database
// like Redis, Vercel KV, or a traditional SQL/NoSQL database.
const userSessions = new Map<string, Session>();

// Export function to get all sessions for dashboard
export function getSessions() {
  const sessions: Array<{ uuid: string; session: Session }> = [];
  for (const [uuid, session] of userSessions.entries()) {
    sessions.push({ uuid, session });
  }
  return sessions;
}

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
 * Also handles CTA tracking updates from sendBeacon.
 * @apiSuccess {string} uuid - The unique identifier for the new session.
 * @apiSuccess {number} count - The current number of active sessions.
 */
export async function POST(request: Request) {
  const contentType = request.headers.get("content-type");
  
  // If content-type is application/json, try to parse and check if it's an update
  if (contentType?.includes("application/json")) {
    try {
      // Clone the request to read body multiple times
      const clonedRequest = request.clone();
      const text = await clonedRequest.text();
      if (text) {
        const body = JSON.parse(text);
        // If it has a type field, treat it as an update request (from sendBeacon for CTA tracking)
        if (body.type && body.uuid) {
          // Reconstruct request with body for handleUpdate
          const updateRequest = new Request(request.url, {
            method: request.method,
            headers: request.headers,
            body: text,
          });
          return handleUpdate(updateRequest);
        }
        // If it has a uuid but no type, it's a simple beacon update on page unload
        if (body.uuid && userSessions.has(body.uuid)) {
          const now = Date.now();
          const session = userSessions.get(body.uuid) as Session;
          session.lastSeen = now;
          
          // Finalize current page visit if exists
          if (session.currentPage && session.pages.length > 0) {
            const currentPage = session.pages[session.pages.length - 1];
            if (currentPage.path === session.currentPage && !currentPage.endTime) {
              currentPage.endTime = now;
              currentPage.duration = Math.round((now - currentPage.startTime) / 1000);
            }
          }
          
          userSessions.set(body.uuid, session);
          // Beacons don't process responses, so we send a "No Content" status.
          return new Response(null, { status: 204 });
        }
      }
    } catch {
      // If parsing fails, continue to create new session
    }
  }
  
  // Otherwise, create a brand new session.
  return createNewSession(request);
}

async function createNewSession(request: Request) {
  const now = Date.now();
  let body;
  try {
    body = await request.json();
  } catch {
    // The request has no body or it's not valid JSON.
    body = null;
  }

  // First, check if there's a very recent session with the same user agent
  // to prevent duplicate sessions from React Strict Mode or rapid refreshes
  const headers = request.headers;
  const userAgent = headers.get('user-agent') || undefined;
  const referrer = headers.get('referer') || headers.get('referrer') || undefined;
  const url = new URL(request.url);
  const path = body?.path || url.searchParams.get('path') || '/';
  
  // Exclude dashboard paths from tracking
  if (path.startsWith('/dashboard')) {
    return NextResponse.json({ error: "Dashboard paths are not tracked" }, { status: 403 });
  }
  
  // Check for existing recent session (within last 5 seconds) with same user agent
  // This prevents duplicate sessions from React Strict Mode double-mounting
  if (userAgent) {
    const recentSessions = Array.from(userSessions.entries()).filter(([_, session]) => {
      const timeSinceLastSeen = now - session.lastSeen;
      return (
        session.userAgent === userAgent &&
        timeSinceLastSeen < 5000 && // Within last 5 seconds
        session.referrer === referrer // Same referrer
      );
    });
    
    // If we find a very recent duplicate, return the existing UUID instead
    if (recentSessions.length > 0) {
      const [existingUuid, existingSession] = recentSessions[0];
      // Update lastSeen to current time
      existingSession.lastSeen = now;
      userSessions.set(existingUuid, existingSession);
      return NextResponse.json({ uuid: existingUuid, count: userSessions.size });
    }
  }
  
  // Create new session
  const uuid = crypto.randomUUID();
  const session: Session = {
    startTime: now,
    lastSeen: now,
    userAgent,
    referrer,
    pages: [{
      path,
      startTime: now,
      scrollDepth: 0,
      scrollDuration: 0,
    }],
    ctaClicks: [],
    videoPlays: [],
    currentPage: path,
    totalScrollDuration: 0,
    maxScrollDepth: 0,
  };
  
  userSessions.set(uuid, session);

  const count = userSessions.size;
  return NextResponse.json({ uuid, count });
}

/**
 * @api {put} /api/visits
 * @apiDescription Updates a session's `lastSeen` timestamp as a heartbeat, or tracks events.
 * @apiParam {string} uuid - The unique identifier for the session to update.
 * @apiParam {string} type - Type of update: 'heartbeat', 'page', 'scroll', 'cta'
 */
export async function PUT(request: Request) {
    return handleUpdate(request);
}

async function handleUpdate(request: Request) {
    try {
        const body = await request.json();
        const { uuid, type, ...data } = body;
        
        if (!uuid) {
            return NextResponse.json({ error: "Invalid or missing UUID" }, { status: 400 });
        }
        
        // If session doesn't exist, try to recover it
        if (!userSessions.has(uuid)) {
            // For scroll and heartbeat, silently succeed (non-critical operations)
            // This prevents errors when server restarts but client still has UUID
            if (type === 'scroll' || type === 'heartbeat') {
                return NextResponse.json({ 
                    message: "Session not found, skipping non-critical update",
                    recovered: false 
                }, { status: 200 });
            }
            
            // For critical operations (page, cta), try to find a matching session or create recovery
            // Try to find a recent session with matching user agent
            const headers = request.headers;
            const userAgent = headers.get('user-agent') || undefined;
            
            if (userAgent && type === 'page') {
                // Try to find a very recent session (within last 30 seconds) with same user agent
                const now = Date.now();
                const recentSessions = Array.from(userSessions.entries()).filter(([_, session]) => {
                    const timeSinceLastSeen = now - session.lastSeen;
                    return (
                        session.userAgent === userAgent &&
                        timeSinceLastSeen < 30000 // Within last 30 seconds
                    );
                });
                
                if (recentSessions.length > 0) {
                    // Found a matching session, update it instead
                    const [existingUuid, existingSession] = recentSessions[0];
                    existingSession.lastSeen = now;
                    
                    // Handle page tracking
                    const newPath = data.path || '/';
                    if (existingSession.currentPage !== newPath) {
                        // End previous page visit
                        if (existingSession.currentPage && existingSession.pages.length > 0) {
                            const currentPageVisit = existingSession.pages[existingSession.pages.length - 1];
                            if (currentPageVisit.path === existingSession.currentPage && !currentPageVisit.endTime) {
                                currentPageVisit.endTime = now;
                                currentPageVisit.duration = Math.round((now - currentPageVisit.startTime) / 1000);
                            }
                        }
                        
                        // Start new page visit
                        const newPage: PageVisit = {
                            path: newPath,
                            startTime: now,
                            scrollDepth: 0,
                            scrollDuration: 0,
                        };
                        existingSession.pages.push(newPage);
                        existingSession.currentPage = newPage.path;
                    }
                    
                    userSessions.set(existingUuid, existingSession);
                    return NextResponse.json({ 
                        message: "Session recovered", 
                        uuid: existingUuid,
                        recovered: true 
                    }, { status: 200 });
                }
            }
            
            // Could not recover - return error for critical operations
            return NextResponse.json({ 
                error: "Invalid or missing UUID",
                needsNewSession: true 
            }, { status: 400 });
        }
        
        const session = userSessions.get(uuid) as Session;
        const now = Date.now();
        session.lastSeen = now;
        
        if (type === 'page') {
            const newPath = data.path || '/';
            
            // Prevent duplicate tracking of the same page
            // Only track if it's a different page than the current one
            if (session.currentPage === newPath) {
                // Same page, just update lastSeen - don't create duplicate page view
                return NextResponse.json({ message: "Same page, skipping duplicate" }, { status: 200 });
            }
            
            // End previous page visit
            if (session.currentPage && session.pages.length > 0) {
                const currentPageVisit = session.pages[session.pages.length - 1];
                if (currentPageVisit.path === session.currentPage && !currentPageVisit.endTime) {
                    currentPageVisit.endTime = now;
                    currentPageVisit.duration = Math.round((now - currentPageVisit.startTime) / 1000);
                }
            }
            
            // Start new page visit
            const newPage: PageVisit = {
                path: newPath,
                startTime: now,
                scrollDepth: 0,
                scrollDuration: 0,
            };
            session.pages.push(newPage);
            session.currentPage = newPage.path;
        } else if (type === 'scroll') {
            // Update scroll tracking for current page
            if (session.pages.length > 0) {
                const currentPage = session.pages[session.pages.length - 1];
                currentPage.scrollDepth = Math.max(currentPage.scrollDepth, data.scrollDepth || 0);
                currentPage.scrollDuration += data.scrollDelta || 0;
                session.totalScrollDuration += data.scrollDelta || 0;
                session.maxScrollDepth = Math.max(session.maxScrollDepth, data.scrollDepth || 0);
            }
        } else if (type === 'cta') {
            // Track CTA click
            const ctaClick: CTAClick = {
                timestamp: now,
                source: data.source || 'unknown',
                label: data.label || '',
                type: data.ctaType || data.type || 'other',
                url: data.url,
            };
            session.ctaClicks.push(ctaClick);
        } else if (type === 'video') {
            // Track video play
            // Check if this is an update to an existing video play (same video, recent timestamp)
            const videoId = data.videoId;
            const videoSrc = data.videoSrc;
            const existingVideo = session.videoPlays && session.videoPlays.length > 0
                ? session.videoPlays.find((v, idx) => {
                    const recent = now - v.timestamp < 10000; // Within 10 seconds
                    const sameVideo = (videoId && v.videoId === videoId) || 
                                     (videoSrc && v.videoSrc === videoSrc);
                    return recent && sameVideo && idx === session.videoPlays.length - 1; // Last video play
                })
                : null;

            if (existingVideo) {
                // Update existing video play (for progress updates)
                existingVideo.duration = Math.max(existingVideo.duration || 0, data.duration || 0);
                existingVideo.completion = Math.max(existingVideo.completion || 0, data.completion || 0);
            } else {
                // New video play
                const videoPlay: VideoPlay = {
                    timestamp: now,
                    videoId: data.videoId,
                    videoSrc: data.videoSrc,
                    videoTitle: data.videoTitle,
                    videoType: data.videoType || 'html5',
                    duration: data.duration || 0,
                    completion: data.completion || 0,
                };
                if (!session.videoPlays) {
                    session.videoPlays = [];
                }
                session.videoPlays.push(videoPlay);
            }
        }
        
        userSessions.set(uuid, session);
        return NextResponse.json({ message: "Session updated" }, { status: 200 });
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
