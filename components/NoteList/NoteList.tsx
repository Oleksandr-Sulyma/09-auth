'use client';

import css from './NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  // Створюємо мутацію для видалення
  const { mutate: deleteNoteM, isPending } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      // Після успішного видалення змушуємо React Query оновити список нотаток
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: error => {
      console.error('Failed to delete note:', error);
      alert('Could not delete the note. Please try again.');
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} scroll={false} className={css.link}>
              View details
            </Link>
            <button
              className={css.button}
              // Блокуємо кнопку під час видалення
              disabled={isPending}
              // ВИПРАВЛЕНО: Викликаємо deleteNoteM (мутацію), а не функцію api напряму
              onClick={() => {
                if (confirm('Are you sure you want to delete this note?')) {
                  deleteNoteM(note.id);
                }
              }}
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
