import { Component } from 'react';
import ErrorBoundary from "./components/errBoundary/ErrorBoundary.tsx";
import SearchComponent from "./components/search/SearchComponent.tsx";
import ResultsComponent from "./components/result/ResultsComponent.tsx";

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
            <div style={{ height: '20%', borderBottom: '1px solid black' }}>
              <SearchComponent onSearch={this.handleSearch} />
              <button onClick={this.throwError}>Throw Error</button>
            </div>
            <div style={{ height: '80%', overflowY: 'scroll' }}>
              <ResultsComponent searchTerm={this.state.searchTerm} />
            </div>
          </div>
        </ErrorBoundary>
    );
  }
}

export default App;
