import { api } from './api';
import { cookies } from 'next/headers';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import type { FetchNotesParams, FetchNotesResponse } from './clientApi';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  return {
    headers: {
      Cookie: cookieString,
    },
  };
};

export const getMe = async (): Promise<User | null> => {
  try {
    const config = await getAuthHeaders();
    if (!config.headers.Cookie) return null;

    const { data } = await api.get<User>('/users/me', config);
    return data;
  } catch {
    return null;
  }
};

export const checkSession = async () => {
  try {
    const config = await getAuthHeaders();
    return await api.get('/auth/session', config);
  } catch (error: unknown) {
    throw error;
  }
};

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const config = await getAuthHeaders();
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    ...config,
    params: { ...params, perPage: 12 },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const config = await getAuthHeaders();
  const { data } = await api.get<Note>(`/notes/${id}`, config);
  return data;
};
