import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResultsComponent.css';
import Pagination from "../pagination/Pagination.tsx";

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    location: { name: string };
    image: string;
}

interface ResultsComponentProps {
    searchTerm: string;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ searchTerm }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page') || '1', 10);

    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchCharacters = async () => {
            setLoading(true);
            setError(null);
            const url = searchTerm
                ? `https://rickandmortyapi.com/api/character?name=${searchTerm}&page=${page}`
                : `https://rickandmortyapi.com/api/character?page=${page}`;

            try {
                const response = await axios.get(url);
                setCharacters(response.data.results);
                setTotalPages(response.data.info.pages);
            } catch (error) {
                setError('Failed to fetch characters');
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [searchTerm, page]);

    const handleItemClick = (id: number) => {
        navigate(`/?page=${page}&details=${id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="results">
            <div className="card-container">
                {characters.map((character) => (
                    <div
                        key={character.id}
                        className="card"
                        onClick={() => handleItemClick(character.id)}
                    >
                        <img src={character.image} alt={character.name} />
                        <h2>{character.name}</h2>
                        <p><strong>Status:</strong> {character.status}</p>
                        <p><strong>Species:</strong> {character.species}</p>
                        <p><strong>Gender:</strong> {character.gender}</p>
                        <p><strong>Location:</strong> {character.location.name}</p>
                    </div>
                ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} />
        </div>
    );
};

export default ResultsComponent;