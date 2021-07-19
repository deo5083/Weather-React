import React, { Component } from 'react';
import '../../App.css';

class Icon extends Component {
    render() {
        const iconURL = "http://openweathermap.org/img/w/" + this.props.icon + ".png";
        return (
            <div className="text-center">
                <img src={iconURL} alt={this.props.alt} style={{ width: '100px', height: '90px' }} />
            </div>
        );
    }
}
export default Icon;