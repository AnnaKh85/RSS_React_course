import type {Mock} from 'vitest';
import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent, act} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import {useGetCharactersQuery} from "../lib/services/characterApi";
import ResultsComponent from "../lib/result/ResultsComponent";

vi.mock('../lib/services/characterApi');

const mockStore = configureStore([]);
const mockedUseGetCharactersQuery = useGetCharactersQuery as Mock;

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

    const initialState = {
        characters: {
            selectedCharacterId: null,
            selectedItems: [],
        },
    };

    it('should render loading state initially', () => {
        mockedUseGetCharactersQuery.mockReturnValue({
            data: null,
            error: null,
            isLoading: true,
        });

        render(
            <Provider store={mockStore(initialState)}>
                <MemoryRouter>
                    <ResultsComponent searchTerm="" characterId={null} handleChClick={() => {}} page={1}/>
                </MemoryRouter>
            </Provider>,
        );

        expect(screen.getByTestId('loader-element')).toBeInTheDocument();
    });

    it('should render error message when fetching characters fails', async () => {
        mockedUseGetCharactersQuery.mockReturnValue({
            data: null,
            error: true,
            isLoading: false,
        });

        await act(async () => {
            render(
                <Provider store={mockStore(initialState)}>
                    <MemoryRouter>
                        <ResultsComponent searchTerm="" characterId={null} handleChClick={() => {}} page={1}/>
                    </MemoryRouter>
                </Provider>,
            );
        });

        expect(await screen.findByText('Failed to fetch characters')).toBeInTheDocument();
    });

    it('should render characters after fetching', async () => {
        mockedUseGetCharactersQuery.mockReturnValue({
            data: {results: mockCharacters, info: mockPageInfo},
            error: null,
            isLoading: false,
        });

        await act(async () => {
            render(
                <Provider store={mockStore(initialState)}>
                    <MemoryRouter>
                        <ResultsComponent searchTerm="" characterId={null} handleChClick={() => {}} page={1}/>
                    </MemoryRouter>
                </Provider>,
            );
        });

        expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    });
});