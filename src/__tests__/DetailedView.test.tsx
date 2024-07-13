import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mocked } from 'vitest';
import '@testing-library/jest-dom'; // Import the jest-dom matchers
import axios from 'axios';
import DetailedView from "../components/detailedView/DetailedView.tsx";

vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

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
    it('displays a loading indicator while fetching data', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockCharacter });

        render(<DetailedView characterId={1} onClose={vi.fn()} />);

        expect(screen.getByTestId('loader-element')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId('loader-element')).not.toBeInTheDocument();
        });
    });

    it('correctly displays the detailed card data', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockCharacter });

        render(<DetailedView characterId={1} onClose={vi.fn()} />);

        await waitFor(() => {
            expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
        });

        expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
        expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
        expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
        expect(screen.getByText(mockCharacter.location.name)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);
        mockCharacter.episode.forEach((ep) => {
            expect(screen.getByText(ep)).toBeInTheDocument();
        });
    });

    it('hides the component when the close button is clicked', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockCharacter });

        const handleClose = vi.fn();

        render(<DetailedView characterId={1} onClose={handleClose} />);

        await waitFor(() => {
            expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
        });

        const closeButton = screen.getByText(/close/i);
        fireEvent.click(closeButton);

        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('displays an error message when the API call fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('API call failed'));

        render(<DetailedView characterId={1} onClose={vi.fn()} />);

        await waitFor(() => {
            expect(screen.getByText('Failed to fetch character details')).toBeInTheDocument();
        });
    });

    // it('handles the case where no character data is available', async () => {
    //     mockedAxios.get.mockResolvedValueOnce({ data: {} });
    //
    //     render(<DetailedView characterId={1} onClose={vi.fn()} />);
    //
    //     await waitFor(() => {
    //         expect(screen.queryByText(mockCharacter.name)).not.toBeInTheDocument();
    //     });
    // });

    it('transitions between loading, error, and data loaded states', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockCharacter });

        const { rerender } = render(<DetailedView characterId={1} onClose={vi.fn()} />);

        expect(screen.getByTestId('loader-element')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId('loader-element')).not.toBeInTheDocument();
            expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
        });

        mockedAxios.get.mockRejectedValueOnce(new Error('API call failed'));
        rerender(<DetailedView characterId={2} onClose={vi.fn()} />);

        expect(screen.getByTestId('loader-element')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId('loader-element')).not.toBeInTheDocument();
            expect(screen.getByText('Failed to fetch character details')).toBeInTheDocument();
        });
    });
});
