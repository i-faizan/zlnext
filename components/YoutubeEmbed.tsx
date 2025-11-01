'use client';

import React, { useEffect, useRef } from 'react';

type Props = {
  videoId: string; // YouTube video ID (e.g. "dQw4w9WgXcQ")
  title?: string;
  className?: string;
};

export default function YouTubeEmbed({ videoId, title = "YouTube video", className = "" }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playStartTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Track YouTube video plays by monitoring iframe focus and message events
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      const trackingUUID = (window as any).trackingUUID;
      if (!trackingUUID) return;

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        // YouTube iframe API sends various events
        if (data && (data.event === 'onStateChange' || data.event === 'video-progress')) {
          const state = data.info || data;
          
          // State 1 = playing
          if (state === 1 || state.playerState === 1 || state.state === 1) {
            if (!playStartTimeRef.current) {
              playStartTimeRef.current = Date.now();
              
              // Track video play
              fetch("/api/visits", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  uuid: trackingUUID,
                  type: "video",
                  videoId: videoId,
                  videoTitle: title,
                  videoType: "youtube",
                  duration: 0,
                  completion: 0,
                }),
              }).catch(() => {});
            }
          }
          
          // State 0 = ended
          if (state === 0 || state.playerState === 0 || state.state === 0) {
            if (playStartTimeRef.current) {
              const playDuration = Math.round((Date.now() - playStartTimeRef.current) / 1000);
              playStartTimeRef.current = null;
              
              fetch("/api/visits", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  uuid: trackingUUID,
                  type: "video",
                  videoId: videoId,
                  videoTitle: title,
                  videoType: "youtube",
                  duration: playDuration,
                  completion: 100,
                }),
              }).catch(() => {});
            }
          }
        }
      } catch {
        // Ignore parse errors
      }
    };

    // Also track when iframe is clicked (user interaction)
    const handleIframeClick = () => {
      const trackingUUID = (window as any).trackingUUID;
      if (!trackingUUID || playStartTimeRef.current) return;
      
      // Small delay to allow YouTube to start playing
      setTimeout(() => {
        fetch("/api/visits", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uuid: trackingUUID,
            type: "video",
            videoId: videoId,
            videoTitle: title,
            videoType: "youtube",
            duration: 0,
            completion: 0,
          }),
        }).catch(() => {});
      }, 1000);
    };

    window.addEventListener('message', handleMessage);
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeClick);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
      if (iframe) {
        iframe.removeEventListener('load', handleIframeClick);
      }
    };
  }, [videoId, title]);

  return (
    <div className={`relative w-full overflow-hidden rounded-xl shadow-lg ${className}`} style={{ paddingTop: "56.25%" }}>
      <iframe
        ref={iframeRef}
        className="absolute left-0 top-0 h-full w-full rounded-xl"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
