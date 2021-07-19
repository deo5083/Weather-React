import React, { Component } from 'react';
import SearchButton from './SearchButton';
import '../../../App.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
        }
    }

    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.handleClick(e);
        }
    }

    handleClick = (e) => {
        let searchInput = document.getElementById('searchInput').value;
        this.props.handleSearch(searchInput);
        e.preventDefault();
    }

    render() {
        return (
            <>
                <input
                    autoFocus id="searchInput"
                    onKeyUp={this.handleKeyUp}
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Search by city or zip"
                    aria-label="Search"
                />
                <SearchButton
                    searchTerm={this.state.searchTerm}
                    handleClick={this.handleClick}
                />
            </>
        );
    }
}


export default Search;