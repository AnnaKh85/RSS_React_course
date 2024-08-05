'use client';

import React, { useContext, useState } from 'react';
import { ThemeContext } from '../lib/context/ThemeContext';
import ErrorBoundary from '../lib/components/errBoundary/ErrorBoundary';
import ThemeSelector from '../lib/components/themeSelector/ThemeSelector';
import SearchComponent from '../lib/components/search/SearchComponent';
import ResultsComponent from '../lib/components/result/ResultsComponent';
import { store } from '../store';
import { Provider } from 'react-redux';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { useSearchParams, useParams } from 'next/navigation';

type CustomParams = {
  pageNumber?: string;
};

const App: React.FC = () => {
  const params = useParams<CustomParams>();
  const searchParams: ReadonlyURLSearchParams | null = useSearchParams();

  const pageNumber = params?.pageNumber ?? '1';
  let page = parseInt(pageNumber);
  const name = searchParams?.get('name') ?? '';

  if (Number.isNaN(page)) {
    page = 1;
  }

  const [characterId, setCharacterId] = useState<number | null>(null);
  const { theme } = useContext(ThemeContext)!;

  console.log('pageNumber=' + pageNumber + ',name=' + name);

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
              <SearchComponent initialSearchTerm={name} />
              <button onClick={throwError}>Throw Error</button>
            </div>
            <ResultsComponent searchTerm={name} page={page} handleChClick={handleChClick} characterId={characterId} />
          </div>
        </ErrorBoundary>
      </Provider>
  );
};

export default App;