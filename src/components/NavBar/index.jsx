import React, { Component } from 'react';
import '../../App.css';
import Search from './Search/Search';

class NavBar extends Component {
    render() {
        const nav = (
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="./">Weather</a>
                    <div className="form-inline" >
                        <Search {...this.props}/>
                    </div>
                </div>
            </nav>
        );
        return nav;
    }
}

export default NavBar;