// Verify that the component renders the specified number of cards;
// Check that an appropriate message is displayed if no cards are present.

import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, vi, test, Mock } from 'vitest';
import { useNavigate, useLocation } from 'react-router-dom';
import ResultsComponent from "../components/result/ResultsComponent.tsx";

vi.mock('axios');

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
        useLocation: vi.fn(),
    };
});
vi.mock('../detailedView/DetailedView', () => ({
    __esModule: true,
    default: vi.fn(() => <div>DetailedView</div>),
}));
vi.mock('../loader/Loader', () => ({
    __esModule: true,
    default: vi.fn(() => <div>Loading...</div>),
}));
vi.mock('../../pages/notFoundPage/NotFoundPage', () => ({
    __esModule: true,
    default: vi.fn(() => <div>Not Found</div>),
}));

const mockNavigate = useNavigate as Mock;
const mockLocation = useLocation as Mock;

describe('ResultsComponent', () => {
    beforeEach(() => {
        mockLocation.mockReturnValue({ search: '' });
        mockNavigate.mockImplementation(() => vi.fn());
    });

    test('displays a loading indicator while fetching data', async () => {
        render(<ResultsComponent searchTerm="test" />);
        expect(screen.getByTestId('loader-element')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId('loader-element')).not.toBeInTheDocument();
        });
    });
});
