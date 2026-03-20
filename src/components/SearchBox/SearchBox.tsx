import css from './SearchBox.module.css';

interface SearchBoxProps {
  onNoteSearch: (value: string) => void;
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
