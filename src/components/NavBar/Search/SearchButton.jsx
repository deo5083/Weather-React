import React, { Component } from 'react';
import '../../../App.css';

class SearchButton extends Component {
    render() {
        return (
            <button id="searchBtn" className="btn btn-outline-info my-2 my-sm-0" type="submit" onClick={this.props.handleClick}>
                Search
            </button>
        );
    }
}

export default SearchButton;