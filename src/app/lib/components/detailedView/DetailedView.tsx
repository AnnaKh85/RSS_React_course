'use client';

import React from 'react';
import { useGetCharacterByIdQuery } from '../../../../services/characterApi';
import Loader from '../loader/Loader.tsx';
import './detailedView.css';

interface CharacterDetailsProps {
  characterId: number;
  onClose: () => void;
}

const DetailedView: React.FC<CharacterDetailsProps> = ({ characterId, onClose }) => {
  const { data: character, error, isLoading } = useGetCharacterByIdQuery(characterId);

  if (isLoading) return <Loader />;
  if (error) return <p>Failed to fetch character details</p>;

  return (
    <div className="character-details">
      <button onClick={onClose}>Close</button>
      <h3>Character Details</h3>
      {character && (
        <div>
          <img src={character.image} alt={character.name} />
          <h2>{character.name}</h2>
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Location:</strong> {character.location.name}
          </p>
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
