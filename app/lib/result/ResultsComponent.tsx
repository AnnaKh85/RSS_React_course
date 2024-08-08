import React, { useEffect } from 'react';
import {
  setSelectedCharacterId,
  addSelectedItem,
  removeSelectedItem,
  clearSelectedItems,
} from '../charactersSlice';
import '../search/search.css';
import './resultComponent.css';
import '../components/pagination/pagination.css';
import saveAs from 'file-saver';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {useGetCharactersQuery} from "../services/characterApi";
import {Link} from "@remix-run/react";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import Loader from "../components/loader/Loader";
import DetailedView from "../components/detailedView/DetailedView";



interface ResultsComponentProps {
  searchTerm?: string;
  page: number;
  handleChClick: (id: number) => void;
  characterId: number | null;
}


const ResultsComponent: React.FC<ResultsComponentProps> = ({ searchTerm, page, handleChClick, characterId }) => {
  const dispatch = useAppDispatch();
  const selectedCharacterId = useAppSelector((state) => state.characters.selectedCharacterId);
  const selectedItems = useAppSelector((state) => state.characters.selectedItems);


  const { data, error, isLoading } = useGetCharactersQuery({ name: searchTerm, page });

  useEffect(() => {
    if (characterId) {
      dispatch(setSelectedCharacterId(characterId));
    }
  }, [dispatch]);


  const handleCharacterClick = (id: number) => {
    dispatch(setSelectedCharacterId(id));
    handleChClick(id);
  };

  const handleCloseDetails = () => {
    dispatch(setSelectedCharacterId(null));
  };

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    if (isChecked) {
      dispatch(addSelectedItem(id));
    } else {
      dispatch(removeSelectedItem(id));
    }
  };

  const handleUnselectAll = () => {
    dispatch(clearSelectedItems());
  };

  const handleDownload = () => {
    if (!data) return;

    const selectedCharacters = data.results.filter((character) => selectedItems.includes(character.id));
    const csvContent = selectedCharacters
        .map(
            (character) =>
                `${character.id},${character.name},${character.status},${character.species},${character.gender},${character.location.name},${character.episode}`,
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedItems.length}_characters.csv`);
  };

  const getLinkHref: (page: number, searchTerm?: string) => object = (page, searchTerm) => {
    if (searchTerm && searchTerm != '') {
      return {
        pathname: `../${page}`,
        search: `?name=${searchTerm}`,
        //query: { name: searchTerm },
      };
    } else {
      return {
        pathname: `../${page}`,
      };
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Failed to fetch characters</p>;
  if (data?.results.length === 0) return <NotFoundPage />;

  return (
      <div className="result-container" data-testid="results-component">
        <div className="results-list" onClick={handleCloseDetails}>
          <div className="pagination">
            <Link to={getLinkHref(page - 1, searchTerm)} relative="path">
              <button onClick={() => false} disabled={page <= 1}>
                Previous
              </button>
            </Link>
            <span>Page {page}</span>
            <Link to={getLinkHref(page + 1, searchTerm)} relative="path">
              <button onClick={() => false} disabled={!data?.info.next}>
                Next
              </button>
            </Link>
          </div>
          <div className="card-container">
            {data?.results.map((character) => (
                <div
                    key={character.id}
                    className="card"
                    data-testid="card-element"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCharacterClick(character.id);
                    }}
                >
                  <input
                      className="selected-character-checkbox"
                      type="checkbox"
                      checked={selectedItems.includes(character.id)}
                      onChange={(e) => handleCheckboxChange(character.id, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                  />
                  <img src={character.image} alt={character.name} style={{ width: '100%' }} />
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
                </div>
            ))}
          </div>
          {selectedItems.length > 0 && (
              <div className="flyout">
                <p>{selectedItems.length} items selected</p>
                <button onClick={handleUnselectAll}>Unselect All</button>
                <button onClick={handleDownload}>Download</button>
              </div>
          )}
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

