import createMiddleware from 'next-intl/middleware'
import {NextRequest, NextResponse} from 'next/server'
import {routing} from './i18n/routing'
import {
  accessTokensMatch,
  createSiteAccessToken,
  getSitePassword,
  privateResponseHeaders,
  siteAccessCookie,
  siteAccessPath,
} from './lib/site-access'

const intlMiddleware = createMiddleware(routing)

function applyPrivateHeaders(response: NextResponse) {
  response.headers.set('X-Robots-Tag', privateResponseHeaders['X-Robots-Tag'])
  response.headers.set('Referrer-Policy', privateResponseHeaders['Referrer-Policy'])
  return response
}

function needsIntlRouting(pathname: string) {
  return !pathname.startsWith('/api/')
    && !pathname.startsWith('/trpc/')
    && !pathname.startsWith('/_next/')
    && !pathname.startsWith('/_vercel/')
    && !pathname.includes('.')
}

export default async function proxy(request: NextRequest) {
  const {pathname, search} = request.nextUrl
  if (pathname === siteAccessPath || pathname === `${siteAccessPath}/`) {
    return NextResponse.next()
  }

  const password = getSitePassword()
  if (!password && process.env.VERCEL) {
    return new NextResponse('Private preview is unavailable.', {
      status: 503,
      headers: {...privateResponseHeaders, 'Content-Type': 'text/plain; charset=utf-8'},
    })
  }

  if (password) {
    const expectedToken = await createSiteAccessToken(password)
    const actualToken = request.cookies.get(siteAccessCookie)?.value ?? ''
    if (!accessTokensMatch(actualToken, expectedToken)) {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return new NextResponse('Authentication required.', {
          status: 401,
          headers: {...privateResponseHeaders, 'Content-Type': 'text/plain; charset=utf-8'},
        })
      }
      const accessUrl = new URL(siteAccessPath, request.url)
      accessUrl.searchParams.set('next', `${pathname}${search}`)
      return applyPrivateHeaders(NextResponse.redirect(accessUrl))
    }
  }

  const response = needsIntlRouting(pathname)
    ? intlMiddleware(request)
    : NextResponse.next()
  return password ? applyPrivateHeaders(response) : response
}

export const config = {
  matcher: '/((?!_vercel).*)',
}
