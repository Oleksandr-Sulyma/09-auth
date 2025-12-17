import css from '@/app/page.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Note & Save Draft',
  description:
    'Quickly capture and organize your ideas. Use our form to create a new note, and your progress is automatically saved as a draft',
  openGraph: {
    title: 'Create Note & Save Draft',
    description:
      'Quickly capture and organize your ideas. Use our form to create a new note, and your progress is automatically saved as a draft',
    url: `https://08-zustand-mprhznnze-3280673s-projects.vercel.app/notes/action/create`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Simple and Efficient Note Management',
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
