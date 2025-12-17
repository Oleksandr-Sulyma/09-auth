import css from './page.module.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub - Page Not Found (404)',
  description:
    'Sorry, the requested page does not exist. NoteHub is an efficient application for managing personal notes.',
  openGraph: {
    title: 'NoteHub - Page Not Found (404)',
    description:
      'Sorry, the requested page does not exist. NoteHub is an efficient application for managing personal notes.',
    url: `https://08-zustand-mprhznnze-3280673s-projects.vercel.app/`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Page Not Found (404)',
      },
    ],
    type: 'website',
  },
};

function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
