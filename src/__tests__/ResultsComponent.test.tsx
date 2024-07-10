// Verify that the component renders the specified number of cards;
// Check that an appropriate message is displayed if no cards are present.

// src/components/result/ResultsComponent.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import ResultsComponent from "../components/result/ResultsComponent.tsx";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage.tsx";

vi.mock('axios');
const mockedAxios = axios as vi.Mocked<typeof axios>;

const mockCharacters = [
    {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        location: { name: 'Earth (C-137)' },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/1'],
    },
    {
        id: 2,
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        location: { name: 'Earth (C-137)' },
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/1'],
    },
];

describe('ResultsComponent', () => {
    it('renders the specified number of cards', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                results: mockCharacters,
                info: { pages: 1, next: null, prev: null },
            },
        });

        render(
            <MemoryRouter initialEntries={['/search']}>
                <Routes>
                    <Route path="/search" element={<ResultsComponent searchTerm="" />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getAllByRole('img')).toHaveLength(2);
        });

        mockCharacters.forEach((character) => {
            expect(screen.getByText(character.name)).toBeInTheDocument();
        });
    });

    it('displays the NotFoundPage when no characters are present', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { results: [], info: { pages: 1, next: null, prev: null } },
        });

        render(
            <MemoryRouter initialEntries={['/search']}>
                <Routes>
                    <Route path="/search" element={<ResultsComponent searchTerm="unknown" />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/404 - PAGE NOT FOUND/i)).toBeInTheDocument();
        });
    });
});
