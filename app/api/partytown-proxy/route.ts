// app/api/partytown-proxy/route.ts
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // ensure Node runtime (edge egress can be blocked)

function err(msg: string, status = 500) {
  return new Response(msg, {
    status,
    headers: {
      'x-proxy-error': msg,
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get('url');
  if (!target) return err('Missing url', 400);

  let u: URL;
  try { u = new URL(target); } catch { return err('Bad url', 400); }

  // allowlist for safety
  const allow = new Set([
    'connect.facebook.net',
    'www.googletagmanager.com',
    'www.google-analytics.com',
  ]);
  if (!allow.has(u.hostname)) return err(`Host not allowed: ${u.hostname}`, 403);

  let upstream: Response;
  try {
    upstream = await fetch(u.toString(), {
      // Ask for identity (no gzip/br), so body is plain text and decoding is trivial
      headers: {
        'accept': 'text/javascript,application/javascript;q=0.9,*/*;q=0.8',
        'accept-encoding': 'identity',
        'user-agent': req.headers.get('user-agent') ?? '',
      },
      redirect: 'follow',
      cache: 'no-store',
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return err(`Fetch error: ${msg}`, 502);
  }

  if (!upstream.ok) {
    const snippet = await upstream.text().catch(() => '');
    return err(`Upstream ${upstream.status} ${u.toString()} :: ${snippet.slice(0, 160)}`, upstream.status);
  }

  // Clone headers but strip compression/length so the browser doesn't try to decode mismatched bytes
  const headers = new Headers(upstream.headers);
  headers.delete('content-encoding');
  headers.delete('content-length');
  headers.delete('transfer-encoding');
  headers.set('cache-control', 'public, max-age=86400'); // tune if you want
  headers.set('access-control-allow-origin', '*');
  headers.set('content-type', headers.get('content-type') || 'application/javascript; charset=utf-8');

  // You can stream the body; it's identity (plain) now
  return new Response(upstream.body, {
    status: 200,
    headers,
  });
}
