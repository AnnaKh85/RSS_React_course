import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ResultsComponent from '../components/result/ResultsComponent.tsx';

vi.mock('axios');

const mockedAxios = axios as typeof axios & { get: ReturnType<typeof vi.fn> };

describe('ResultsComponent', () => {
  const mockCharacters = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      location: { name: 'Earth' },
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
        <ResultsComponent searchTerm="" />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('loader-element')).toBeInTheDocument();
  });

  it('should render characters after fetching', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { results: mockCharacters, info: mockPageInfo },
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <ResultsComponent searchTerm="" />
        </MemoryRouter>,
      );
    });

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('should handle page change', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { results: mockCharacters, info: mockPageInfo },
    });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/?page=1']}>
          <Routes>
            <Route path="/" element={<ResultsComponent searchTerm="" />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('should not set selectedCharacterId if characterId param is not present', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ResultsComponent searchTerm="" />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByText('Character Details')).not.toBeInTheDocument();
  });
});
