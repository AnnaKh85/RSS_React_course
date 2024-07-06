import { Component } from 'react';
import ErrorBoundary from './components/errBoundary/ErrorBoundary';
import SearchComponent from './components/search/SearchComponent';
import ResultsComponent from './components/result/ResultsComponent';

interface AppState {
  searchTerm: string;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.state = { searchTerm: savedTerm };
  }

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  throwError = () => {
    throw new Error('Test error');
  };

  render() {
    return (
        <ErrorBoundary>
          <div>
            <div className="search-form">
              <SearchComponent onSearch={this.handleSearch} />
              <button onClick={this.throwError}>Throw Error</button>
            </div>
            <div style={{ height: '80%' }}>
              <ResultsComponent searchTerm={this.state.searchTerm} />
            </div>
          </div>
        </ErrorBoundary>
    );
  }
}

export default App;
