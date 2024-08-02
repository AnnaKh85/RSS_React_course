// Make sure the component updates URL query parameter when page changes.
// src/components/pagination/Pagination.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import type { Mock } from 'vitest';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../app/lib/components/pagination/Pagination.tsx';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('Pagination', () => {
  it('updates URL query parameter when page changes', () => {
    const mockNavigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(mockNavigate);

    render(<Pagination currentPage={1} totalPages={5} />);

    const page2Button = screen.getByRole('button', { name: '2' });

    // Click the button for page 2
    fireEvent.click(page2Button);

    // Verify that navigate was called with the correct query parameter
    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('disables the current page button', () => {
    render(<Pagination currentPage={3} totalPages={5} />);

    const page3Button = screen.getByRole('button', { name: '3' });

    // Check if the button for the current page is disabled
    expect(page3Button).toBeDisabled();
  });

  it('renders the correct number of page buttons', () => {
    render(<Pagination currentPage={1} totalPages={5} />);

    const pageButtons = screen.getAllByRole('button');

    // Check if the number of rendered buttons matches the total pages
    expect(pageButtons).toHaveLength(5);
  });
});
