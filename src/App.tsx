import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from '../src/components/search/SearchComponent.tsx';
import NotFoundPage from '../src/pages/notFoundPage/NotFoundPage.tsx';

function App() {
  const handleSearch = (searchTerm: string) => {
    // Implement your search logic here
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage onSearch={handleSearch} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
  );
}

export default App;