import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkSession } from './lib/api/serverApi'; // Переконайтеся, що шлях вірний

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  // ЛОГІКА 1: Якщо accessToken відсутній
  if (!accessToken) {
    if (refreshToken) {
      try {
        // Спроба Silent Authentication через серверний запит
        const data = await checkSession();
        const setCookie = data.headers['set-cookie'];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path || '/',
              maxAge: Number(parsed['Max-Age']) || undefined,
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            };

            if (parsed.accessToken) {
              cookieStore.set('accessToken', parsed.accessToken, options);
            }
            if (parsed.refreshToken) {
              cookieStore.set('refreshToken', parsed.refreshToken, options);
            }
          }

          // Якщо після оновлення ми на публічному маршруті — редірект на профіль (або головну)
          if (isPublicRoute) {
            return NextResponse.redirect(new URL('/profile', request.url), {
              headers: { 'Set-Cookie': cookieStore.toString() },
            });
          }

          // Якщо на приватному — дозволяємо доступ з новими куками
          if (isPrivateRoute) {
            return NextResponse.next({
              headers: { 'Set-Cookie': cookieStore.toString() },
            });
          }
        }
      } catch (error) {
        console.error('Middleware session check failed:', error);
      }
    }

    // Якщо refreshToken немає або сесія не оновилася:
    if (isPublicRoute) return NextResponse.next();
    if (isPrivateRoute) return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // ЛОГІКА 2: Якщо accessToken вже є
  if (accessToken) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
    if (isPrivateRoute) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
