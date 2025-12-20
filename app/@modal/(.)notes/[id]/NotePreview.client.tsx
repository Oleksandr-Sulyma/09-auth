'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal'; // Використовуємо реюзабельний компонент
import css from './NotePreview.module.css';

import type { Note } from '@/types/note';

interface NotePreviewProps {
  onClose?: () => void; // Робимо опціональним, якщо він передається зверху
}

const NotePreview = ({ onClose }: NotePreviewProps) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note, Error>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    staleTime: Infinity,
    enabled: !!id,
  });

  // Реалізація закриття через router.back(), як вимагає ментор
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    router.back();
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (!id) return null;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        {isLoading && <p>Loading, please wait...</p>}

        {error && <p>Something went wrong while fetching the note.</p>}

        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              {/* Поле tag тепер рендериться обов'язково */}
              <p className={css.tag}>{note.tag}</p>
            </div>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <p className={css.date}>
                {note.updatedAt
                  ? `Updated: ${formatDate(note.updatedAt)}`
                  : `Created: ${formatDate(note.createdAt)}`}
              </p>
            </div>
          </div>
        )}

        <button type="button" className={css.backBtn} onClick={handleClose}>
          Back
        </button>
      </div>
    </Modal>
  );
};

export default NotePreview;
