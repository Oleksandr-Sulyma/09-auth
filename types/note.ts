export const NOTE_TAGS = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
] as const;

export type NoteTag = (typeof NOTE_TAGS)[number];

export type NoteFilterTag = NoteTag | 'All';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tag: NoteTag;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}
