import {NextRequest, NextResponse} from 'next/server'
import {
  accessTokensMatch,
  createSiteAccessToken,
  getSitePassword,
  privateResponseHeaders,
  safeReturnPath,
  siteAccessCookie,
  siteAccessPath,
} from '@/lib/site-access'

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character]!)
}

function accessDocument(nextPath: string, invalid: boolean) {
  const error = invalid
    ? '<p class="error" role="alert">Password not recognized. Try again.</p>'
    : ''

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>Private preview — Odessa</title>
  <style>
    :root { color-scheme: light; --blue: #259cd3; --yellow: #f8e914; --black: #000; --paper: #fff; }
    * { box-sizing: border-box; }
    body { min-height: 100svh; margin: 0; padding: clamp(1rem, 4vw, 3.5rem); display: grid; background: var(--paper); color: var(--black); font-family: Arial, Helvetica, sans-serif; }
    main { width: min(100%, 44rem); margin: auto; border-top: 1px solid var(--black); }
    header { min-height: clamp(9rem, 28svh, 16rem); padding: 1rem 0; display: flex; justify-content: space-between; gap: 2rem; }
    header span, label, button, .error { font: 700 .75rem/1.3 "SFMono-Regular", Consolas, monospace; letter-spacing: .06em; text-transform: uppercase; }
    .mark { color: var(--blue); }
    h1 { max-width: 12ch; margin: 0 0 clamp(2.5rem, 8vw, 5rem); font-size: clamp(3rem, 11vw, 7rem); font-weight: 500; letter-spacing: -.07em; line-height: .85; }
    .intro { max-width: 37rem; margin: 0 0 2rem; font-size: clamp(1rem, 2vw, 1.25rem); }
    form { display: grid; grid-template-columns: 1fr auto; border-top: 1px solid var(--black); border-bottom: 1px solid var(--black); }
    label { grid-column: 1 / -1; padding: 1rem 0 .5rem; }
    input { width: 100%; min-width: 0; padding: 1rem 0; border: 0; border-radius: 0; background: transparent; color: inherit; font: inherit; }
    button { min-width: 7rem; padding: 1rem; border: 0; border-left: 1px solid var(--black); border-radius: 0; background: var(--yellow); color: var(--black); cursor: pointer; }
    input:focus-visible, button:focus-visible { outline: 3px solid var(--blue); outline-offset: 3px; }
    .error { margin: 1rem 0 0; color: #a40000; }
    @media (max-width: 30rem) { header { min-height: 7rem; } form { grid-template-columns: 1fr; } button { border-top: 1px solid var(--black); border-left: 0; } }
  </style>
</head>
<body>
  <main>
    <header><span>ODESSA</span><span class="mark">Private preview</span></header>
    <h1>Work in progress.</h1>
    <p class="intro">This project is temporarily private. Questo progetto è temporaneamente privato.</p>
    <form action="${siteAccessPath}" method="post">
      <input name="next" type="hidden" value="${escapeHtml(nextPath)}">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required autofocus>
      <button type="submit">Enter / Entra</button>
    </form>
    ${error}
  </main>
</body>
</html>`
}

function accessResponse(request: NextRequest, invalid = false) {
  const password = getSitePassword()
  if (!password) {
    return new NextResponse('Private preview is not configured.', {
      status: 503,
      headers: {...privateResponseHeaders, 'Content-Type': 'text/plain; charset=utf-8'},
    })
  }
  const nextPath = safeReturnPath(request.nextUrl.searchParams.get('next'))
  return new NextResponse(accessDocument(nextPath, invalid), {
    status: 200,
    headers: {
      ...privateResponseHeaders,
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
      'Content-Type': 'text/html; charset=utf-8',
    },
  })
}

export function GET(request: NextRequest) {
  return accessResponse(request, request.nextUrl.searchParams.get('error') === '1')
}

export async function POST(request: NextRequest) {
  const configuredPassword = getSitePassword()
  if (!configuredPassword) return accessResponse(request)

  const formData = await request.formData()
  const submittedPassword = String(formData.get('password') ?? '')
  const nextPath = safeReturnPath(String(formData.get('next') ?? ''))
  const [submittedToken, expectedToken] = await Promise.all([
    createSiteAccessToken(submittedPassword),
    createSiteAccessToken(configuredPassword),
  ])

  if (!accessTokensMatch(submittedToken, expectedToken)) {
    const errorParams = new URLSearchParams({error: '1', next: nextPath})
    return new NextResponse(null, {
      status: 303,
      headers: {...privateResponseHeaders, Location: `${siteAccessPath}?${errorParams}`},
    })
  }

  const response = new NextResponse(null, {
    status: 303,
    headers: {...privateResponseHeaders, Location: nextPath},
  })
  response.cookies.set(siteAccessCookie, expectedToken, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: request.nextUrl.protocol === 'https:',
  })
  return response
}
