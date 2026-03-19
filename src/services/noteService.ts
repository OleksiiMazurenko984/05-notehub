import axios from 'axios';
import type { Note, NoteData } from '../types/note';

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

const notesInstance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${myKey}`,
  },
});

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  perPage: number,
  search?: string
): Promise<NotesResponse> => {
  const { data } = await notesInstance.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
    },
  });

  return data;
};

export const createNote = async (noteData: NoteData) => {
  const { data } = await notesInstance.post<Note>('/notes', noteData);
  return data;
};

export const deleteNote = async (noteId: Note['id']) => {
  const { data } = await notesInstance.delete<Note>(`/notes/${noteId}`);
  return data;
};
