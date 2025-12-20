// 'use client'

// import css from './AuthNavigation.module.css';
// import Link from 'next/link';
// import { useAuthStore } from '@/lib/store/authStore';
// import { useRouter } from 'next/navigation';
// import { logout } from '@/lib/api/clientApi';

// export default function AuthNavigation() {
//    const router = useRouter();
//   const { isAuthenticated, user } = useAuthStore();
//   const clearIsAuthenticated = useAuthStore(
//     (state) => state.clearIsAuthenticated,
//   );

//   const handleLogout = async () => {
//     await logout();
//     clearIsAuthenticated();
//     router.push('/sing-in')
//   };

//   return isAuthenticated ? (
//   <>
//   <li className={css.navigationItem}>
//         <Link href="/profile" prefetch={false} className={css.navigationLink}>
//           Profile
//         </Link>
//       </li>

//       <li className={css.navigationItem}>
//         <p className={css.userEmail}>User email</p>
//         <button className={css.logoutButton}>Logout</button>
//       </li>
//     </>
//     ) : (
//       <>
//       <li className={css.navigationItem}>
//         <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
//           Login
//         </Link>
//       </li>

//       <li className={css.navigationItem}>
//         <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
//           Sign up
//         </Link>
//       </li>
//     </>
//     );
// }

'use client';

import css from './AuthNavigation.module.css';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/clientApi';

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      // Згідно з ТЗ: "виконує редірект на сторінку Login (/sign-in)"
      router.push('/sign-in');
      // Також корисно зробити refresh, щоб оновити серверні компоненти
      router.refresh();
    } catch (error) {
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
            <button
              type="button" // Завжди вказуйте тип для кнопок
              className={css.logoutButton}
              onClick={handleLogout}
            >
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
