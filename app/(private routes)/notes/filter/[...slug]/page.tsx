import type { Metadata } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import type { NoteTag } from '@/types/note';
import type { FetchNotesParams } from '@/lib/api/clientApi';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const currentTag = slug[0];
  const descriptionValue =
    currentTag === 'all'
      ? 'Viewing all notes in NoteHub. An efficient application for managing personal notes.'
      : `Viewing notes in NoteHub filtered by the "${currentTag}" category.`;

  return {
    title: `NoteHub - ${currentTag === 'all' ? 'All notes' : `Filter: ${currentTag}`}`,
    description: descriptionValue,
    openGraph: {
      title: currentTag === 'all' ? 'NoteHub - All notes' : `Category: ${currentTag}`,
      description: descriptionValue,
      url: `https://09-auth-your-app.vercel.app/notes/filter/${currentTag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub Logo',
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
    tag: tagValue,
  };

  await queryClient.prefetchQuery({
    queryKey: ['notes', apiParams.search, apiParams.page, apiParams.tag],
    queryFn: () => fetchNotes(apiParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tagValue} />
    </HydrationBoundary>
  );
}
