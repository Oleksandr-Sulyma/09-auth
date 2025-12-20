import { create } from 'zustand';
import type { User } from '@/types/user';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void; // Дозволяємо передавати null для зручності
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()(set => ({
  isAuthenticated: false,
  user: null,

  // Метод для встановлення користувача та статусу
  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user, // Якщо user є — true, якщо null — false
    });
  },

  // Метод для очищення стану (наприклад, при Logout)
  clearIsAuthenticated: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
