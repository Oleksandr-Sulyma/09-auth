import type { Metadata } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import { SITE_NAME, BASE_URL, OG_IMAGE } from '@/lib/constants/seo';

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    const description = note.content.slice(0, 100);

    return {
      title: `Note: ${note.title}`,
      description,
      openGraph: {
        title: `Note: ${note.title}`,
        description,
        url: `${BASE_URL}/notes/${id}`,
        siteName: SITE_NAME,
        images: [
          {
            url: OG_IMAGE,
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
        type: 'article',
      },
    };
  } catch (error) {
    return {
      title: `Note Not Found | ${SITE_NAME}`,
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
