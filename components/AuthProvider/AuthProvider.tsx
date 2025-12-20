'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe } from '@/lib/api/clientApi';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, clearIsAuthenticated, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const isPrivateRoute = pathname.startsWith('/notes') || pathname.startsWith('/profile');

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        const user = await getMe();
        if (user) {
          setUser(user);
        } else {
          throw new Error('No user data');
        }
      } catch {
        // ВИПРАВЛЕНО: Видалено 'error', щоб прибрати варнінг ESLint
        clearIsAuthenticated();

        if (isPrivateRoute) {
          router.push('/sign-in');
        }
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
    // Додаємо pathname, щоб перевіряти сесію при переході
  }, [pathname, setUser, clearIsAuthenticated, router, isPrivateRoute]);

  if (isLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (isPrivateRoute && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
