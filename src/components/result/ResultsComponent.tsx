import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "../search/search.css";
import "./resultComponent.css";
import "../pagination/pagination.css";
import DetailedView from "../detailedView/DetailedView";
import NotFoundPage from "../../pages/notFoundPage/NotFoundPage";
import Loader from "../loader/Loader.tsx";

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    location: { name: string };
    image: string;
    episode: string[];
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
    const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
    const [notFound, setNotFound] = useState(false);

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

        const characterIdParam = queryParams.get('characterId');
        if (characterIdParam) {
            setSelectedCharacterId(parseInt(characterIdParam));
        }
    }, []);

    useEffect(() => {
        fetchCharacters().then(() => {
            navigate(`?page=1&characterId=${selectedCharacterId || ''}`);
        });
    }, [searchTerm]);

    useEffect(() => {
        fetchCharacters();
    }, [page]);

  const fetchCharacters = async () => {
    setLoading(true);
    setError(null);
    setNotFound(false);
    const url = searchTerm
        ? `https://rickandmortyapi.com/api/character?name=${searchTerm}&page=1`
        : `https://rickandmortyapi.com/api/character?page=${page}`;

    try {
        const response = await axios.get(url);
        if (response.data.results.length === 0) {
            setNotFound(true);
        } else {
            setCharacters(response.data.results);
            setPageInfo(response.data.info);
        }
        setLoading(false);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response && err.response.status === 404) {
                setNotFound(true);
            } else {
                setError('Failed to fetch characters');
            }
        } else {
            setError('An unexpected error occurred');
        }
        setLoading(false);
    }
};

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        navigate(`?page=${newPage}`);
    };

    const handleCharacterClick = (id: number) => {
        setSelectedCharacterId(id);
        navigate(`?page=${page}&characterId=${id}`);
    };

    const handleCloseDetails = () => {
        setSelectedCharacterId(null);
        navigate(`?page=${page}`);
    };

    if (loading) return <Loader />;
    if (error) return <p>{error}</p>;
    if (notFound) return <NotFoundPage />;

    return (
        <div className="result-container" data-testid="results-component">
            <div className="results-list" onClick={handleCloseDetails}>
                <div className="pagination">
                    <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>Previous</button>
                    <span>Page {page}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={!pageInfo?.next}>Next</button>
                </div>
                <div className="card-container">

                    {characters.map((character) => (
                        <div key={character.id} className="card" data-testid="card-element" onClick={(e) => { e.stopPropagation(); handleCharacterClick(character.id); }}>
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
            {selectedCharacterId && (
                <div className="details-section">
                    <DetailedView characterId={selectedCharacterId} onClose={handleCloseDetails} />
                </div>
            )}
        </div>
    );
};

export default ResultsComponent;
