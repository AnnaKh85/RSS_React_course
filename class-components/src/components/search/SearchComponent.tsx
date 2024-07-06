import React, { Component, ChangeEvent } from 'react';

interface SearchComponentProps {
    onSearch: (searchTerm: string) => void;
}

interface SearchComponentState {
    searchTerm: string;
}

class SearchComponent extends Component<SearchComponentProps, SearchComponentState> {
    constructor(props: SearchComponentProps) {
        super(props);
        const savedTerm = localStorage.getItem('searchTerm') || '';
        this.state = { searchTerm: savedTerm };
    }

    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: event.target.value });
    };

    handleSearch = () => {
        const trimmedTerm = this.state.searchTerm.trim();
        this.props.onSearch(trimmedTerm);
        localStorage.setItem('searchTerm', trimmedTerm);
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.searchTerm}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default SearchComponent;
