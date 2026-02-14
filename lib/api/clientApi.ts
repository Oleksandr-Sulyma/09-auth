import { nextServer } from './api';
import type { User } from '@/types/user';
import type { Note, NoteFormValues, FetchNotesParams, FetchNotesResponse } from '@/types/note';
import type {
  CheckSessionRequest,
  LoginRequest,
  RegisterRequest,
  UpdateUserRequest,
} from '@/types/requests';

export const register = async (dataReg: RegisterRequest): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/register', dataReg);
  return data;
};

export const login = async (dataLog: LoginRequest): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/login', dataLog);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await nextServer.get<CheckSessionRequest>('/auth/session');
  return data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const updateMe = async (userData: UpdateUserRequest): Promise<User> => {
  const payload = {
    userName: userData.username,
    photoUrl: userData.avatar,
  };

  const { data } = await nextServer.patch<User>('/users/me', payload);
  return data;
};

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params: { ...params, perPage: 12 },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: NoteFormValues): Promise<Note> => {
  const { data } = await nextServer.post<Note>('/notes', noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await nextServer.post('/upload', formData);
  return data.url;
};
