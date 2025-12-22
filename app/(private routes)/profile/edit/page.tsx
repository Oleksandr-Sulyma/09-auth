// import type { Metadata } from 'next';
// import { SITE_NAME, BASE_URL, OG_IMAGE } from '@/lib/constants/seo';
// import EditProfileClient from './EditProfileClient';

// export const metadata: Metadata = {
//   title: `Edit Profile | ${SITE_NAME}`,
//   description: 'Edit your profile information in NoteHub, including your username.',
//   openGraph: {
//     title: `Edit Profile | ${SITE_NAME}`,
//     description: 'Edit your profile information in NoteHub, including your username.',
//     url: `${BASE_URL}/profile/edit`,
//     siteName: SITE_NAME,
//     images: [
//       {
//         url: OG_IMAGE,
//         width: 1200,
//         height: 630,
//         alt: 'NoteHub - Edit Profile',
//       },
//     ],
//     type: 'profile',
//   },
// };

// export default function EditProfilePage() {
//   return <EditProfileClient />;
// }

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';
import { toast } from 'react-hot-toast';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [username, setUsername] = useState(user?.username || '');
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const updatedUser = await updateMe({ username });
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
      router.push('/profile');
      router.refresh();
    } catch {
      toast.error('Failed to update username');
    } finally {
      setIsPending(false);
    }
  };

  if (!user) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar || 'https://ac.goit.global/fullstack/react/default-avatar.jpg'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={isPending}
            />
          </label>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button disabled={isPending}>Save</button>
            <button type="button" onClick={() => router.push('/profile')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
