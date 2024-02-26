import { NextRequest, NextResponse } from 'next/server';
import { baseURL } from './utils/utils';

interface ResponseType<T> {
  loggedIn: boolean;
  data: T;
}

export async function middleware<T>(request: NextRequest) {
  const url = `${baseURL}/auth/login `;
  let token = request.cookies.get('auth_token');
  let data: ResponseType<T> | null = null;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token?.value}`,
      },

      credentials: 'include',
    });
    data = await res.json();
  } catch (error) {
    console.log(error);
  }
  if (data?.loggedIn && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!data?.loggedIn && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/', '/auth/login', '/auth/register'],
};
