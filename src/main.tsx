import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import ResultsComponent from './components/result/ResultsComponent.tsx';
import NotFoundPage from './pages/notFoundPage/NotFoundPage.tsx';
import { store } from './app/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="search" element={<ResultsComponent searchTerm="" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>,
  );
} else {
  console.error('Root element not found');
}
