'use client';

import { useState } from 'react'; // Прибрали useEffect
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';

import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoNotesMessage from '@/components/NoNotesMessage/NoNotesMessage';

import { fetchNotes } from '@/lib/api/clientApi';
import type { FetchNotesParams, FetchNotesResponse } from '@/lib/api/clientApi';
import type { NoteTag } from '@/types/note';

interface NotesClientProps {
  tag?: NoteTag | undefined;
}

function NotesClient({ tag }: NotesClientProps) {
  const [clientParams, setClientParams] = useState({
    search: '',
    page: 1,
  });

  // ВАЖЛИВО: Замість useEffect, ми скидаємо сторінку логічно.
  // Якщо ми на сторінці 2, але тег змінився, ми хочемо бачити результати з 1 сторінки.
  const currentPage = clientParams.page;

  // Ми створюємо об'єкт параметрів безпосередньо під час рендеру.
  const finalParams: FetchNotesParams = {
    search: clientParams.search,
    page: currentPage,
    tag: tag,
  };

  const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse, Error>({
    // Додаємо tag у queryKey — React Query сам перезавантажить дані при зміні тегу
    queryKey: ['notes', finalParams.search, finalParams.page, tag],
    queryFn: () => fetchNotes(finalParams),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });

  const debounceSearch = useDebouncedCallback((value: string) => {
    setClientParams(prev => ({ ...prev, search: value, page: 1 }));
  }, 300);

  const handlePageChange = (page: number) => {
    setClientParams(prev => ({ ...prev, page }));
  };

  // Логіка відображення контенту залишається незмінною...
  let content;
  if (isLoading) {
    content = <p>Loading, please wait...</p>;
  } else if (isError) {
    content = <p>Something went wrong while fetching notes.</p>;
  } else if (data && data.notes.length === 0) {
    content = <NoNotesMessage isSearch={clientParams.search.length > 0} />;
  } else if (data) {
    content = <NoteList notes={data.notes} />;
  }

  return (
    <div className={css.app}>
      <Toaster position="top-right" reverseOrder={false} />
      <header className={css.toolbar}>
        <div className={css.searchWrapper}>
          <SearchBox search={clientParams.search} onChange={debounceSearch} />
          {isFetching && <span style={{ marginLeft: '10px', fontSize: '14px' }}>Updating...</span>}
        </div>

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>

      <main>{content}</main>
    </div>
  );
}

export default NotesClient;
