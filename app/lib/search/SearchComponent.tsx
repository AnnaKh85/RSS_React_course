import type { ChangeEvent } from 'react';
import React, { useState, useEffect } from 'react';
import {Form} from "@remix-run/react";

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
          <Form id="main-search"
                role="search"
                method="post"
          >
              <input type="text" value={searchTerm} name="name" onChange={handleInputChange} />
              <button onClick={() => false}>Search</button>
          </Form>

        {/*<Link*/}
        {/*    href={{*/}
        {/*      pathname: '/1',*/}
        {/*      query: { name: searchTerm },*/}
        {/*    }}*/}
        {/*>*/}
        {/*  */}
        {/*</Link>*/}
      </div>
  );
};

export default SearchComponent;
