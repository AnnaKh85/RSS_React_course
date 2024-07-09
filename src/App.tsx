import React, { useState, useEffect } from 'react';
import ErrorBoundary from './components/errBoundary/ErrorBoundary';
import SearchComponent from './components/search/SearchComponent';
import ResultsComponent from './components/result/ResultsComponent';
import { useSearchTerm } from './hooks/useSearchTerm';

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useSearchTerm('searchTerm', '');

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const throwError = () => {
        throw new Error('Test error');
    };

    return (
        <ErrorBoundary>
            <div>
                <div className="search-form">
                    <SearchComponent onSearch={handleSearch} />
                    <button onClick={throwError}>Throw Error</button>
                </div>
                <div>
                    <ResultsComponent searchTerm={searchTerm} />
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default App;
