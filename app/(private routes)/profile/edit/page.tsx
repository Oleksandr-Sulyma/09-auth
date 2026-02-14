'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe, uploadImage } from '@/lib/api/clientApi';
import { toast } from 'react-hot-toast';
import css from './EditProfilePage.module.css';
import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  // Ініціалізуємо стани даними користувача
  const [username, setUsername] = useState(user?.userName || '');
  const [isPending, setIsPending] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Синхронізація, якщо дані користувача завантажилися пізніше
  useEffect(() => {
    if (user?.userName) {
      setUsername(user.userName);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      let currentPhotoUrl = user?.photoUrl || '';

      // 1. Завантажуємо фото, якщо вибрано новий файл
      if (imageFile) {
        try {
          currentPhotoUrl = await uploadImage(imageFile);
        } catch (uploadError) {
          toast.error('Failed to upload image');
          setIsPending(false);
          return; // Перериваємо, якщо фото не завантажилось
        }
      }

      // 2. Оновлюємо профіль через API
      // Зверніть увагу на ключ userName (якщо API очікує саме такий регістр)
      const updatedUser = await updateMe({ 
        userName: username, 
        photoUrl: currentPhotoUrl 
      });

      // 3. Оновлюємо глобальний стан (Zustand)
      setUser(updatedUser);
      
      toast.success('Profile updated successfully!');
      
      // Даємо трохи часу тосту показатися перед редиректом
      router.push('/profile');
      router.refresh();
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsPending(false);
    }
  };

  // Якщо користувач не авторизований, нічого не рендеримо
  if (!user) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        {/* Передаємо поточне фото для прев'ю та функцію для отримання нового файлу */}
        <AvatarPicker 
          profilePhotoUrl={user.photoUrl || ''} 
          onChangePhoto={setImageFile} 
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <label className={css.inputLabel}>
            Username:
            <input
              type="text"
              className={css.inputField}
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={isPending}
              placeholder="Enter your username"
            />
          </label>

          <div className={css.emailInfo}>
            <span>Email:</span>
            <strong>{user.email}</strong>
          </div>

          <div className={css.actions}>
            <button 
              type="submit" 
              className={css.saveButton} 
              disabled={isPending || !username.trim()}
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              className={css.cancelButton} 
              onClick={() => router.push('/profile')}
              disabled={isPending}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}