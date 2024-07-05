import { Component } from 'react';
import '../search/search.css';
import axios from 'axios';

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

interface ResultsComponentState {
    characters: Character[];
    loading: boolean;
    error: string | null;
}

class ResultsComponent extends Component<ResultsComponentProps, ResultsComponentState> {
    constructor(props: ResultsComponentProps) {
        super(props);
        this.state = {
            characters: [],
            loading: false,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchCharacters();
    }

    componentDidUpdate(prevProps: ResultsComponentProps) {
        if (prevProps.searchTerm !== this.props.searchTerm) {
            this.fetchCharacters();
        }
    }

    fetchCharacters = async () => {
        this.setState({ loading: true, error: null });
        const { searchTerm } = this.props;
        const url = searchTerm
            ? `https://rickandmortyapi.com/api/character?name=${searchTerm}`
            : 'https://rickandmortyapi.com/api/character';

        try {
            const response = await axios.get(url);
            this.setState({ characters: response.data.results, loading: false });
        } catch (error) {
            this.setState({ error: 'Failed to fetch characters', loading: false });
        }
    };

    render() {
        const { characters, loading, error } = this.state;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {characters.map((character) => (
                    <div key={character.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
                        <img src={character.image} alt={character.name} style={{ width: '100%' }} />
                        <h2>{character.name}</h2>
                        <p><strong>Status:</strong> {character.status}</p>
                        <p><strong>Species:</strong> {character.species}</p>
                        <p><strong>Gender:</strong> {character.gender}</p>
                        <p><strong>Location:</strong> {character.location.name}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default ResultsComponent;
