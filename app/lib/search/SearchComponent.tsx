import type { ChangeEvent } from 'react';
import React, { useState, useEffect } from 'react';
import {Form, Link} from "@remix-run/react";

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
          <Form id="main-search"
                role="search"
                method="post"
          >
              <input type="text" value={searchTerm} name="name" onChange={handleInputChange} />
              <Link to={getLinkHref(1, searchTerm)} relative="path">
                <button onClick={() => false} typeof="button">Search</button>
              </Link>
          </Form>
      </div>
  );
};

export default SearchComponent;
