import React, { Component } from 'react';
import '../../App.css';
import NoResults from './NoResults';
import Weather from './Weather/Weather';
import Forecast from './Forecast/Forecast';

class Body extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResult: [],
            forecastResult: [],
            hasSearched: false,
            searchStatus: '',
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            searchResult: props.search.result.searchResult,
            forecastResult: props.search.result.forecastResult,
            hasSearched: props.search.hasSearched,
            searchStatus: props.search.searchStatus,
        }
    }

    render() {
        const noResult = (
            <div>
                <br />
                <div className="alert alert-info text-center">
                    Search for a city above.
                </div>
            </div>
        );

        let displayComponent;
        if (this.state.hasSearched) {
            if (this.state.searchStatus !== '' && this.state.searchStatus === "SEARCH_SUCCESS" && document.getElementById('searchInput').value !== "") {
                displayComponent =
                    <div>
                        <br />
                        <div className="jumbotron" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
                            <Weather {...this.props} weatherInfo={this.props.search.result.searchResult} />
                            <Forecast {...this.props} forecastInfo={this.props.search.result.forecastResult} numOfForecastDays={5} />
                        </div>
                    </div>;
            } else {
                displayComponent = <NoResults searchWord={this.props.search.query} />;
            }

        } else {
            displayComponent = noResult;
        }

        return (
            <div className="container">
                {displayComponent}
            </div>
        );
    }
}

export default Body;