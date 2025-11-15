"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { buildEnvParams } from "@/lib/env";

// Session storage key
const SESSION_UUID_KEY = "tracking_session_uuid";
const SESSION_TIMESTAMP_KEY = "tracking_session_timestamp";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes - consider session expired after this

// Extend the global Window interface
declare global {
  interface Window {
    trackingUUID?: string;
    trackingInitialized?: boolean;
    trackingPageLoaded?: boolean;
  }
}

export default function EnhancedTracking() {
  const uuidRef = useRef<string | null>(null);
  const initPromiseRef = useRef<Promise<string> | null>(null);
  const pathname = usePathname();
  const lastTrackedPathRef = useRef<string | null>(null);
  const scrollStartTimeRef = useRef<number | null>(null);
  const lastScrollTimeRef = useRef<number | null>(null); // Initialize to null, set in useEffect
  const scrollDepthRef = useRef<number>(0);
  const scrollThrottleRef = useRef<NodeJS.Timeout | null>(null);
  const pageTrackingInProgressRef = useRef<boolean>(false);
  const videoTrackingRefs = useRef<Map<HTMLVideoElement, { progressInterval?: NodeJS.Timeout }>>(new Map());
  const ctaClickTrackingRef = useRef<Set<string>>(new Set()); // Track clicked CTAs to prevent duplicates
  const pageLoadedRef = useRef<boolean>(false);
  const leftBeforeLoadSentRef = useRef<boolean>(false);
  const sessionInitStartedRef = useRef<boolean>(false); // Track if session initialization has started

  // Get or create session UUID with deduplication
  const getOrCreateSession = async (): Promise<string | null> => {
    // If already initialized in this render, return existing
    if (uuidRef.current) {
      return uuidRef.current;
    }

    // If there's already an initialization in progress, wait for it
    if (initPromiseRef.current) {
      return initPromiseRef.current;
    }

    // Check localStorage first (persistent across page loads)
    if (typeof window !== "undefined") {
      // FIRST: Check if inline script already created the session
      // This happens before React hydrates, so check window object first
      if (window.trackingUUID && window.trackingInitialized) {
        uuidRef.current = window.trackingUUID;
        // Also store in localStorage for persistence (if not already there)
        const storedUuid = localStorage.getItem(SESSION_UUID_KEY);
        if (storedUuid !== window.trackingUUID) {
          localStorage.setItem(SESSION_UUID_KEY, window.trackingUUID);
          localStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
        }
        return window.trackingUUID;
      }

      const storedUuid = localStorage.getItem(SESSION_UUID_KEY);
      const storedTimestamp = localStorage.getItem(SESSION_TIMESTAMP_KEY);
      
      if (storedUuid && storedTimestamp) {
        const timestamp = parseInt(storedTimestamp, 10);
        const now = Date.now();
        
        // Check if session is still valid (not expired)
        if (now - timestamp < SESSION_TIMEOUT) {
          uuidRef.current = storedUuid;
          window.trackingUUID = storedUuid;
          window.trackingInitialized = true;
          return storedUuid;
        } else {
          // Session expired, clear it
          localStorage.removeItem(SESSION_UUID_KEY);
          localStorage.removeItem(SESSION_TIMESTAMP_KEY);
        }
      }

      // Collect device info (minimal, don't wait for anything)
      const fullUrl = typeof window !== 'undefined' ? window.location.href : '';
      const referrer = typeof document !== 'undefined' ? document.referrer : '';
      // Use minimal device info to speed up session creation
      const deviceInfo = buildEnvParams(fullUrl, referrer);
      
      // Create new session IMMEDIATELY - fire request right away
      // This ensures session appears in dashboard instantly
      const initPromise = fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname, deviceInfo }),
        // Don't wait for anything - fire immediately
        keepalive: true, // Ensure request completes even if page unloads
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.uuid) {
            uuidRef.current = data.uuid;
            window.trackingUUID = data.uuid;
            window.trackingInitialized = true;
            
            // Store in localStorage for persistence
            localStorage.setItem(SESSION_UUID_KEY, data.uuid);
            localStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
            
            return data.uuid;
          }
          return null;
        })
        .catch((err) => {
          console.error("Failed to initialize tracking:", err);
          return null;
        });

      initPromiseRef.current = initPromise;
      const uuid = await initPromise;
      initPromiseRef.current = null;
      return uuid;
    }

    return null;
  };

  const initializeScrollTiming = (calculateScrollDepth: () => number) => {
    scrollDepthRef.current = 0;
    scrollStartTimeRef.current = Date.now();
    lastScrollTimeRef.current = Date.now();
    
    // Mark page as loaded only after a delay to account for images still loading
    // The window.load event fires when DOM is ready, but images may still be loading
    // We'll mark as loaded after 2 seconds OR when window.load fires (whichever comes first)
    const markPageLoaded = () => {
      pageLoadedRef.current = true;
      // Also update window flag for inline script compatibility
      if (typeof window !== 'undefined') {
        window.trackingPageLoaded = true;
      }
    };
    
    // If window.load already fired, mark immediately
    if (document.readyState === 'complete') {
      // But add a small delay to catch images that are still loading
      setTimeout(markPageLoaded, 2000);
    } else {
      // Wait for load event, then add delay
      const handleLoad = () => {
        setTimeout(markPageLoaded, 2000);
        window.removeEventListener('load', handleLoad);
      };
      window.addEventListener('load', handleLoad);
    }

    // Force initial scroll calculation for mobile (some mobile browsers don't fire scroll on load)
    setTimeout(() => {
      if (uuidRef.current && typeof window !== 'undefined') {
        const initialDepth = calculateScrollDepth();
        if (initialDepth > 0) {
          scrollDepthRef.current = initialDepth;
        }
      }
    }, 500); // Small delay to ensure page is rendered
  };

  // Create session immediately on mount - before any other logic
  // This ensures the session appears in dashboard instantly
  // Use a separate effect that runs only once on mount
  useEffect(() => {
    // Skip tracking for dashboard pages
    if (pathname.startsWith('/dashboard')) {
      return;
    }

    // Initialize session IMMEDIATELY - don't wait for anything
    // Fire the request right away so session appears in dashboard instantly
    if (!sessionInitStartedRef.current) {
      sessionInitStartedRef.current = true;
      // Fire immediately - don't await, don't delay
      getOrCreateSession().catch((err) => {
        console.error("Failed to initialize session:", err);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - run only once on mount, pathname is stable

  useEffect(() => {
    // Skip tracking for dashboard pages
    if (pathname.startsWith('/dashboard')) {
      return;
    }

    // Note: Don't return early here even if same path
    // Mobile browsers may re-mount components, and we still need to initialize scroll tracking
    if (lastTrackedPathRef.current === pathname && uuidRef.current && pageLoadedRef.current) {
      // Same page - reset scroll tracking but continue with initialization
      scrollDepthRef.current = 0;
      scrollStartTimeRef.current = Date.now();
      lastScrollTimeRef.current = Date.now();
      // Don't return - continue to ensure scroll tracking is set up
    }

    // Initialize session if not already started (fallback)
    let mounted = true;
    pageTrackingInProgressRef.current = true;
    
    if (!sessionInitStartedRef.current) {
      sessionInitStartedRef.current = true;
    }
    
    // Start session creation immediately - don't wait
    const sessionPromise = getOrCreateSession();
    
    sessionPromise.then((uuid) => {
      if (!mounted || !uuid) {
        pageTrackingInProgressRef.current = false;
        return;
      }
      
      // Only track if this is a new path (not already tracked)
      if (lastTrackedPathRef.current !== pathname) {
        // Collect device info for update
        const fullUrl = typeof window !== 'undefined' ? window.location.href : '';
        const referrer = typeof document !== 'undefined' ? document.referrer : '';
        const deviceInfo = buildEnvParams(fullUrl, referrer);
        
        // Use the uuid from the promise, ensuring we have the correct value
        const trackingUuid = uuidRef.current || uuid;
        
        fetch("/api/visits", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uuid: trackingUuid,
            type: "page",
            path: pathname,
            deviceInfo,
          }),
        })
          .then((res) => {
            if (res.ok) {
              // Check if session was recovered
              res.json().then((data) => {
                if (data.recovered && data.uuid) {
                  // Update UUID if session was recovered
                  uuidRef.current = data.uuid;
                  window.trackingUUID = data.uuid;
                  localStorage.setItem(SESSION_UUID_KEY, data.uuid);
                  localStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
                }
              }).catch(() => {});
              
              // Mark this path as tracked only after successful tracking
              lastTrackedPathRef.current = pathname;
            } else if (res.status === 400) {
              // Session lost, clear and recreate
              uuidRef.current = null;
              window.trackingUUID = undefined;
              window.trackingInitialized = false;
              localStorage.removeItem(SESSION_UUID_KEY);
              localStorage.removeItem(SESSION_TIMESTAMP_KEY);
              
              // Try to recreate session
              getOrCreateSession().then((newUuid) => {
                if (newUuid) {
                  // Retry page tracking with new UUID
                  fetch("/api/visits", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      uuid: newUuid,
                      type: "page",
                      path: pathname,
                    }),
                  })
                    .then(() => {
                      lastTrackedPathRef.current = pathname;
                    })
                    .catch(() => {})
                    .finally(() => {
                      pageTrackingInProgressRef.current = false;
                    });
                } else {
                  pageTrackingInProgressRef.current = false;
                }
              });
              return;
            }
          })
          .catch((err) => {
            console.error("Failed to track page change:", err);
          })
          .finally(() => {
            pageTrackingInProgressRef.current = false;
          });
      } else {
        pageTrackingInProgressRef.current = false;
      }
    });

    // Scroll tracking - optimized for mobile and desktop
    const calculateScrollDepth = () => {
      // Use multiple methods to get scroll position (works better on mobile)
      const scrollTop = window.pageYOffset || 
                       document.documentElement.scrollTop || 
                       document.body.scrollTop || 
                       0;
      
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight || 0,
        document.body.scrollHeight || 0
      );
      
      const clientHeight = Math.max(
        window.innerHeight || 0,
        document.documentElement.clientHeight || 0
      );
      
      const maxScroll = scrollHeight - clientHeight;
      const scrollDepth = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      
      return Math.min(100, Math.max(0, scrollDepth)); // Clamp between 0-100
    };

    const ensureTimingStartsAfterLoad = () => {
      if (typeof window === 'undefined') {
        // Can't initialize scroll timing in SSR
        return () => {};
      }

      if (document.readyState === 'complete') {
        initializeScrollTiming(calculateScrollDepth);
        return () => {};
      }

      const handleLoad = () => {
        initializeScrollTiming(calculateScrollDepth);
        window.removeEventListener('load', handleLoad);
      };

      window.addEventListener('load', handleLoad);

      return () => {
        window.removeEventListener('load', handleLoad);
      };
    };

    const cleanupLoadListener = ensureTimingStartsAfterLoad();

    const handleScroll = () => {
      // Check current pathname dynamically to avoid stale closures
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : pathname;
      if (!uuidRef.current || currentPath.startsWith('/dashboard') || !pageLoadedRef.current) return;

      const now = Date.now();
      const scrollDepth = calculateScrollDepth();

      // Update max scroll depth
      if (scrollDepth > scrollDepthRef.current) {
        scrollDepthRef.current = scrollDepth;
      }

      // Calculate scroll duration delta
            const lastScrollTime = lastScrollTimeRef.current ?? Date.now();
            const timeDelta = now - lastScrollTime;
            lastScrollTimeRef.current = now;

      // Throttle scroll updates (send every 500ms)
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }

      scrollThrottleRef.current = setTimeout(() => {
        if (uuidRef.current) {
          fetch("/api/visits", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              uuid: uuidRef.current,
              type: "scroll",
              scrollDepth: scrollDepthRef.current,
              scrollDelta: timeDelta,
            }),
          })
            .then((res) => {
              // If session was lost, try to recover
              if (!res.ok && res.status === 400) {
                // Clear invalid UUID and reinitialize
                uuidRef.current = null;
                window.trackingUUID = undefined;
                window.trackingInitialized = false;
                localStorage.removeItem(SESSION_UUID_KEY);
                localStorage.removeItem(SESSION_TIMESTAMP_KEY);
                getOrCreateSession(); // Recreate session
              }
            })
            .catch((err) => {
              console.error("Failed to track scroll:", err);
            });
        }
      }, 500);
    };

    // Handle touch scroll for mobile (touchmove events)
    const handleTouchMove = () => {
      handleScroll();
    };

    // Add multiple event listeners for better mobile support
    window.addEventListener("scroll", handleScroll, { passive: true, capture: false });
    
    // For mobile devices, also listen to touchmove for better scroll detection
    // Use passive listener to improve performance
    document.addEventListener("touchmove", handleTouchMove, { passive: true, capture: false });
    
    // Also track when user stops scrolling (touchend)
    const handleTouchEnd = () => {
      // Small delay to catch final scroll position
      setTimeout(() => {
        handleScroll();
      }, 100);
    };
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Heartbeat interval - update every 5 seconds (only for non-dashboard pages)
    const heartbeatInterval = setInterval(() => {
      // Check current pathname dynamically to avoid stale closures
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : pathname;
      if (uuidRef.current && !currentPath.startsWith('/dashboard')) {
        // Update localStorage timestamp to keep session alive
        localStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
        
        fetch("/api/visits", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uuid: uuidRef.current,
            type: "heartbeat",
          }),
        })
          .then((res) => {
            // If session was lost, try to recover
            if (!res.ok && res.status === 400) {
              // Clear invalid UUID and reinitialize
              uuidRef.current = null;
              window.trackingUUID = undefined;
              window.trackingInitialized = false;
              localStorage.removeItem(SESSION_UUID_KEY);
              localStorage.removeItem(SESSION_TIMESTAMP_KEY);
              getOrCreateSession(); // Recreate session
            }
          })
          .catch((err) => console.error("Heartbeat failed:", err));
      }
    }, 5000);

    // Track CTA clicks globally (ONLY for CTAs not explicitly handled by components)
    // Components mark themselves with data-cta-handled to opt out of global tracking
    const handleCTAClick = (e: MouseEvent) => {
      // Check current pathname dynamically to avoid stale closures
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : pathname;
      if (!uuidRef.current || currentPath.startsWith('/dashboard')) return;

      const target = e.target as HTMLElement;
      if (!target) return;

      // Find the clickable element (link or button)
      const link = target.closest("a") as HTMLAnchorElement;
      const button = target.closest("button") as HTMLButtonElement;
      const clickableElement = link || button;
      
      if (!clickableElement) return;

      // CRITICAL: Skip if element is handled by a component
      // Components set data-cta-handled attribute in JSX (checked before any handlers run)
      // OR if already tracked in this click cycle
      if (clickableElement.hasAttribute('data-cta-handled') || 
          clickableElement.hasAttribute('data-cta-tracked')) {
        return;
      }

      const href = link?.href || "";
      const elementText = clickableElement.textContent?.trim() || "";
      
      // Create unique identifier for this CTA click to prevent duplicates
      const timestamp = Date.now();
      const identifier = href || elementText;
      const ctaKey = `${identifier}-${timestamp}`;
      
      // Check if same CTA was clicked within last 3 seconds (prevent duplicates)
      const recentKey = Array.from(ctaClickTrackingRef.current).find(key => {
        const keyTimestamp = parseInt(key.split('-').pop() || '0');
        return key.includes(identifier) && (timestamp - keyTimestamp) < 3000;
      });
      
      if (recentKey) {
        return; // Skip duplicate
      }

      // Mark as tracked
      ctaClickTrackingRef.current.add(ctaKey);
      setTimeout(() => {
        ctaClickTrackingRef.current.delete(ctaKey);
      }, 5000);

      const isBookingCTA =
        (href && (href.includes("booking.zerolatencyvr.com") || href.includes("book"))) ||
        elementText.toLowerCase().includes("book") ||
        clickableElement.classList.contains("booking-cta");

      if (isBookingCTA) {
        // Get source from closest parent with data-cta-source or class
        const sourceElement = target.closest("[data-cta-source]") as HTMLElement;
        const source =
          sourceElement?.dataset.ctaSource ||
          target.closest(".cta")?.className ||
          clickableElement.getAttribute("data-source") ||
          "unknown";

        const trackingData = JSON.stringify({
          uuid: uuidRef.current,
          type: "cta",
          source: source,
          label: elementText || "Booking CTA",
          ctaType: "booking",
          url: href,
        });

        // Use sendBeacon for reliability
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            "/api/visits",
            new Blob([trackingData], { type: "application/json" })
          );
        } else {
          fetch("/api/visits", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: trackingData,
            keepalive: true,
          }).catch(() => {});
        }
      }
    };

    // Only listen to click events - browsers automatically convert touch to click
    document.addEventListener("click", handleCTAClick, true);

    // Track HTML5 video plays
    const handleVideoPlay = (e: Event) => {
      if (!uuidRef.current) return;
      
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : pathname;
      if (currentPath.startsWith('/dashboard')) return;

      const video = e.target as HTMLVideoElement;
      if (!video || video.tagName !== 'VIDEO') return;

      // Skip if video was already tracked by component (has data-video-tracked attribute)
      if (video.hasAttribute('data-video-tracked')) {
        return;
      }

      // Check if we're already tracking this video
      const trackingInfo = videoTrackingRefs.current.get(video);
      if (trackingInfo && trackingInfo.progressInterval) return; // Already tracking

      const videoSrc = video.src || video.currentSrc || '';
      const videoTitle = video.getAttribute('title') || video.getAttribute('aria-label') || 'Unknown Video';
      
      // Additional check: if video was recently tracked (within last 2 seconds), skip
      const recentVideoTrack = Array.from(videoTrackingRefs.current.keys()).find(v => {
        const vSrc = v.src || v.currentSrc || '';
        return vSrc === videoSrc && !v.hasAttribute('data-video-tracked');
      });
      
      if (recentVideoTrack && videoTrackingRefs.current.has(recentVideoTrack)) {
        return; // Same video already being tracked
      }

      // Track video play start
      fetch("/api/visits", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uuid: uuidRef.current,
          type: "video",
          videoSrc: videoSrc,
          videoTitle: videoTitle,
          videoType: "html5",
          duration: 0,
          completion: 0,
        }),
      }).catch((err) => console.error("Failed to track video play:", err));

      // Track video completion/watching progress
      const trackVideoProgress = () => {
        if (!uuidRef.current || video.paused || video.ended) {
          // Clear interval if video is paused or ended
          const info = videoTrackingRefs.current.get(video);
          if (info?.progressInterval) {
            clearInterval(info.progressInterval);
            info.progressInterval = undefined;
          }
          return;
        }
        
        const duration = video.duration || 0;
        const currentTime = video.currentTime || 0;
        const completion = duration > 0 ? (currentTime / duration) * 100 : 0;

        // Send progress update
        fetch("/api/visits", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uuid: uuidRef.current,
            type: "video",
            videoSrc: videoSrc,
            videoTitle: videoTitle,
            videoType: "html5",
            duration: Math.round(currentTime),
            completion: Math.round(completion),
          }),
        }).catch(() => {});
      };

      // Start tracking progress every 10 seconds
      const progressInterval = setInterval(trackVideoProgress, 10000);
      videoTrackingRefs.current.set(video, { progressInterval });

      // Track when video ends
      const handleVideoEnd = () => {
        const duration = video.duration || 0;
        const currentTime = video.currentTime || 0;
        
        fetch("/api/visits", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uuid: uuidRef.current,
            type: "video",
            videoSrc: videoSrc,
            videoTitle: videoTitle,
            videoType: "html5",
            duration: Math.round(currentTime || duration),
            completion: duration > 0 ? Math.round(((currentTime || duration) / duration) * 100) : 100,
          }),
        }).catch(() => {});

        // Cleanup
        const info = videoTrackingRefs.current.get(video);
        if (info?.progressInterval) {
          clearInterval(info.progressInterval);
        }
        videoTrackingRefs.current.delete(video);
        video.removeEventListener('ended', handleVideoEnd);
      };

      video.addEventListener('ended', handleVideoEnd);
    };

    // Track YouTube video plays via iframe API
    const handleYouTubeVideoPlay = () => {
      if (!uuidRef.current) return;
      
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : pathname;
      if (currentPath.startsWith('/dashboard')) return;

      // Listen for messages from YouTube iframes
      const handleMessage = (event: MessageEvent) => {
        // YouTube iframe API sends messages
        if (event.origin !== 'https://www.youtube.com') return;
        
        try {
          const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          
          if (data && data.event === 'onStateChange') {
            // YouTube player state: -1 = unstarted, 0 = ended, 1 = playing, 2 = paused, 3 = buffering, 5 = cued
            if (data.info === 1 || data.info?.playerState === 1) {
              // Video started playing
              const iframe = event.source as Window;
              const iframeElement = document.querySelector('iframe[src*="youtube.com"]') as HTMLIFrameElement;
              const videoId = iframeElement?.src.match(/[?&]v=([^&]+)/)?.[1] || 
                            iframeElement?.src.match(/embed\/([^?]+)/)?.[1] || 
                            'unknown';

              fetch("/api/visits", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  uuid: uuidRef.current,
                  type: "video",
                  videoId: videoId,
                  videoTitle: iframeElement?.title || 'YouTube Video',
                  videoType: "youtube",
                  duration: 0,
                  completion: 0,
                }),
              }).catch((err) => console.error("Failed to track YouTube video:", err));
            }
          }
        } catch (e) {
          // Ignore parse errors
        }
      };

      window.addEventListener('message', handleMessage);

      // Cleanup
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    };

    // Add video event listeners
    document.addEventListener('play', handleVideoPlay, true);
    const youtubeCleanup = handleYouTubeVideoPlay();

    // On page unload, send final beacon
    const handleUnload = () => {
      // Get UUID from ref or window (in case inline script created it)
      const currentUuid = uuidRef.current || (typeof window !== 'undefined' ? window.trackingUUID : null);
      
      // Check both pageLoadedRef and window.trackingPageLoaded (from inline script)
      const pageLoaded = pageLoadedRef.current || (typeof window !== 'undefined' && window.trackingPageLoaded === true);
      
      // If we have a UUID and page loaded, send normal final tracking
      if (currentUuid && pageLoaded) {
        // Finalize scroll tracking
        const finalScrollDepth = scrollDepthRef.current;
        const finalTime = Date.now();
        const finalScrollDuration =
          scrollStartTimeRef.current
            ? finalTime - scrollStartTimeRef.current
            : 0;

        const data = JSON.stringify({
          uuid: currentUuid,
          type: "scroll",
          scrollDepth: finalScrollDepth,
          scrollDelta: finalScrollDuration,
        });
        navigator.sendBeacon(
          "/api/visits",
          new Blob([data], { type: "application/json" })
        );

        // Final session update
        const sessionData = JSON.stringify({ uuid: currentUuid });
        navigator.sendBeacon(
          "/api/visits",
          new Blob([sessionData], { type: "application/json" })
        );
      } else if (currentUuid && !pageLoaded && !leftBeforeLoadSentRef.current) {
        // User left before page fully loaded (but session exists)
        // This includes sessions created by the inline script
        leftBeforeLoadSentRef.current = true;
        const statusData = JSON.stringify({
          uuid: currentUuid,
          type: "status",
          leftBeforeLoad: true,
        });
        
        // Try sendBeacon first
        let sent = false;
        if (navigator.sendBeacon) {
          try {
            sent = navigator.sendBeacon(
              "/api/visits",
              new Blob([statusData], { type: "application/json" })
            );
          } catch (e) {
            // sendBeacon failed, fall through to fetch
          }
        }
        
        // Fallback to fetch with keepalive if sendBeacon failed
        if (!sent) {
          try {
            fetch("/api/visits", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: statusData,
              keepalive: true,
            }).catch(() => {});
          } catch (e) {
            // Both methods failed, but we tried
          }
        }
      } else if (!currentUuid && !leftBeforeLoadSentRef.current) {
        // No session exists - create one immediately with leftBeforeLoad flag
        // This handles cases where:
        // 1. Session creation was started but not completed
        // 2. Session creation never started (component mounted but user left immediately)
        leftBeforeLoadSentRef.current = true;
        const fullUrl = typeof window !== 'undefined' ? window.location.href : '';
        const referrer = typeof document !== 'undefined' ? document.referrer : '';
        const deviceInfo = buildEnvParams(fullUrl, referrer);
        
        // Create session immediately with leftBeforeLoad flag
        const createData = JSON.stringify({
          path: pathname,
          deviceInfo,
          leftBeforeLoad: true,
        });
        
        // Try sendBeacon first (most reliable for unload)
        let sent = false;
        if (navigator.sendBeacon) {
          try {
            sent = navigator.sendBeacon(
              "/api/visits",
              new Blob([createData], { type: "application/json" })
            );
          } catch (e) {
            // sendBeacon failed, fall through to fetch
          }
        }
        
        // Fallback to fetch with keepalive if sendBeacon failed or not available
        if (!sent) {
          try {
            fetch("/api/visits", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: createData,
              keepalive: true,
            }).catch(() => {});
          } catch (e) {
            // Both methods failed, but we tried
          }
        }
      }
    };

    // Handle visibility change (user switches tabs, minimizes, etc.)
    const handleVisibilityChange = () => {
      // Check both pageLoadedRef and window.trackingPageLoaded (from inline script)
      const pageLoaded = pageLoadedRef.current || (typeof window !== 'undefined' && window.trackingPageLoaded === true);
      if (document.visibilityState === 'hidden' && !pageLoaded) {
        // User left before page loaded - use same logic as unload
        // Use a small timeout to allow session creation to complete if it's in progress
        setTimeout(() => {
          handleUnload();
        }, 50);
      }
    };

    // Handle pagehide (more reliable than beforeunload in some browsers, especially mobile)
    const handlePageHide = () => {
      // Check both pageLoadedRef and window.trackingPageLoaded (from inline script)
      const pageLoaded = pageLoadedRef.current || (typeof window !== 'undefined' && window.trackingPageLoaded === true);
      
      // Always try to track if page didn't load, regardless of session state
      if (!pageLoaded) {
        // Try to wait for session if it's still being created (but with short timeout)
        if (initPromiseRef.current && !uuidRef.current) {
          // Race between session creation and timeout
          Promise.race([
            initPromiseRef.current,
            new Promise<string | null>((resolve) => setTimeout(() => resolve(null), 100))
          ]).then(() => {
            handleUnload();
          });
        } else {
          // No pending session or session already exists - track immediately
          handleUnload();
        }
      }
    };

    // Handle beforeunload (less reliable but still useful)
    const handleBeforeUnload = () => {
      handleUnload();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    // Cleanup
    return () => {
      mounted = false;
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      document.removeEventListener("click", handleCTAClick, true);
      ctaClickTrackingRef.current.clear();
      document.removeEventListener('play', handleVideoPlay, true);
      cleanupLoadListener?.();
      
      // Cleanup video tracking intervals
      videoTrackingRefs.current.forEach((info) => {
        if (info.progressInterval) {
          clearInterval(info.progressInterval);
        }
      });
      videoTrackingRefs.current.clear();
      
      if (youtubeCleanup) {
        youtubeCleanup();
      }
      clearInterval(heartbeatInterval);
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}
