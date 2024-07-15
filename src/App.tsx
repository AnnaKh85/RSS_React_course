import React from 'react';
import ErrorBoundary from './components/errBoundary/ErrorBoundary';
import SearchComponent from './components/search/SearchComponent';
import ResultsComponent from './components/result/ResultsComponent';
import {useSearchTerm} from './hooks/useSearchTerm';
import "../src/components/result/resultComponent.css";

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
            <div className="app-container" data-testid="app-component">
                <div className="search-form">
                    <SearchComponent onSearch={handleSearch}/>
                    <button onClick={throwError}>Throw Error</button>
                </div>

                <ResultsComponent searchTerm={searchTerm}/>

            </div>
        </ErrorBoundary>
    );
};

export default App;
