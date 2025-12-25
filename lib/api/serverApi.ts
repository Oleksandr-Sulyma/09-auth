import { nextServer } from './api';
import { cookies } from 'next/headers';
import type { User } from '@/types/user';
import type { Note, FetchNotesParams, FetchNotesResponse } from '@/types/note';

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const cookieString = cookieStore.toString();
  console.log(
    'СЕРВЕРНІ КУКИ:',
    cookieString ? 'Є (довжина ' + cookieString.length + ')' : 'ПОРОЖНЬО!'
  );

  const { data } = await nextServer.get('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const cookieString = cookieStore.toString();
  console.log(
    'СЕРВЕРНІ КУКИ:',
    cookieString ? 'Є (довжина ' + cookieString.length + ')' : 'ПОРОЖНЬО!'
  );

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
  console.log(
    'СЕРВЕРНІ КУКИ:',
    cookieString ? 'Є (довжина ' + cookieString.length + ')' : 'ПОРОЖНЬО!'
  );

  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: { ...params, perPage: 12 },
  });
  return data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  console.log('виклик відбувся в ServerApi');
  const cookieStore = await cookies();

  const cookieString = cookieStore.toString();
  console.log(
    'СЕРВЕРНІ КУКИ:',
    cookieString ? 'Є (довжина ' + cookieString.length + ')' : 'ПОРОЖНЬО!'
  );

  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
