import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getMe } from '@/lib/api/serverApi';
import css from './ProfilePage.module.css';

// ВИПРАВЛЕНО: Використовуємо тип Metadata, щоб усунути варнінг 'defined but never used'
export const metadata: Metadata = {
  title: 'Profile | NoteHub - Simple and Efficient Note Management',
  description:
    'NoteHub is an efficient application for managing personal notes, built with Next.js and TanStack Query.',
  openGraph: {
    title: 'Profile | NoteHub - Simple and Efficient Note Management',
    description:
      'NoteHub is an efficient application for managing personal notes, built with Next.js and TanStack Query.',
    url: 'https://09-auth-your-username.vercel.app/profile',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Simple and Efficient Note Management',
      },
    ],
    type: 'website',
  },
};

export default async function Profile() {
  const user = await getMe();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || 'https://ac.goit.global/fullstack/react/default-avatar.jpg'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
