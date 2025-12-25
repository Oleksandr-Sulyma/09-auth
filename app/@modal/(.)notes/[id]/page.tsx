import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';
import { fetchNoteByIdServer } from '@/lib/api/serverApi';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
};

const PreviewNote = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      {/* <NotePreview onClose={undefined} /> */}
      <NotePreview />
    </HydrationBoundary>
  );
};

export default PreviewNote;
