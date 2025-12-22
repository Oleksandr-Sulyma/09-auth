import type { Metadata } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import type { NoteTag } from '@/types/note';
import type { FetchNotesParams } from '@/lib/api/clientApi';
import { SITE_NAME, BASE_URL, OG_IMAGE } from '@/lib/constants/seo';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const currentTag = slug[0];
  const isAll = currentTag === 'All';
  const titleValue = isAll ? `${SITE_NAME} - All notes` : `${SITE_NAME} - Filter: ${currentTag}`;
  const descriptionValue = isAll
    ? 'Viewing all notes in NoteHub. An efficient application for managing personal notes.'
    : `Viewing notes in NoteHub filtered by the "${currentTag}" category.`;

  return {
    title: titleValue,
    description: descriptionValue,
    openGraph: {
      title: titleValue,
      description: descriptionValue,
      url: `${BASE_URL}/notes/filter/${currentTag}`,
      siteName: SITE_NAME,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'NoteHub notes filter',
        },
      ],
      type: 'article',
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;

  const tagValue: NoteTag | undefined = slug[0] === 'All' ? undefined : (slug[0] as NoteTag);

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
