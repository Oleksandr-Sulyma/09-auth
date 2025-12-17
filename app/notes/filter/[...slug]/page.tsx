import type { Metadata } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { FetchNotesParams } from '@/lib/api';

import { NoteTag } from '@/types/note';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const descriptionValue =
    slug[0] === 'all'
      ? 'Viewing all notes in NoteHub (All notes category). An efficient application for managing personal notes.'
      : `Viewing notes in NoteHub filtered by the "${slug[0]}" category. An efficient application for managing personal notes.`;

  return {
    title: `NoteHub - ${slug[0] === 'all' ? 'All notes' : `Notes filtered by: ${slug[0]}`}`,
    description: descriptionValue,
    openGraph: {
      title: slug[0] === 'all' ? 'NoteHub - All notes' : `Note: ${slug}`,
      description: descriptionValue,
      url: `https://08-zustand-mprhznnze-3280673s-projects.vercel.app/notes/${slug[0]}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt:
            slug[0] === 'all' ? 'NoteHub - All notes' : `NoteHub - Notes filtered by: ${slug[0]}`,
        },
      ],
      type: 'article',
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();

  const { slug } = await params;

  const tagValue: NoteTag | undefined = slug[0] === 'all' ? undefined : (slug[0] as NoteTag);

  const apiParams: FetchNotesParams = {
    search: '',
    page: 1,
    sortBy: 'created',
    tag: tagValue,
  };

  await queryClient.prefetchQuery({
    queryKey: ['notes', apiParams.search, apiParams.sortBy, apiParams.page, apiParams.tag],
    queryFn: () => fetchNotes(apiParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tagValue} />
    </HydrationBoundary>
  );
}
