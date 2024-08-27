import { useState } from 'react';
import { Note } from './NotesContainer';

interface SearchBarProps {
  data: Note[];
  onUpdateFilteredNotes: (filteredNotes: Note[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ data, onUpdateFilteredNotes }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const filteredNotes = data.filter(note => {
      const title = note.title || ''; 
      return title.toLowerCase().includes(value.toLowerCase());
    });

    onUpdateFilteredNotes(filteredNotes);
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search notes..."
        className="form-control"
      />
    </div>
  );
};

export default SearchBar;
