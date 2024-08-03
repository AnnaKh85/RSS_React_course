'use client';

import React, { useContext } from 'react';
import { useSearchTerm } from '../../../../hooks/useSearchTerm';
import { ThemeContext } from '../../../lib/context/ThemeContext';
import ErrorBoundary from '../../../lib/components/errBoundary/ErrorBoundary';
import ThemeSelector from '../../../lib/components/themeSelector/ThemeSelector';
import SearchComponent from '../../../lib/components/search/SearchComponent';
import ResultsComponent from '../../../lib/components/result/ResultsComponent';
import { store } from '../../../store';
import { Provider } from 'react-redux';
import type { ScriptProps } from 'next/dist/client/script';

type Props = {
  params: { pageNumber: string };
} & ScriptProps;

const App: React.FC<Props> = (props: Props) => {
  const [searchTerm, setSearchTerm] = useSearchTerm('searchTerm', '');
  const { theme } = useContext(ThemeContext)!;

  const pageNumber = props.params.pageNumber;

  console.log('pageNumber=' + pageNumber);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
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
            <SearchComponent onSearch={handleSearch} />
            <button onClick={throwError}>Throw Error</button>
          </div>
          <ResultsComponent searchTerm={searchTerm} pageNumber={pageNumber} />
        </div>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
