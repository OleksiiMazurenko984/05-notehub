import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { createNote, fetchNotes } from '../../services/noteService';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../Loader/Loader';
import ErrorText from '../ErrorText/ErrorText';

export default function App() {
  const [page, setPage] = useState<number>(1);
  const perPage = 12;
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, query],
    queryFn: () => fetchNotes(page, perPage, query),
    placeholderData: keepPreviousData,
  });

  const { mutate: addNote } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const onClose = () => setIsModalShown(false);

  const searchNote = useDebouncedCallback(setQuery, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onNoteSearch={searchNote} value={query} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalShown(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorText />}

      {data && <NoteList notes={data.notes} />}
      {isModalShown && (
        <Modal>
          <NoteForm onClose={onClose} addNote={addNote} />
        </Modal>
      )}
    </div>
  );
}
