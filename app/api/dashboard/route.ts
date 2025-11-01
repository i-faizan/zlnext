import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Import the same session store from visits route
// In production, this should be a shared store/database
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;
const COOKIE_NAME = "dashboard-auth";
const COOKIE_VALUE = "authenticated";

// This is a simple approach - in production, use proper authentication
export async function POST(request: Request) {
  // Add X-Robots-Tag header to prevent indexing
  const headers = new Headers();
  headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
  
  try {
    const { password } = await request.json();
    
    if (password === DASHBOARD_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      
      return NextResponse.json({ success: true }, { headers });
    }
    
    return NextResponse.json({ error: "Invalid password" }, { status: 401, headers });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400, headers });
  }
}

export async function GET(request: Request) {
  // Add X-Robots-Tag header to prevent indexing
  const headers = new Headers();
  headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
  
  // Check authentication
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(COOKIE_NAME);
  
  if (!authCookie || authCookie.value !== COOKIE_VALUE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers });
  }
  
  // Import the sessions from the visits route
  // In production, use a shared database/store
  try {
    const { getSessions } = await import("../visits/route");
    const sessions = getSessions();
    return NextResponse.json({ sessions }, { headers });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500, headers });
  }
}

export async function DELETE(request: Request) {
  // Add X-Robots-Tag header to prevent indexing
  const headers = new Headers();
  headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
  
  // Check authentication
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(COOKIE_NAME);
  
  if (!authCookie || authCookie.value !== COOKIE_VALUE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers });
  }
  
  cookieStore.delete(COOKIE_NAME);
  
  return NextResponse.json({ success: true }, { headers });
}
