import type { ChangeEvent } from 'react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SearchComponentProps {
  initialSearchTerm: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ initialSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  //const [searchTerm, setSearchTerm] = useSearchTerm('searchTerm', '');

  useEffect(() => {
    // setSearchTerm(localStorage.getItem('searchTerm') || '')
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // const handleSearch = () => {
  //   const trimmedTerm = searchTerm.trim();
  //   onSearch(trimmedTerm);
  //   localStorage.setItem('searchTerm', trimmedTerm);
  // };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <Link
        href={{
          pathname: '/1',
          query: { name: searchTerm },
        }}
      >
        <button onClick={() => false}>Search</button>
      </Link>
    </div>
  );
};

export default SearchComponent;
