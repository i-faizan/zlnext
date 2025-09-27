"use client";

import { useEffect, useState, useRef } from "react";

// Extend the global Window interface for our custom console functions
declare global {
  interface Window {
    resetServerCounter?: () => Promise<void>;
    seeUserEngagement?: () => Promise<void>;
  }
}

export default function Counter() {
  // State for the number of active users
  const [count, setCount] = useState<number | null>(null);
  // Ref to hold the current user's unique ID to avoid stale closures
  const uuidRef = useRef<string | null>(null);

  useEffect(() => {
    // 1. Start a new session when the component mounts
    fetch("/api/visits", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        uuidRef.current = data.uuid; // Store the unique ID in the ref
      })
      .catch(() => setCount(0));

    // 2. Set up a "heartbeat" to ping the server every 5 seconds
    // This tells the server the user is still active.
    const heartbeatInterval = setInterval(() => {
      if (uuidRef.current) {
        fetch("/api/visits", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uuid: uuidRef.current }),
        }).catch(err => console.error("Heartbeat failed:", err));
      }
    }, 5000);

    // 3. On page unload, send a final "beacon" to get the most accurate time
    const handleUnload = () => {
      if (uuidRef.current) {
        const data = JSON.stringify({ uuid: uuidRef.current });
        // Beacons are reliable for sending data on unload. They use POST.
        navigator.sendBeacon("/api/visits", new Blob([data], { type: 'application/json' }));
      }
    };
    window.addEventListener("beforeunload", handleUnload);

    // 4. Expose a function to view engagement data from the console
    window.seeUserEngagement = async () => {
      try {
        const res = await fetch("/api/visits", { method: "GET" });
        const data = await res.json();
        console.log("📊 User Engagement Data (seconds):");
        console.table(data); // `console.table` provides a nice format
      } catch (error) {
        console.error("Failed to fetch engagement data:", error);
      }
    };

    // 5. Expose a function to reset all server data from the console
    window.resetServerCounter = async () => {
        try {
            await fetch("/api/visits", { method: "DELETE" });
            console.log("✅ Server data reset.");
            // Re-initialize a session for the current user
            const res = await fetch("/api/visits", { method: "POST" });
            const data = await res.json();
            setCount(data.count);
            uuidRef.current = data.uuid;
        } catch (error) {
            console.error("Failed to reset server data:", error);
        }
    };

    // 6. Cleanup: remove listeners and intervals when the component unmounts
    return () => {
      clearInterval(heartbeatInterval);
      window.removeEventListener("beforeunload", handleUnload);
      delete window.seeUserEngagement;
      delete window.resetServerCounter;
    };
  }, []); // Empty dependency array ensures this runs only once

  return <p className="text-[10px]">Active Users: {count ?? "…"}</p>;
}
