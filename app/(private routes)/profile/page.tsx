import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getMe } from '@/lib/api/serverApi';
import css from './ProfilePage.module.css';

import { SITE_NAME, BASE_URL, OG_IMAGE } from '@/lib/constants/seo';

export const metadata: Metadata = {
  title: 'Profile | NoteHub - Simple and Efficient Note Management',
  description: 'View and manage your personal profile information in NoteHub.',
  openGraph: {
    title: 'Profile | NoteHub - Simple and Efficient Note Management',
    description: 'View and manage your personal profile information in NoteHub.',
    url: `${BASE_URL}/profile`,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'NoteHub - User Profile',
      },
    ],
    type: 'profile',
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
