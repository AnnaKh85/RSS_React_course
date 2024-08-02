import type { ChangeEvent } from 'react';
import React, {useState, useEffect} from 'react';

interface SearchComponentProps {
  onSearch: (searchTerm: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    setSearchTerm(localStorage.getItem('searchTerm') || '')
  }, [])


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    onSearch(trimmedTerm);
    localStorage.setItem('searchTerm', trimmedTerm);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
