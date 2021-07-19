import React, { Component } from 'react';

class Day extends Component {
    render() {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        return (
            <span >
                {days[this.props.day]}
            </span>
        );
    }
}

export default Day;