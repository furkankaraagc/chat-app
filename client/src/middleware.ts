import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { baseURL } from './utils/utils';
import { cookies } from 'next/headers';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const url = `${baseURL}/auth/login `;
  let token = request.cookies.get('auth_token');
  let data: any = '';

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
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}

export const config = {
  matcher: ['/protected', '/auth'],
};
