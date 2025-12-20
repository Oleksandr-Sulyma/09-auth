import type { Metadata } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    return {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      openGraph: {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 100),
        url: `https://your-current-deployment-url.vercel.app/notes/${id}`,
        siteName: 'NoteHub',
        type: 'article',
      },
    };
  } catch (error) {
    return {
      title: 'Note Not Found | NoteHub',
    };
  }
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
