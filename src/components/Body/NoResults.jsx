import React, { Component } from 'react';
import '../../App.css';

class NoResults extends Component {
    render() {
        return (
            <div>
                <br />
                <div className="alert alert-danger text-center" role="alert">
                    "{this.props.searchWord}" was not found, please try again.
                </div>
            </div>

        );
    }
}
export default NoResults;