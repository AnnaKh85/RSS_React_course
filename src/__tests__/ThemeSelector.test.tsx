import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ThemeContext } from '../context/ThemeContext';
import ThemeSelector from '../components/themeSelector/ThemeSelector.tsx';
import { vi } from 'vitest';

describe('ThemeSelector', () => {
  const mockSetTheme = vi.fn();

  const renderComponent = (theme: 'light' | 'dark') => {
    return render(
      <ThemeContext.Provider value={{ theme, setTheme: mockSetTheme }}>
        <ThemeSelector />
      </ThemeContext.Provider>,
    );
  };

  it('renders the theme selector with the correct initial value', () => {
    renderComponent('light');
    const selectElement = screen.getByLabelText(/select theme/i);
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('light');
  });

  it('calls setTheme with "dark" when the dark option is selected', () => {
    renderComponent('light');
    const selectElement = screen.getByLabelText(/select theme/i);
    fireEvent.change(selectElement, { target: { value: 'dark' } });
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('calls setTheme with "light" when the light option is selected', () => {
    renderComponent('dark');
    const selectElement = screen.getByLabelText(/select theme/i);
    fireEvent.change(selectElement, { target: { value: 'light' } });
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('renders the correct initial value when the theme is dark', () => {
    renderComponent('dark');
    const selectElement = screen.getByLabelText(/select theme/i);
    expect(selectElement).toHaveValue('dark');
  });

  it('renders both light and dark options', () => {
    renderComponent('light');
    const lightOption = screen.getByText(/light/i);
    const darkOption = screen.getByText(/dark/i);
    expect(lightOption).toBeInTheDocument();
    expect(darkOption).toBeInTheDocument();
  });
});
