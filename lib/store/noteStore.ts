import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteFormValues } from '@/types/note';

type DraftStore = {
  draft: NoteFormValues;
  setDraft: (values: NoteFormValues) => void;
  clearDraft: () => void;
};

const initialDraft: NoteFormValues = { title: '', content: '', tag: 'Todo' };

export const useDraftStore = create<DraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: values => set({ draft: values }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
    }
  )
);
