import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new Response('Missing ?url=', { status: 400 });

  try {
    const upstream = await fetch(url, {
      redirect: 'follow',
      headers: { 'accept-encoding': 'identity' }, // avoid gzip/br issues
      cache: 'no-store',
    });

    const code = await upstream.arrayBuffer();
    const headers = new Headers();
    headers.set('content-type', 'application/javascript; charset=utf-8');
    headers.set('cache-control', 'public, max-age=600');
    headers.set('access-control-allow-origin', '*');

    return new Response(code, { status: upstream.status, statusText: upstream.statusText, headers });
  } catch {
    return new Response('Proxy fetch failed', { status: 502 });
  }
}
