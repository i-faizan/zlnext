"use client";

import { useEffect, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch session count
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/visits", { method: "GET" });
        const data = await res.json();
        setCount(Array.isArray(data) ? data.length : 0);
      } catch {
        setCount(0);
      }
    };

    fetchCount();

    // Update count every 5 seconds
    const interval = setInterval(fetchCount, 5000);

    return () => clearInterval(interval);
  }, []);

  return <p className="text-[10px]">Active Users: {count ?? "…"}</p>;
}
