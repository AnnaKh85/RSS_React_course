import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import DetailedView from '../components/detailedView/DetailedView.tsx';
import { useGetCharacterByIdQuery } from "../services/characterApi.ts";

vi.mock('../services/characterApi');
const mockedUseGetCharacterByIdQuery = useGetCharacterByIdQuery as vi.Mock;

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  location: { name: 'Earth (C-137)' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
};

describe('DetailedView', () => {
  it('calls onClose when the Close button is clicked', async () => {
    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: mockCharacter,
      error: null,
      isLoading: false,
    });

    const handleClose = vi.fn();

    render(<DetailedView characterId={1} onClose={handleClose} />);

    await waitFor(() => {
      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    });

    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when the Close button is not clicked', async () => {
    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: mockCharacter,
      error: null,
      isLoading: false,
    });

    const handleClose = vi.fn();

    render(<DetailedView characterId={1} onClose={handleClose} />);

    await waitFor(() => {
      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    });

    expect(handleClose).not.toHaveBeenCalled();
  });

  it.skip('calls onClose when the Close button is clicked after loading', async () => {
    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: mockCharacter,
      error: null,
      isLoading: true,
    });

    const handleClose = vi.fn();

    render(<DetailedView characterId={1} onClose={handleClose} />);

    await waitFor(() => {
      expect(screen.getByTestId('loader-element')).toBeInTheDocument();
    });

    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: mockCharacter,
      error: null,
      isLoading: false,
    });

    await waitFor(() => {
      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    });

    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it.skip('calls onClose when the Close button is clicked after an error', async () => {
    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: null,
      error: new Error('API call failed'),
      isLoading: false,
    });

    const handleClose = vi.fn();

    render(<DetailedView characterId={1} onClose={handleClose} />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch character details')).toBeInTheDocument();
    });

    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the Close button is clicked multiple times', async () => {
    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: mockCharacter,
      error: null,
      isLoading: false,
    });

    const handleClose = vi.fn();

    render(<DetailedView characterId={1} onClose={handleClose} />);

    await waitFor(() => {
      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    });

    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  it('renders error message when there is an error', async () => {
    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: null,
      error: new Error('API call failed'),
      isLoading: false,
    });

    render(<DetailedView characterId={1} onClose={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch character details')).toBeInTheDocument();
    });
  });

  it('renders Loader when isLoading is true', () => {
    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<DetailedView characterId={1} onClose={vi.fn()} />);

    expect(screen.getByTestId('loader-element')).toBeInTheDocument();
  });
});