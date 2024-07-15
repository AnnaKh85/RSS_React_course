import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./detailedView.css";
import Loader from "../loader/Loader.tsx";

interface CharacterDetailsProps {
    characterId: number;
    onClose: () => void;
}

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

const DetailedView: React.FC<CharacterDetailsProps> = ({ characterId, onClose }) => {
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCharacterDetails();
    }, [characterId]);

    const fetchCharacterDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
            setCharacter(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch character details');
            setLoading(false);
        }
    };

    if (loading) return <Loader />;
    if (error) return <p>{error}</p>;

    return (
        <div className="character-details">
            <button onClick={onClose}>Close</button>
            <h3>Character Details</h3>
            {character && (
                <div>
                    <img src={character.image} alt={character.name} />
                    <h2>{character.name}</h2>
                    <p><strong>Status:</strong> {character.status}</p>
                    <p><strong>Species:</strong> {character.species}</p>
                    <p><strong>Gender:</strong> {character.gender}</p>
                    <p><strong>Location:</strong> {character.location.name}</p>
                    <div>
                        <h3>Episodes:</h3>
                        <ul>
                            {character.episode.map((ep, index) => (
                                <li key={index}>{ep}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailedView;
