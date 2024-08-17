import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import ResultsComponent from './components/result/ResultsComponent.tsx';
import NotFoundPage from './pages/notFoundPage/NotFoundPage.tsx';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeContext.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="search" element={<ResultsComponent searchTerm="" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>,
  );
} else {
  console.error('Root element not found');
}
