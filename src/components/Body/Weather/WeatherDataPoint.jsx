import React, { Component } from 'react';
import '../../../App.css';

class WeatherDataPoint extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm">
                    <strong>{this.props.title}</strong>:  {this.props.data}
                </div>
            </div>
        );
    }
}
export default WeatherDataPoint;