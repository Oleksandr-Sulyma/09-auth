'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';
import css from './EditProfilePage.module.css';

export default function EditProfile() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  // Початкове значення інпуту — поточне ім'я користувача
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
      // Згідно з ТЗ оновлюємо тільки username
      const updatedUser = await updateMe({ username });

      // Оновлюємо стан у Zustand
      setUser(updatedUser);

      // Автоматичне перенаправлення на сторінку профілю
      router.push('/profile');
      // Оновлюємо кеш серверних компонентів, щоб зміни відобразилися всюди
      router.refresh();
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update username. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  const handleCancel = () => {
    // При натисканні на кнопку Cancel повертаємося на сторінку профілю
    router.push('/profile');
  };

  // Якщо користувач не авторизований, middleware все одно спрацює,
  // але додаємо захисну перевірку для рендеру
  if (!user) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {/* Аватар відображається зображенням без можливості редагування */}
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

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email відображається у вигляді звичайного тексту */}
          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
