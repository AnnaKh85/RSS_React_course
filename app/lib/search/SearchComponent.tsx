import type {ChangeEvent} from 'react';
import React, {useState, useEffect} from 'react';
import {Link} from "@remix-run/react";

interface SearchComponentProps {
  initialSearchTerm: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ initialSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);

  useEffect(() => {
      setSearchTerm(localStorage.getItem('searchTerm') || '')
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const saveSearchIntoLocalStorage = function() {
      localStorage.setItem('searchTerm', searchTerm);
  }


    const getLinkHref: (page: number, searchTerm?: string) => object = (page, searchTerm) => {
        if (searchTerm && searchTerm != '') {
            return {
                pathname: `../${page}`,
                search: `?name=${searchTerm}`,
            };
        } else {
            return {
                pathname: `../${page}`,
            };
        }
    };

  return (
      <div>
          <input type="text" value={searchTerm} name="name" onChange={handleInputChange} />
          <Link to={getLinkHref(1, searchTerm)} relative="path">
            <button onClick={saveSearchIntoLocalStorage} typeof="button">Search</button>
          </Link>
      </div>
  );
};

export default SearchComponent;
