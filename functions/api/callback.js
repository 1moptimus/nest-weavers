// GitHub OAuth callback for the Decap CMS admin. Exchanges the code for a token and hands it to the
// admin window using the postMessage handshake Decap expects ("authorizing:github" / "authorization:github:success:...").
// Requires env vars: GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET (Pages dashboard secrets, never committed).
export async function onRequest({ request, env }) {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return new Response('OAuth is not configured.', { status: 500 });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = request.headers.get('Cookie') || '';
  const expected = cookie.match(/(?:^|;\s*)nw_oauth_state=([^;]+)/)?.[1];

  if (!code || !state || !expected || state !== expected) {
    return new Response('Invalid or expired login attempt. Close this window and try again.', { status: 400 });
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/api/callback`,
    }),
  });
  const data = await tokenRes.json().catch(() => ({}));

  if (!data.access_token) {
    return new Response('GitHub did not return a token. Try logging in again.', { status: 401 });
  }

  const payload = JSON.stringify({ token: data.access_token, provider: 'github' });
  const origin = JSON.stringify(url.origin);

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Signing in…</title></head>
<body><p>Signing you in…</p>
<script>
(function () {
  var targetOrigin = ${origin};
  function receiveMessage(e) {
    if (e.origin !== targetOrigin) return;
    window.opener.postMessage('authorization:github:success:' + ${JSON.stringify(payload)}, targetOrigin);
    window.removeEventListener('message', receiveMessage, false);
    window.close();
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', targetOrigin);
})();
</script></body></html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      // One-time use: clear the state cookie.
      'Set-Cookie': 'nw_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=0',
    },
  });
}
