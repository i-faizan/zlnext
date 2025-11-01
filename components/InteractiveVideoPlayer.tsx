// components/InteractiveVideoPlayer.tsx

'use client'; // This directive marks this as a Client Component

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

// Define the props the component will accept
type InteractiveVideoPlayerProps = {
    videoSrc: string;
    thumbnailSrc: string;
    thumbnailAlt: string;
};

export default function InteractiveVideoPlayer({ videoSrc, thumbnailSrc, thumbnailAlt }: InteractiveVideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const playStartTimeRef = useRef<number | null>(null);
    const hasTrackedPlay = useRef<boolean>(false);

    const trackVideoPlay = () => {
        // Prevent duplicate tracking - if already tracked, skip
        if (hasTrackedPlay.current) return;

        const trackingUUID = (window as any).trackingUUID;
        if (!trackingUUID) return;

        hasTrackedPlay.current = true;
        playStartTimeRef.current = Date.now();
        const videoTitle = thumbnailAlt || 'Video';

        // Mark video element to prevent EnhancedTracking from also tracking
        if (videoRef.current) {
            videoRef.current.setAttribute('data-video-tracked', 'true');
        }

        fetch("/api/visits", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                uuid: trackingUUID,
                type: "video",
                videoSrc: videoSrc,
                videoTitle: videoTitle,
                videoType: "html5",
                duration: 0,
                completion: 0,
            }),
        }).catch(() => {});
    };

    const trackVideoEnd = () => {
        const trackingUUID = (window as any).trackingUUID;
        if (!trackingUUID || !playStartTimeRef.current) return;

        const video = videoRef.current;
        const duration = video ? Math.round(video.duration || 0) : Math.round((Date.now() - playStartTimeRef.current) / 1000);
        const videoTitle = thumbnailAlt || 'Video';

        fetch("/api/visits", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                uuid: trackingUUID,
                type: "video",
                videoSrc: videoSrc,
                videoTitle: videoTitle,
                videoType: "html5",
                duration: duration,
                completion: 100,
            }),
        }).catch(() => {});
        
        playStartTimeRef.current = null;
        hasTrackedPlay.current = false; // Reset for potential replay
        if (video) {
            video.removeAttribute('data-video-tracked');
        }
    };

    const handlePlayClick = () => {
        const video = videoRef.current;
        if (video) {
            // The video element's native events will handle setting isPlaying state
            video.play();
            trackVideoPlay();
        }
    };
    
    // This allows clicking the video itself to pause it
    const handleVideoClick = () => {
        const video = videoRef.current;
        if (video && !video.paused) {
            video.pause();
        }
    }

    return (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-800">
            <video
            id="video"
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover"
                loop
                playsInline
                controls={false}
                onClick={handleVideoClick}
                onPlay={() => {
                    setIsPlaying(true);
                    // Only track if not already tracked (prevents duplicate from EnhancedTracking)
                    if (!playStartTimeRef.current && !hasTrackedPlay.current) {
                        trackVideoPlay();
                    }
                }}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                    setIsPlaying(false);
                    trackVideoEnd();
                }}
            />
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer" onClick={handlePlayClick}>
                    {/* Custom Thumbnail */}
                    <Image
                        src={thumbnailSrc}
                        alt={thumbnailAlt}
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        priority
                    />
                    {/* Play Button Overlay */}
                    <div className="z-10 bg-cyan-500/80 p-5 rounded-full backdrop-blur-sm hover:bg-cyan-500 scale-100 hover:scale-110 transition-all duration-300">
                        <Play size={60} className="text-white fill-white ml-1" />
                    </div>
                </div>
            )}
        </div>
    );
}