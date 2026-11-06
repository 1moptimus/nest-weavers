// Starts the GitHub OAuth flow for the Decap CMS admin (/admin).
// Runs as a Cloudflare Pages Function. Requires env vars: GITHUB_CLIENT_ID (set in the Pages dashboard, never committed).
export async function onRequest({ request, env }) {
  if (!env.GITHUB_CLIENT_ID) {
    return new Response('OAuth is not configured (missing GITHUB_CLIENT_ID).', { status: 500 });
  }

  const url = new URL(request.url);
  const state = crypto.randomUUID();

  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorize.searchParams.set('redirect_uri', `${url.origin}/api/callback`);
  authorize.searchParams.set('scope', 'repo,user');
  authorize.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      'Cache-Control': 'no-store',
      // State cookie is checked in callback.js to prevent login CSRF.
      'Set-Cookie': `nw_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600`,
    },
  });
}
