import css from './SearchBox.module.css';
import { type DebouncedState } from 'use-debounce';

interface SearchBoxProps {
  onNoteSearch: DebouncedState<React.Dispatch<React.SetStateAction<string>>>;
  value: string;
}

export default function SearchBox({ onNoteSearch, value }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={value}
      onChange={event => onNoteSearch(event.target.value)}
    />
  );
}
