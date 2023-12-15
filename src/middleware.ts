import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
