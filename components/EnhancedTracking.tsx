"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Simple session tracking
export default function EnhancedTracking() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Skip dashboard pages
    if (pathname.startsWith('/dashboard')) {
      return;
    }

    // Create or get session
    const initSession = async () => {
      try {
        const response = await fetch('/api/visits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: pathname }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.uuid) {
            sessionIdRef.current = data.uuid;
          }
        }
      } catch (error) {
        console.error('Failed to initialize session:', error);
      }
    };

    initSession();

    // Heartbeat - update session every 30 seconds
    const heartbeatInterval = setInterval(() => {
      if (sessionIdRef.current) {
        fetch('/api/visits', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uuid: sessionIdRef.current }),
        }).catch(() => {});
      }
    }, 30000);

    // Cleanup on unmount
    return () => {
      clearInterval(heartbeatInterval);
    };
  }, [pathname]);

  return null;
}
