import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import ResultsComponent from "./components/result/ResultsComponent.tsx";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage.tsx";

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Router>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="search" element={<ResultsComponent searchTerm="" />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    </Router>
  );
} else {
  console.error('Root element not found');
}