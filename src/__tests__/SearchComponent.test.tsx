// Verify that clicking the Search button saves the entered value to the local storage;
// Check that the component retrieves the value from the local storage upon mounting.

// src/components/SearchComponent.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchComponent from "../components/search/SearchComponent.tsx";

describe('SearchComponent', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    it('retrieves the value from localStorage upon mounting', () => {
        // Set an initial value in localStorage
        localStorage.setItem('searchTerm', 'Initial Term');

        render(<SearchComponent onSearch={vi.fn()} />);

        // Check if the input has the initial value from localStorage
        expect(screen.getByRole('textbox')).toHaveValue('Initial Term');
    });

    it('saves the entered value to localStorage when the Search button is clicked', () => {
        const mockOnSearch = vi.fn();
        render(<SearchComponent onSearch={mockOnSearch} />);

        const input = screen.getByRole('textbox');
        const searchButton = screen.getByRole('button', { name: /search/i });

        // Simulate user input
        fireEvent.change(input, { target: { value: 'Test Search Term' } });

        // Click the Search button
        fireEvent.click(searchButton);

        // Check if the localStorage has the new value
        expect(localStorage.getItem('searchTerm')).toBe('Test Search Term');
    });

    it('calls the onSearch prop with the trimmed input value when the Search button is clicked', () => {
        const mockOnSearch = vi.fn();
        render(<SearchComponent onSearch={mockOnSearch} />);

        const input = screen.getByRole('textbox');
        const searchButton = screen.getByRole('button', { name: /search/i });

        // Simulate user input with leading and trailing spaces
        fireEvent.change(input, { target: { value: '  Test Search Term  ' } });

        // Click the Search button
        fireEvent.click(searchButton);

        // Check if the onSearch prop was called with the trimmed value
        expect(mockOnSearch).toHaveBeenCalledWith('Test Search Term');
    });
});
