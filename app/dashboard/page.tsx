"use client";

import { useState, useEffect, useMemo } from "react";
import { Smartphone, Monitor, HelpCircle, Facebook, Search, Link as LinkIcon, Instagram, Youtube, Twitter, Linkedin, Music2, Trash2, RefreshCw, ExternalLink, Users, Activity, MousePointerClick, Video, Timer, AlertTriangle } from "lucide-react";

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
  duration?: number;
  completion?: number;
}

interface DeviceInfo {
  device_type?: string;
  os_name?: string;
  os_version?: string;
  browser_name?: string;
  browser_version?: string;
  is_webview?: string;
  webview_host?: string;
  screen_resolution?: string;
  viewport?: string;
  device_pixel_ratio?: string;
  language?: string;
  timezone?: string;
  hardware_concurrency?: string;
  device_memory_gb?: string;
  network_effective_type?: string;
  save_data?: string;
  touch_support?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
}

interface Session {
  startTime: number;
  lastSeen: number;
  userAgent?: string;
  referrer?: string;
  deviceInfo?: DeviceInfo;
  pages: PageVisit[];
  ctaClicks: CTAClick[];
  videoPlays: VideoPlay[];
  currentPage?: string;
  totalScrollDuration: number;
  maxScrollDepth: number;
  leftBeforeLoad?: boolean;
}

interface SessionData {
  uuid: string;
  session: Session;
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState<"all" | "active" | "with-cta">("all");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [showLeftBeforeLoadOnly, setShowLeftBeforeLoadOnly] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated && autoRefresh) {
      fetchSessions();
      const interval = setInterval(() => {
        fetchSessions();
        setLastUpdate(new Date());
        setCurrentTime(Date.now()); // Update current time for live page timers
      }, 2000); // Real-time: 2 seconds

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, autoRefresh]);

  // Update current time every second for live page timers
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/dashboard");
      if (res.ok) {
        setIsAuthenticated(true);
        fetchSessions();
      }
    } catch {
      // Not authenticated
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setPassword("");
        fetchSessions();
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/dashboard", { method: "DELETE" });
    setIsAuthenticated(false);
    setSessions([]);
    setExpandedSession(null);
  };

  const handleClearAll = async () => {
    if (!confirm("Are you sure you want to clear all session data? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch("/api/visits", { method: "DELETE" });
      if (res.ok) {
        setSessions([]);
        setExpandedSession(null);
        setLastUpdate(new Date());
      }
    } catch (err) {
      console.error("Failed to clear sessions:", err);
      alert("Failed to clear sessions. Please try again.");
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/dashboard");
      if (res.ok) {
        const data = await res.json();
        // Sort by newest start time (most recent session first)
        const sorted = (data.sessions || []).sort(
          (a: SessionData, b: SessionData) => b.session.startTime - a.session.startTime
        );
        setSessions(sorted);
        setLastUpdate(new Date());
      }
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    }
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes < 60) return `${minutes}m ${secs}s`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Detect device type from user agent
  const getDeviceType = (userAgent?: string): { type: 'mobile' | 'desktop' | 'unknown'; icon: React.ReactElement } => {
    if (!userAgent) {
      return {
        type: 'unknown',
        icon: <HelpCircle className="w-4 h-4 text-gray-400" />,
      };
    }

    const ua = userAgent.toLowerCase();
    
    // Mobile detection
    if (/mobile|android|iphone|ipod|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec|minimo|avantgo|bada|blazer|elaine|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua)) {
      return {
        type: 'mobile',
        icon: <Smartphone className="w-4 h-4 text-blue-500" />,
      };
    }

    // Desktop detection
    if (/windows|macintosh|linux|ubuntu|debian|fedora|redhat|suse|freebsd|openbsd|solaris/i.test(ua)) {
      return {
        type: 'desktop',
        icon: <Monitor className="w-4 h-4 text-green-500" />,
      };
    }

    return {
      type: 'unknown',
      icon: <HelpCircle className="w-4 h-4 text-gray-400" />,
    };
  };

  // Comprehensive traffic source detection
  const getTrafficSource = (referrer?: string, userAgent?: string): { source: string; icon: React.ReactElement; color: string } => {
    // Check if direct (no referrer or empty referrer)
    if (!referrer || referrer.trim() === '' || referrer === 'direct' || referrer === 'null') {
      return {
        source: 'Direct',
        icon: <LinkIcon className="w-4 h-4" />,
        color: 'text-gray-600',
      };
    }

    try {
      const url = new URL(referrer);
      const hostname = url.hostname.toLowerCase();
      const pathname = url.pathname.toLowerCase();
      const searchParams = url.searchParams;
      const refLower = referrer.toLowerCase();
      const ua = (userAgent || '').toLowerCase();

      // ========== GOOGLE SOURCES ==========
      if (hostname.includes('google') || hostname.includes('googleusercontent') || ua.includes('googlebot')) {
        // Google Ads - check for gclid, gclsrc, or other ad parameters
        const hasGclid = searchParams.has('gclid') || searchParams.has('gclsrc') || refLower.includes('gclid=') || refLower.includes('gclsrc=');
        const hasUclick = searchParams.has('uclick') || refLower.includes('uclick=');
        const hasWbraid = searchParams.has('wbraid') || refLower.includes('wbraid=');
        
        if (hasGclid || hasUclick || hasWbraid) {
          return {
            source: 'Google Ads',
            icon: <Search className="w-4 h-4" />,
            color: 'text-red-600',
          };
        }

        // Google Organic Search - check for search query parameters
        const hasSearchQuery = searchParams.has('q') || searchParams.has('query') || 
                              pathname.includes('/search') || 
                              refLower.includes('?q=') || refLower.includes('&q=') ||
                              refLower.includes('/search?') || refLower.includes('/webhp?');
        
        if (hasSearchQuery) {
          return {
            source: 'Google Organic',
            icon: <Search className="w-4 h-4" />,
            color: 'text-green-600',
          };
        }

        // Google Images
        if (pathname.includes('/imgres') || pathname.includes('/imghp') || refLower.includes('tbm=isch')) {
          return {
            source: 'Google Images',
            icon: <Search className="w-4 h-4" />,
            color: 'text-blue-500',
          };
        }

        // Generic Google (could be Maps, News, etc.)
        return {
          source: 'Google',
          icon: <Search className="w-4 h-4" />,
          color: 'text-blue-500',
        };
      }

      // ========== FACEBOOK/META SOURCES ==========
      if (hostname.includes('facebook.com') || hostname.includes('fb.com') || hostname.includes('m.facebook.com') || 
          ua.includes('fban') || ua.includes('fbav') || ua.includes('fbios')) {
        
        // Facebook/Meta Ads - check for ad indicators
        const hasFbclid = searchParams.has('fbclid') || refLower.includes('fbclid=');
        const hasFbClickId = searchParams.has('fbclickid') || refLower.includes('fbclickid=');
        const hasAdId = searchParams.has('ad_id') || refLower.includes('ad_id=');
        const hasClickId = pathname.includes('/l.php') || searchParams.has('h='); // Facebook link wrapper
        
        if (hasFbclid || hasFbClickId || hasAdId || hasClickId) {
          return {
            source: 'Meta Ads',
            icon: <Facebook className="w-4 h-4" />,
            color: 'text-blue-600',
          };
        }

        // Facebook Organic
        return {
          source: 'Facebook Organic',
          icon: <Facebook className="w-4 h-4" />,
          color: 'text-blue-500',
        };
      }

      // ========== INSTAGRAM ==========
      if (hostname.includes('instagram.com') || hostname.includes('instagr.am') || ua.includes('instagram')) {
        // Check for Instagram Ads (often uses fbclid)
        if (searchParams.has('igshid') && (searchParams.has('fbclid') || refLower.includes('fbclid='))) {
          return {
            source: 'Instagram Ads',
            icon: <Instagram className="w-4 h-4" />,
            color: 'text-pink-600',
          };
        }
        return {
          source: 'Instagram',
          icon: <Instagram className="w-4 h-4" />,
          color: 'text-pink-500',
        };
      }

      // ========== YOUTUBE ==========
      if (hostname.includes('youtube.com') || hostname.includes('youtu.be') || hostname.includes('youtube-nocookie.com')) {
        return {
          source: 'YouTube',
          icon: <Youtube className="w-4 h-4" />,
          color: 'text-red-600',
        };
      }

      // ========== TIKTOK ==========
      if (hostname.includes('tiktok.com') || ua.includes('tiktok') || ua.includes('musical')) {
        // Check for TikTok Ads
        if (searchParams.has('tt_medium') || searchParams.has('tt_campaign') || refLower.includes('tt_medium=')) {
          return {
            source: 'TikTok Ads',
            icon: <Music2 className="w-4 h-4" />,
            color: 'text-black',
          };
        }
        return {
          source: 'TikTok',
          icon: <Music2 className="w-4 h-4" />,
          color: 'text-black',
        };
      }

      // ========== TWITTER/X ==========
      if (hostname.includes('twitter.com') || hostname.includes('x.com') || hostname.includes('t.co') || ua.includes('twitter')) {
        return {
          source: 'Twitter/X',
          icon: <Twitter className="w-4 h-4" />,
          color: 'text-black',
        };
      }

      // ========== LINKEDIN ==========
      if (hostname.includes('linkedin.com') || ua.includes('linkedin')) {
        // Check for LinkedIn Ads
        if (searchParams.has('trk') || searchParams.has('utm_campaign') || refLower.includes('trk=')) {
          return {
            source: 'LinkedIn Ads',
            icon: <Linkedin className="w-4 h-4" />,
            color: 'text-blue-700',
          };
        }
        return {
          source: 'LinkedIn',
          icon: <Linkedin className="w-4 h-4" />,
          color: 'text-blue-700',
        };
      }

      // ========== OTHER SEARCH ENGINES ==========
      if (hostname.includes('bing.com')) {
        if (searchParams.has('msclkid') || refLower.includes('msclkid=')) {
          return {
            source: 'Bing Ads',
            icon: <Search className="w-4 h-4" />,
            color: 'text-orange-600',
          };
        }
        if (searchParams.has('q') || pathname.includes('/search')) {
          return {
            source: 'Bing Organic',
            icon: <Search className="w-4 h-4" />,
            color: 'text-orange-500',
          };
        }
        return {
          source: 'Bing',
          icon: <Search className="w-4 h-4" />,
          color: 'text-orange-500',
        };
      }

      if (hostname.includes('yahoo.com') || hostname.includes('search.yahoo.com')) {
        return {
          source: 'Yahoo',
          icon: <Search className="w-4 h-4" />,
          color: 'text-purple-600',
        };
      }

      if (hostname.includes('duckduckgo.com')) {
        return {
          source: 'DuckDuckGo',
          icon: <Search className="w-4 h-4" />,
          color: 'text-yellow-600',
        };
      }

      // ========== SOCIAL MEDIA ==========
      if (hostname.includes('reddit.com')) {
        return {
          source: 'Reddit',
          icon: <LinkIcon className="w-4 h-4" />,
          color: 'text-orange-600',
        };
      }

      if (hostname.includes('pinterest.com')) {
        return {
          source: 'Pinterest',
          icon: <LinkIcon className="w-4 h-4" />,
          color: 'text-red-500',
        };
      }

      // ========== CHECK FOR UTM PARAMETERS ==========
      // If we have UTM parameters, use them as a hint
      const utmSource = searchParams.get('utm_source')?.toLowerCase();
      const utmMedium = searchParams.get('utm_medium')?.toLowerCase();
      const utmCampaign = searchParams.get('utm_campaign')?.toLowerCase();

      if (utmSource) {
        // Meta/Facebook Ads
        if (utmSource.includes('facebook') && (utmMedium?.includes('cpc') || utmCampaign)) {
          return {
            source: 'Meta Ads',
            icon: <Facebook className="w-4 h-4" />,
            color: 'text-blue-600',
          };
        }
        // Google Ads via UTM
        if (utmSource.includes('google') && utmMedium?.includes('cpc')) {
          return {
            source: 'Google Ads',
            icon: <Search className="w-4 h-4" />,
            color: 'text-red-600',
          };
        }
      }

      // ========== EXTERNAL REFERRER ==========
      // Return the hostname as source
      const cleanHostname = hostname.replace('www.', '').split('.')[0];
      return {
        source: cleanHostname.charAt(0).toUpperCase() + cleanHostname.slice(1),
        icon: <ExternalLink className="w-4 h-4" />,
        color: 'text-gray-600',
      };

    } catch {
      // If URL parsing fails, return Other
      return {
        source: 'Other',
        icon: <LinkIcon className="w-4 h-4" />,
        color: 'text-gray-600',
      };
    }
  };

  const getTotalTime = (session: Session) => {
    return Math.round((session.lastSeen - session.startTime) / 1000);
  };

  const isSessionActive = (session: Session) => {
    const timeSinceLastSeen = Date.now() - session.lastSeen;
    return timeSinceLastSeen < 60000; // Active if seen in last minute
  };

  // Filter and search sessions
  const filteredSessions = useMemo(() => {
    let filtered = sessions;

    if (filterActive === "active") {
      filtered = filtered.filter((s) => isSessionActive(s.session));
    } else if (filterActive === "with-cta") {
      filtered = filtered.filter((s) => s.session.ctaClicks.length > 0);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((s) => {
        const session = s.session;
        return (
          s.uuid.toLowerCase().includes(query) ||
          session.userAgent?.toLowerCase().includes(query) ||
          session.referrer?.toLowerCase().includes(query) ||
          session.pages.some((p) => p.path.toLowerCase().includes(query)) ||
          session.ctaClicks.some((c) => c.label.toLowerCase().includes(query))
        );
      });
    }

    if (showLeftBeforeLoadOnly) {
      filtered = filtered.filter((s) => s.session.leftBeforeLoad);
    }

    return filtered;
  }, [sessions, filterActive, searchQuery, showLeftBeforeLoadOnly]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalSessions = sessions.length;
    const activeSessions = sessions.filter((s) => isSessionActive(s.session)).length;
    const totalBookingClicks = sessions.reduce(
      (sum, s) => sum + s.session.ctaClicks.filter((c) => c.type === "booking").length,
      0
    );
    const totalPages = sessions.reduce((sum, s) => sum + s.session.pages.length, 0);
    const totalVideoPlays = sessions.reduce((sum, s) => sum + (s.session.videoPlays?.length || 0), 0);
    const avgTime = sessions.length > 0
      ? Math.round(sessions.reduce((sum, s) => sum + getTotalTime(s.session), 0) / sessions.length)
      : 0;

    return {
      totalSessions,
      activeSessions,
      totalBookingClicks,
      totalPages,
      totalVideoPlays,
      avgTime,
    };
  }, [sessions]);

  const leftBeforeLoadCount = sessions.filter((s) => s.session.leftBeforeLoad).length;

  const statCards = [
    {
      label: "Total Sessions",
      value: stats.totalSessions,
      description: "Visitors tracked today",
      icon: Users,
      accent: "bg-white border-gray-200",
    },
    {
      label: "Active Now",
      value: stats.activeSessions,
      description: "Live on site",
      icon: Activity,
      accent: "bg-green-50 border-green-100",
    },
    {
      label: "Bookings",
      value: stats.totalBookingClicks,
      description: "CTA conversions",
      icon: MousePointerClick,
      accent: "bg-purple-50 border-purple-100",
    },
    {
      label: "Pages Viewed",
      value: stats.totalPages,
      description: "Total pageviews",
      icon: Activity,
      accent: "bg-blue-50 border-blue-100",
    },
    {
      label: "Videos",
      value: stats.totalVideoPlays,
      description: "Video interactions",
      icon: Video,
      accent: "bg-yellow-50 border-yellow-100",
    },
    {
      label: "Avg. Time",
      value: formatDuration(stats.avgTime),
      description: "Per visitor",
      icon: Timer,
      accent: "bg-orange-50 border-orange-100",
    },
  ];

  const toggleSessionExpansion = (uuid: string) => {
    setExpandedSession(expandedSession === uuid ? null : uuid);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Enter your password to continue</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter password"
                required
                autoFocus
              />
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`h-2 w-2 rounded-full flex-shrink-0 ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {autoRefresh ? `Live • Updated ${formatTimeAgo(lastUpdate.getTime())}` : 'Paused'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={fetchSessions}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center gap-2 whitespace-nowrap"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-medium flex items-center gap-2 whitespace-nowrap"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium whitespace-nowrap"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {statCards.map(({ label, value, description, icon: Icon, accent }) => (
            <div key={label} className={`rounded-xl border shadow-sm p-4 flex flex-col gap-2 ${accent}`}>
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-gray-600">
                <span>{label}</span>
                <Icon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-200/80">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by session ID, page, referrer, device..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wide text-gray-500">Auto Refresh</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                  />
                  <span className={`w-10 h-5 flex items-center bg-gray-200 rounded-full p-1 transition ${autoRefresh ? 'bg-blue-500' : ''}`}>
                    <span className={`bg-white w-4 h-4 rounded-full shadow transform transition ${autoRefresh ? 'translate-x-5' : ''}`} />
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-gray-500">
                <span>Quick Filters</span>
                <span className="text-gray-400">Tap to focus</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: `All (${sessions.length})` },
                  { key: "active", label: `Active (${stats.activeSessions})` },
                  { key: "with-cta", label: `With CTA (${sessions.filter(s => s.session.ctaClicks.length > 0).length})` },
                ].map((chip) => (
                  <button
                    key={chip.key}
                    onClick={() => setFilterActive(chip.key as typeof filterActive)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                      filterActive === chip.key
                        ? "bg-blue-600 text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-dashed border-gray-200">
              <button
                onClick={() => setShowLeftBeforeLoadOnly((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  showLeftBeforeLoadOnly ? "bg-red-600 text-white" : "bg-red-50 text-red-700"
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                Left before load ({leftBeforeLoadCount})
              </button>
              <span className="text-xs text-gray-500">
                Showing <strong>{filteredSessions.length}</strong> of {sessions.length} sessions
              </span>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        {filteredSessions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center text-gray-500 border border-gray-200">
            <div className="text-lg font-medium mb-2">No sessions found</div>
            <div className="text-sm">
              {sessions.length === 0
                ? "No sessions tracked yet. Sessions will appear here as users visit your website."
                : "Try adjusting your search or filter criteria."}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSessions.map((sessionData) => {
              const session = sessionData.session;
              const totalTime = getTotalTime(session);
              const active = isSessionActive(session);
              const hasBookingClicks = session.ctaClicks.some((c) => c.type === "booking");
              const bookingCount = session.ctaClicks.filter((c) => c.type === "booking").length;
              const videoPlaysCount = session.videoPlays?.length || 0;
              const isExpanded = expandedSession === sessionData.uuid;
              const deviceInfo = getDeviceType(session.userAgent);
              const trafficSource = getTrafficSource(session.referrer, session.userAgent);

              return (
                <div
                  key={sessionData.uuid}
                  className="bg-white/95 backdrop-blur rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Compact Session Card */}
                  <div
                    onClick={() => toggleSessionExpansion(sessionData.uuid)}
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: UUID, Device, Source, and Time */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <code className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                            {sessionData.uuid.substring(0, 8)}...
                          </code>
                          {/* Device Icon */}
                          <div className="flex items-center gap-1" title={deviceInfo.type}>
                            {deviceInfo.icon}
                            <span className="text-xs text-gray-600 capitalize">{deviceInfo.type}</span>
                          </div>
                          {/* Traffic Source */}
                          <div className={`flex items-center gap-1 ${trafficSource.color}`} title={trafficSource.source}>
                            {trafficSource.icon}
                            <span className="text-xs font-medium">{trafficSource.source}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                              session.leftBeforeLoad
                                ? "bg-red-100 text-red-700"
                                : active
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                session.leftBeforeLoad ? "bg-red-500" : active ? "bg-green-500 animate-pulse" : "bg-gray-400"
                              }`}
                            />
                            {session.leftBeforeLoad ? "Closed Before Load" : active ? "Active" : "Idle"}
                          </span>
                          {hasBookingClicks && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                              ✓ Booked ({bookingCount})
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          Started {formatDate(session.startTime)} • Last seen {formatTimeAgo(session.lastSeen)}
                        </div>
                      </div>

                      {/* Right: Metrics */}
                      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm flex-shrink-0">
                        <div className="text-center hidden sm:block">
                          <div className="text-gray-500 text-xs mb-0.5">Time</div>
                          <div className="font-semibold text-gray-900 whitespace-nowrap">{formatDuration(totalTime)}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500 text-xs mb-0.5">Pages</div>
                          <div className="font-semibold text-gray-900">{session.pages.length}</div>
                        </div>
                        <div className="text-center hidden md:block">
                          <div className="text-gray-500 text-xs mb-0.5">Scroll</div>
                          <div className="font-semibold text-gray-900">{session.maxScrollDepth.toFixed(0)}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500 text-xs mb-0.5">CTAs</div>
                          <div className="font-semibold text-gray-900">{session.ctaClicks.length}</div>
                        </div>
                        <div className="text-center hidden lg:block">
                          <div className="text-gray-500 text-xs mb-0.5">Videos</div>
                          <div className="font-semibold text-gray-900">{videoPlaysCount}</div>
                        </div>
                        <div className="ml-1 sm:ml-2">
                          <svg
                            className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {/* Session Info */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Session Details</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Session ID:</span>
                              <code className="text-xs font-mono text-gray-900">{sessionData.uuid}</code>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Started:</span>
                              <span className="text-gray-900">{new Date(session.startTime).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Last Seen:</span>
                              <span className="text-gray-900">{new Date(session.lastSeen).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Time:</span>
                              <span className="text-gray-900 font-medium">{formatDuration(totalTime)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Max Scroll Depth:</span>
                              <span className="text-gray-900 font-medium">{session.maxScrollDepth.toFixed(1)}%</span>
                            </div>
                          {session.leftBeforeLoad && (
                            <div className="flex items-start gap-2 mt-2 p-2 rounded bg-red-50 border border-red-100 text-xs text-red-700">
                              <span className="font-semibold">Heads up:</span>
                              <span>This visitor closed the page before it fully loaded.</span>
                            </div>
                          )}
                            {session.referrer && (
                              <div className="pt-2 border-t border-gray-200">
                                <div className="text-gray-600 mb-1">Referrer:</div>
                                <div className="text-xs text-gray-900 break-all">{session.referrer}</div>
                              </div>
                            )}
                            {session.deviceInfo && (
                              <>
                                <div className="pt-2 border-t border-gray-200">
                                  <div className="text-gray-600 mb-2 font-semibold">Device Information</div>
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    {session.deviceInfo.device_type && (
                                      <div>
                                        <span className="text-gray-500">Device:</span>
                                        <span className="ml-1 text-gray-900 font-medium">{session.deviceInfo.device_type}</span>
                                      </div>
                                    )}
                                    {session.deviceInfo.os_name && (
                                      <div>
                                        <span className="text-gray-500">OS:</span>
                                        <span className="ml-1 text-gray-900 font-medium">
                                          {session.deviceInfo.os_name} {session.deviceInfo.os_version}
                                        </span>
                                      </div>
                                    )}
                                    {session.deviceInfo.browser_name && (
                                      <div>
                                        <span className="text-gray-500">Browser:</span>
                                        <span className="ml-1 text-gray-900 font-medium">
                                          {session.deviceInfo.browser_name} {session.deviceInfo.browser_version}
                                        </span>
                                      </div>
                                    )}
                                    {session.deviceInfo.screen_resolution && (
                                      <div>
                                        <span className="text-gray-500">Screen:</span>
                                        <span className="ml-1 text-gray-900 font-medium">{session.deviceInfo.screen_resolution}</span>
                                      </div>
                                    )}
                                    {session.deviceInfo.viewport && (
                                      <div>
                                        <span className="text-gray-500">Viewport:</span>
                                        <span className="ml-1 text-gray-900 font-medium">{session.deviceInfo.viewport}</span>
                                      </div>
                                    )}
                                    {session.deviceInfo.language && (
                                      <div>
                                        <span className="text-gray-500">Language:</span>
                                        <span className="ml-1 text-gray-900 font-medium">{session.deviceInfo.language}</span>
                                      </div>
                                    )}
                                    {session.deviceInfo.timezone && (
                                      <div>
                                        <span className="text-gray-500">Timezone:</span>
                                        <span className="ml-1 text-gray-900 font-medium">{session.deviceInfo.timezone}</span>
                                      </div>
                                    )}
                                    {session.deviceInfo.is_webview === 'true' && (
                                      <div>
                                        <span className="text-gray-500">WebView:</span>
                                        <span className="ml-1 text-gray-900 font-medium">
                                          Yes {session.deviceInfo.webview_host && `(${session.deviceInfo.webview_host})`}
                                        </span>
                                      </div>
                                    )}
                                    {session.deviceInfo.network_effective_type && (
                                      <div>
                                        <span className="text-gray-500">Network:</span>
                                        <span className="ml-1 text-gray-900 font-medium">{session.deviceInfo.network_effective_type}</span>
                                      </div>
                                    )}
                                    {session.deviceInfo.touch_support && (
                                      <div>
                                        <span className="text-gray-500">Touch:</span>
                                        <span className="ml-1 text-gray-900 font-medium">
                                          {session.deviceInfo.touch_support === 'true' ? 'Yes' : 'No'}
                                        </span>
                                      </div>
                                    )}
                                    {session.deviceInfo.hardware_concurrency && (
                                      <div>
                                        <span className="text-gray-500">CPU Cores:</span>
                                        <span className="ml-1 text-gray-900 font-medium">{session.deviceInfo.hardware_concurrency}</span>
                                      </div>
                                    )}
                                    {session.deviceInfo.device_memory_gb && (
                                      <div>
                                        <span className="text-gray-500">Memory:</span>
                                        <span className="ml-1 text-gray-900 font-medium">{session.deviceInfo.device_memory_gb} GB</span>
                                      </div>
                                    )}
                                  </div>
                                  {(session.deviceInfo.utm_source || session.deviceInfo.utm_medium || session.deviceInfo.utm_campaign) && (
                                    <div className="mt-3 pt-2 border-t border-gray-200">
                                      <div className="text-gray-600 mb-2 font-semibold">UTM Parameters</div>
                                      <div className="grid grid-cols-2 gap-2 text-xs">
                                        {session.deviceInfo.utm_source && (
                                          <div>
                                            <span className="text-gray-500">Source:</span>
                                            <span className="ml-1 text-gray-900 font-medium">{session.deviceInfo.utm_source}</span>
                                          </div>
                                        )}
                                        {session.deviceInfo.utm_medium && (
                                          <div>
                                            <span className="text-gray-500">Medium:</span>
                                            <span className="ml-1 text-gray-900 font-medium">{session.deviceInfo.utm_medium}</span>
                                          </div>
                                        )}
                                        {session.deviceInfo.utm_campaign && (
                                          <div>
                                            <span className="text-gray-500">Campaign:</span>
                                            <span className="ml-1 text-gray-900 font-medium">{session.deviceInfo.utm_campaign}</span>
                                          </div>
                                        )}
                                        {session.deviceInfo.utm_content && (
                                          <div>
                                            <span className="text-gray-500">Content:</span>
                                            <span className="ml-1 text-gray-900 font-medium">{session.deviceInfo.utm_content}</span>
                                          </div>
                                        )}
                                        {session.deviceInfo.utm_term && (
                                          <div>
                                            <span className="text-gray-500">Term:</span>
                                            <span className="ml-1 text-gray-900 font-medium">{session.deviceInfo.utm_term}</span>
                                          </div>
                                        )}
                                        {session.deviceInfo.fbclid && (
                                          <div>
                                            <span className="text-gray-500">FB Click ID:</span>
                                            <span className="ml-1 text-gray-900 font-medium text-xs truncate">{session.deviceInfo.fbclid}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                            <div className="pt-2 border-t border-gray-200">
                              <div className="text-gray-600 mb-1">User Agent:</div>
                              <div className="text-xs text-gray-900 break-all">{session.userAgent || "Unknown"}</div>
                            </div>
                          </div>
                        </div>

                        {/* Current Page */}
                        {session.currentPage && (
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Current Page</h3>
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="font-medium text-gray-900 mb-2">{session.currentPage}</div>
                              <div className="text-xs text-gray-500">
                                Viewing now • Started {formatTimeAgo(session.pages[session.pages.length - 1]?.startTime || session.startTime)}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Page Visits */}
                      {session.pages.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                            Page Visits ({session.pages.length})
                          </h3>
                          <div className="space-y-2 max-h-64 overflow-y-auto pl-1">
                            {session.pages.map((page, index) => {
                              const sessionIsActive = isSessionActive(session);
                              const effectiveNow = sessionIsActive ? currentTime : session.lastSeen;
                              // Calculate duration: if it's the current page and has no endTime, use current time
                              const isCurrentPage = index === session.pages.length - 1 && !page.endTime;
                              const pageDuration = isCurrentPage 
                                ? Math.max(0, Math.round(((effectiveNow ?? page.startTime) - page.startTime) / 1000))
                                : (page.duration !== undefined ? page.duration : 0);
                              
                              return (
                                <div
                                  key={index}
                                  className="relative bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between pl-6 before:absolute before:left-2 before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-200"
                                >
                                  <span className="absolute left-1 top-4 h-2 w-2 rounded-full bg-blue-500" />
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm text-gray-900 truncate">
                                      {page.path}
                                      {isCurrentPage && (
                                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                                          Current
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {formatDate(page.startTime)}
                                      {pageDuration > 0 && ` • ${formatDuration(pageDuration)}`}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4 ml-4 text-xs">
                                    <div className="text-right">
                                      <div className="text-gray-500">Scroll</div>
                                      <div className="font-medium text-gray-900">{page.scrollDepth.toFixed(0)}%</div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-gray-500">Time</div>
                                      <div className="font-medium text-gray-900">
                                        {formatDuration(Math.round(page.scrollDuration / 1000))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Video Plays */}
                      {session.videoPlays && session.videoPlays.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                            Videos Played ({session.videoPlays.length})
                          </h3>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {session.videoPlays.map((video, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm text-gray-900">
                                      {video.videoTitle || video.videoId || video.videoSrc || 'Unknown Video'}
                                    </span>
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                                      video.videoType === 'youtube' 
                                        ? 'bg-red-100 text-red-700' 
                                        : 'bg-blue-100 text-blue-700'
                                    }`}>
                                      {video.videoType === 'youtube' ? 'YouTube' : 'HTML5'}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-600 space-y-1">
                                    <div>{formatDate(video.timestamp)}</div>
                                    {video.duration !== undefined && video.duration > 0 && (
                                      <div>Watched: {formatDuration(video.duration)}</div>
                                    )}
                                    {video.completion !== undefined && (
                                      <div>Completion: {video.completion.toFixed(0)}%</div>
                                    )}
                                  </div>
                                  {video.videoId && (
                                    <div className="text-xs text-blue-600 truncate mt-1">
                                      ID: {video.videoId}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA Clicks */}
                      {session.ctaClicks.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                            CTA Clicks ({session.ctaClicks.length})
                          </h3>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {session.ctaClicks.map((cta, index) => (
                              <div
                                key={index}
                                className={`rounded-lg p-3 border flex items-center justify-between ${
                                  cta.type === "booking"
                                    ? "bg-purple-50 border-purple-200"
                                    : "bg-white border-gray-200"
                                }`}
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm text-gray-900">{cta.label}</span>
                                    {cta.type === "booking" && (
                                      <span className="px-2 py-0.5 bg-purple-600 text-white text-xs font-medium rounded">
                                        BOOKING
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    Source: {cta.source} • {formatDate(cta.timestamp)}
                                  </div>
                                  {cta.url && (
                                    <div className="text-xs text-blue-600 truncate mt-1">{cta.url}</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}