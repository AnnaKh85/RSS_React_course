// Verify that clicking the Search button saves the entered value to the local storage;
// Check that the component retrieves the value from the local storage upon mounting.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchComponent from '../components/search/SearchComponent.tsx';

describe('SearchComponent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('retrieves the value from localStorage upon mounting', () => {
    localStorage.setItem('searchTerm', 'Initial Term');

    render(<SearchComponent onSearch={vi.fn()} />);

    expect(screen.getByRole('textbox')).toHaveValue('Initial Term');
  });

  it('saves the entered value to localStorage when the Search button is clicked', () => {
    const mockOnSearch = vi.fn();
    render(<SearchComponent onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Test Search Term' } });

    fireEvent.click(searchButton);

    expect(localStorage.getItem('searchTerm')).toBe('Test Search Term');
  });

  it('calls the onSearch prop with the trimmed input value when the Search button is clicked', () => {
    const mockOnSearch = vi.fn();
    render(<SearchComponent onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  Test Search Term  ' } });

    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Test Search Term');
  });
});
