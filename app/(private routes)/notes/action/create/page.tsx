import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

import type { Metadata } from 'next';
import { SITE_NAME, BASE_URL, OG_IMAGE } from '@/lib/constants/seo';

export const metadata: Metadata = {
  title: 'Create Note & Save Draft',
  description:
    'Quickly capture and organize your ideas. Use our form to create a new note, and your progress is automatically saved as a draft.',
  openGraph: {
    title: 'Create Note & Save Draft',
    description:
      'Quickly capture and organize your ideas. Use our form to create a new note, and your progress is automatically saved as a draft.',
    url: `${BASE_URL}/notes/action/create`,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'NoteHub - Create a new note',
      },
    ],
    type: 'article',
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
