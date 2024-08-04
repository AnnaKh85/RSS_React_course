'use client';

import React, { useContext, useState } from 'react';
import { ThemeContext } from '../lib/context/ThemeContext';
import ErrorBoundary from '../lib/components/errBoundary/ErrorBoundary';
import ThemeSelector from '../lib/components/themeSelector/ThemeSelector';
import SearchComponent from '../lib/components/search/SearchComponent';
import ResultsComponent from '../lib/components/result/ResultsComponent';
import { store } from '../store';
import { Provider } from 'react-redux';

export interface PageProps {
  params: { pageNumber: string };
  searchParams?: { name: string };
}

const App: React.FC<PageProps> = (props: PageProps) => {
  const pageNumber = props.params.pageNumber;
  let page = parseInt(pageNumber);
  // let page = 1
  const name = props.searchParams?.name;

  if (Number.isNaN(page)) {
    page = 1;
  }

  const [characterId, setCharacterId] = useState<number | null>(null);
  const { theme } = useContext(ThemeContext)!;

  console.log('pageNumber=' + pageNumber + ',name=' + name);

  // const handleSearch = (term: string) => {
  //     setSearchTerm(term);
  // };

  const handleChClick = (characterId: number) => {
    setCharacterId(characterId);
  };

  const throwError = () => {
    throw new Error('Test error');
  };

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div className={`app-container ${theme}`} data-testid="app-component">
          <ThemeSelector />
          <div className="search-form">
            <SearchComponent initialSearchTerm={name ? name : ''} />
            <button onClick={throwError}>Throw Error</button>
          </div>
          <ResultsComponent searchTerm={name} page={page} handleChClick={handleChClick} characterId={characterId} />
        </div>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;