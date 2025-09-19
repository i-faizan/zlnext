// lib/meta.ts
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '';

type FbqMethod = 'init' | 'track' | 'consent';
type FbqParams = Record<string, unknown>;

type FbqFn = (method: FbqMethod, arg1?: string | FbqParams, arg2?: FbqParams) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
  }
}

export const fbqTrack = (name: string, params: FbqParams = {}): void => {
  if (!META_PIXEL_ID || typeof window === 'undefined' || !window.fbq) return;
  console.log('FBQ Track:', name, params);
  window.fbq('track', name, params);
};
