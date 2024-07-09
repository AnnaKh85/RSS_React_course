import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "../search/search.css";
import "./resultComponent.css"
import "../pagination/pagination.css";

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    location: { name: string };
    image: string;
}

interface PageInfo {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

interface ResultsComponentProps {
    searchTerm: string;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ searchTerm }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageParam = queryParams.get('page');
        if (pageParam) {
            setPage(parseInt(pageParam));
        } else {
            setPage(1);
        }
    }, [location]);

    useEffect(() => {
        // Navigate to page 1 if search term changes
        if (location.search.includes('page=1')) {
            fetchCharacters();
        } else {
            navigate(`?page=1`);
        }
    }, [searchTerm, navigate]);

    useEffect(() => {
        fetchCharacters();
    }, [page]);

    const fetchCharacters = async () => {
        setLoading(true);
        setError(null);
        const url = searchTerm
            ? `https://rickandmortyapi.com/api/character?name=${searchTerm}&page=${page}`
            : `https://rickandmortyapi.com/api/character?page=${page}`;

        try {
            const response = await axios.get(url);
            setCharacters(response.data.results);
            setPageInfo(response.data.info);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch characters');
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        navigate(`?page=${newPage}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="result-container">
            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>Previous</button>
                <span>Page {page}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={!pageInfo?.next}>Next</button>
            </div>
            <div className="card-container">
                {characters.map((character) => (
                    <div key={character.id} className="card">
                        <img src={character.image} alt={character.name} style={{ width: '100%' }} />
                        <h2>{character.name}</h2>
                        <p><strong>Status:</strong> {character.status}</p>
                        <p><strong>Species:</strong> {character.species}</p>
                        <p><strong>Gender:</strong> {character.gender}</p>
                        <p><strong>Location:</strong> {character.location.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsComponent;
