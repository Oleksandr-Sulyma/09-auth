import { nextServer } from './api';
import { cookies } from 'next/headers';
import type { User } from '@/types/user';
import type { Note, FetchNotesParams, FetchNotesResponse } from '@/types/note';

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const cookieString = cookieStore.toString();

  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const cookieString = cookieStore.toString();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const fetchNotesServer = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const cookieString = cookieStore.toString();
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: { ...params, perPage: 12 },
  });
  return data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const cookieString = cookieStore.toString();

  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
