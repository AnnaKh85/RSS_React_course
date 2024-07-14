import React, {useContext, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useGetCharactersQuery } from '../../services/characterApi';
import { setSelectedCharacterId, addSelectedItem, removeSelectedItem, clearSelectedItems } from '../../app/charactersSlice';
import "../search/search.css";
import "./resultComponent.css";
import "../pagination/pagination.css";
import DetailedView from "../detailedView/DetailedView";
import NotFoundPage from "../../pages/notFoundPage/NotFoundPage";
import Loader from "../loader/Loader.tsx";
import { saveAs } from "file-saver";

interface ResultsComponentProps {
    searchTerm: string;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ searchTerm }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const selectedCharacterId = useAppSelector(state => state.characters.selectedCharacterId);
    const selectedItems = useAppSelector(state => state.characters.selectedItems);

    const queryParams = new URLSearchParams(location.search);
    const pageParam = queryParams.get('page');
    const page = pageParam ? parseInt(pageParam) : 1;

    const { data, error, isLoading } = useGetCharactersQuery({ name: searchTerm, page });

    useEffect(() => {
        const characterIdParam = queryParams.get('characterId');
        if (characterIdParam) {
            dispatch(setSelectedCharacterId(parseInt(characterIdParam)));
        }

    }, [location.search, dispatch]);

    useEffect(() => {
        if (!queryParams.has('page') || queryParams.get('name') !== searchTerm) {
            navigate(`?name=${searchTerm}&page=1`);
        }
    }, [searchTerm, navigate, queryParams]);

    const handlePageChange = (newPage: number) => {
        navigate(`?name=${searchTerm}&page=${newPage}`);
    };

    const handleCharacterClick = (id: number) => {
        dispatch(setSelectedCharacterId(id));
        navigate(`?name=${searchTerm}&page=${page}&characterId=${id}`);
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

        const selectedCharacters = data.results.filter(character => selectedItems.includes(character.id));
        const csvContent = selectedCharacters.map(character =>
            `${character.id},${character.name},${character.status},${character.species},${character.gender},${character.location.name},${character.url}`
        ).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `${selectedItems.length}_characters.csv`);
    };

    if (isLoading) return <Loader />;
    if (error) return <p>Failed to fetch characters</p>;
    if (data?.results.length === 0) return <NotFoundPage />;

    return (
        <div className="result-container" data-testid="results-component">
            <div className="results-list" onClick={handleCloseDetails}>
                <div className="pagination">
                    <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>Previous</button>
                    <span>Page {page}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={!data?.info.next}>Next</button>
                </div>
                <div className="card-container">
                    {data?.results.map((character) => (
                        <div key={character.id} className="card" data-testid="card-element" onClick={(e) => {
                            e.stopPropagation();
                            handleCharacterClick(character.id);
                        }}>
                            <input
                                className="selected-character-checkbox"
                                type="checkbox"
                                checked={selectedItems.includes(character.id)}
                                onChange={(e) => handleCheckboxChange(character.id, e.target.checked)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <img src={character.image} alt={character.name} style={{ width: '100%' }} />
                            <h2>{character.name}</h2>
                            <p><strong>Status:</strong> {character.status}</p>
                            <p><strong>Species:</strong> {character.species}</p>
                            <p><strong>Gender:</strong> {character.gender}</p>
                            <p><strong>Location:</strong> {character.location.name}</p>
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
