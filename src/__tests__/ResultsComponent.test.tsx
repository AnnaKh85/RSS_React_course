import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import axios from 'axios';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import ResultsComponent from "../components/result/ResultsComponent.tsx";


vi.mock('axios');

describe('ResultsComponent', () => {
    const mockCharacters = [
        {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            location: {name: 'Earth'},
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [],
        },
    ];

    const mockPageInfo = {
        count: 1,
        pages: 1,
        next: null,
        prev: null,
    };

    it('should render loading state initially', () => {
        render(
            <MemoryRouter>
                <ResultsComponent searchTerm=""/>
            </MemoryRouter>
        );
        expect(screen.getByTestId("loader-element")).toBeInTheDocument();
    });

    it('should render characters after fetching', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: {results: mockCharacters, info: mockPageInfo},
        });

        render(
            <MemoryRouter>
                <ResultsComponent searchTerm=""/>
            </MemoryRouter>
        );

        expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    });

    it('should handle page change', async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: {results: mockCharacters, info: mockPageInfo},
        });

        render(
            <MemoryRouter initialEntries={['/?page=1']}>
                <Routes>
                    <Route path="/" element={<ResultsComponent searchTerm=""/>}/>
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    });

    it('should not set selectedCharacterId if characterId param is not present', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<ResultsComponent searchTerm="" />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.queryByText('Character Details')).not.toBeInTheDocument();
    });

});