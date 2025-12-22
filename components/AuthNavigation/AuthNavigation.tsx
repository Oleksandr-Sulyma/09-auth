'use client';

import css from './AuthNavigation.module.css';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/clientApi';
import { toast } from 'react-hot-toast';

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      toast.success('You have successfully logged out.');
      router.push('/sign-in');
      router.refresh();
    } catch (error) {
      toast.error('Logout failed. Try again.');
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" prefetch={false} className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email || 'User email'}</p>
            <button type="button" className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
