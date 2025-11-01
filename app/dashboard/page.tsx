"use client";

import { useState, useEffect, useMemo } from "react";
import { Smartphone, Monitor, HelpCircle, Facebook, Search, Link as LinkIcon } from "lucide-react";

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

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated && autoRefresh) {
      fetchSessions();
      const interval = setInterval(() => {
        fetchSessions();
        setLastUpdate(new Date());
      }, 2000); // Real-time: 2 seconds

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, autoRefresh]);

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

  // Detect traffic source from referrer
  const getTrafficSource = (referrer?: string, userAgent?: string): { source: string; icon: React.ReactElement; color: string } => {
    // Check if direct (no referrer)
    if (!referrer || referrer.trim() === '' || referrer === 'direct') {
      return {
        source: 'Direct',
        icon: <LinkIcon className="w-4 h-4" />,
        color: 'text-gray-600',
      };
    }

    const ref = referrer.toLowerCase();
    const ua = (userAgent || '').toLowerCase();

    // Facebook detection
    if (ref.includes('facebook.com') || ref.includes('fb.com') || ref.includes('fbclid') || ua.includes('fban') || ua.includes('fbav')) {
      // Check if it's from ads (fbclid parameter usually indicates ads)
      if (ref.includes('fbclid') || ref.includes('fbclickid')) {
        return {
          source: 'Facebook Ads',
          icon: <Facebook className="w-4 h-4" />,
          color: 'text-blue-600',
        };
      }
      return {
        source: 'Facebook Organic',
        icon: <Facebook className="w-4 h-4" />,
        color: 'text-blue-500',
      };
    }

    // Instagram (owned by Facebook)
    if (ref.includes('instagram.com') || ua.includes('instagram')) {
      return {
        source: 'Instagram',
        icon: <Facebook className="w-4 h-4" />,
        color: 'text-pink-600',
      };
    }

    // Google detection
    if (ref.includes('google.com') || ref.includes('googleusercontent.com') || ref.includes('googlebot')) {
      // Check for Google Ads indicators (gclid parameter)
      if (ref.includes('gclid') || ref.includes('gclsrc')) {
        return {
          source: 'Google Ads',
          icon: <Search className="w-4 h-4" />,
          color: 'text-red-600',
        };
      }
      // Check if it's a search (usually has query parameters like q=, search?q=, etc.)
      if (ref.includes('/search') || ref.includes('?q=') || ref.includes('&q=')) {
        return {
          source: 'Google Organic',
          icon: <Search className="w-4 h-4" />,
          color: 'text-green-600',
        };
      }
      return {
        source: 'Google',
        icon: <Search className="w-4 h-4" />,
        color: 'text-blue-500',
      };
    }

    // TikTok
    if (ref.includes('tiktok.com') || ua.includes('tiktok')) {
      return {
        source: 'TikTok',
        icon: <LinkIcon className="w-4 h-4" />,
        color: 'text-black',
      };
    }

    // YouTube
    if (ref.includes('youtube.com') || ref.includes('youtu.be')) {
      return {
        source: 'YouTube',
        icon: <LinkIcon className="w-4 h-4" />,
        color: 'text-red-600',
      };
    }

    // Twitter/X
    if (ref.includes('twitter.com') || ref.includes('x.com') || ref.includes('t.co')) {
      return {
        source: 'Twitter/X',
        icon: <LinkIcon className="w-4 h-4" />,
        color: 'text-black',
      };
    }

    // LinkedIn
    if (ref.includes('linkedin.com')) {
      return {
        source: 'LinkedIn',
        icon: <LinkIcon className="w-4 h-4" />,
        color: 'text-blue-700',
      };
    }

    // Other referrer (external site)
    try {
      const url = new URL(referrer);
      return {
        source: url.hostname.replace('www.', ''),
        icon: <LinkIcon className="w-4 h-4" />,
        color: 'text-gray-600',
      };
    } catch {
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

    return filtered;
  }, [sessions, filterActive, searchQuery]);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className={`h-2 w-2 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <p className="text-sm text-gray-500">
                  {autoRefresh ? `Live • Updated ${formatTimeAgo(lastUpdate.getTime())}` : 'Paused'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Auto-refresh</span>
              </label>
              <button
                onClick={fetchSessions}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                Refresh Now
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Sessions</div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalSessions}</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow-sm p-4 border border-green-200">
            <div className="text-xs text-green-700 uppercase tracking-wide mb-1">Active Now</div>
            <div className="text-2xl font-bold text-green-900">{stats.activeSessions}</div>
          </div>
          <div className="bg-purple-50 rounded-lg shadow-sm p-4 border border-purple-200">
            <div className="text-xs text-purple-700 uppercase tracking-wide mb-1">Bookings</div>
            <div className="text-2xl font-bold text-purple-900">{stats.totalBookingClicks}</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-sm p-4 border border-blue-200">
            <div className="text-xs text-blue-700 uppercase tracking-wide mb-1">Pages Viewed</div>
            <div className="text-2xl font-bold text-blue-900">{stats.totalPages}</div>
          </div>
          <div className="bg-orange-50 rounded-lg shadow-sm p-4 border border-orange-200">
            <div className="text-xs text-orange-700 uppercase tracking-wide mb-1">Avg. Time</div>
            <div className="text-2xl font-bold text-orange-900">{formatDuration(stats.avgTime)}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterActive("all")}
                className={`px-4 py-2 rounded-lg transition font-medium text-sm ${
                  filterActive === "all"
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All ({sessions.length})
              </button>
              <button
                onClick={() => setFilterActive("active")}
                className={`px-4 py-2 rounded-lg transition font-medium text-sm ${
                  filterActive === "active"
                    ? "bg-green-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Active ({stats.activeSessions})
              </button>
              <button
                onClick={() => setFilterActive("with-cta")}
                className={`px-4 py-2 rounded-lg transition font-medium text-sm ${
                  filterActive === "with-cta"
                    ? "bg-purple-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                With CTA ({sessions.filter(s => s.session.ctaClicks.length > 0).length})
              </button>
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
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
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
                          <code className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
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
                          {active && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                              <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                              Active
                            </span>
                          )}
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
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="text-gray-500 text-xs mb-0.5">Time</div>
                          <div className="font-semibold text-gray-900">{formatDuration(totalTime)}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500 text-xs mb-0.5">Pages</div>
                          <div className="font-semibold text-gray-900">{session.pages.length}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500 text-xs mb-0.5">Scroll</div>
                          <div className="font-semibold text-gray-900">{session.maxScrollDepth.toFixed(0)}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500 text-xs mb-0.5">CTAs</div>
                          <div className="font-semibold text-gray-900">{session.ctaClicks.length}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-500 text-xs mb-0.5">Videos</div>
                          <div className="font-semibold text-gray-900">{videoPlaysCount}</div>
                        </div>
                        <div className="ml-2">
                          <svg
                            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
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
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                            {session.referrer && (
                              <div className="pt-2 border-t border-gray-200">
                                <div className="text-gray-600 mb-1">Referrer:</div>
                                <div className="text-xs text-gray-900 break-all">{session.referrer}</div>
                              </div>
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
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {session.pages.map((page, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm text-gray-900 truncate">{page.path}</div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {formatDate(page.startTime)}
                                    {page.duration !== undefined && ` • ${page.duration}s`}
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
                            ))}
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