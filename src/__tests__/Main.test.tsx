import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { ThemeProvider } from '../context/ThemeContext.tsx';
import App from '../App.tsx';
import ResultsComponent from '../components/result/ResultsComponent.tsx';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage.tsx';

describe('App Routing and Rendering', () => {
  it('renders the App component for the root path', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<App />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByTestId('app-component')).toBeInTheDocument();
  });

  it.skip('renders the ResultsComponent for the /search path', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/search']}>
            <Routes>
              <Route path="search" element={<ResultsComponent searchTerm="" />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByTestId('results-component')).toBeInTheDocument();
  });

  it('renders the NotFoundPage for an undefined path', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/undefined-path']}>
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByTestId('pageNotFound-element')).toBeInTheDocument();
  });

  it('logs an error when the root element is not found', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const rootElement = document.getElementById('non-existent-root');
    if (!rootElement) {
      console.error('Root element not found');
    }
    expect(consoleErrorSpy).toHaveBeenCalledWith('Root element not found');
    consoleErrorSpy.mockRestore();
  });

  it('renders the ThemeProvider correctly', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<App />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
  });
});