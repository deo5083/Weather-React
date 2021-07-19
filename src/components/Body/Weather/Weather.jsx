import React, { Component } from 'react';
import '../../../App.css';
import WeatherDataPoint from './WeatherDataPoint';
import WeatherIcon from './WeatherIcon';
import moment from 'moment';

class Weather extends Component {

    timeConverter(UNIX_timestamp) {
        return moment.unix(UNIX_timestamp).format("HH:mm:ss")
    }

    render() {

        const currentWeatherInfo = this.props.weatherInfo;
        let today = moment.utc();

        return (
            <div className="container">

                <div>
                    <div className="text-right">
                        <sub>As of: {this.timeConverter(currentWeatherInfo.dt)}</sub>
                    </div>
                    <h3>
                        <span className="">
                            {currentWeatherInfo.name}
                            <br />
                            <small className="text-muted"> {today.format("dddd")}, {today.format("MM")}/{today.format("D")}</small>
                        </span>
                    </h3>

                    <div className="row">

                        <div className="col-lg-4">
                            <span className="h1">{currentWeatherInfo.main.temp}</span>
                            <span className="h2"> &#8457; </span>
                            <br />
                            <span className="text-muted">Low/high: {currentWeatherInfo.main.temp_min}/{currentWeatherInfo.main.temp_max} &#8457; </span>
                        </div>

                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-sm-3">
                                    <WeatherIcon icon={currentWeatherInfo.weather[0].icon} alt={currentWeatherInfo.weather[0].description} />
                                </div>
                                <div className="col-sm-7">
                                    <WeatherDataPoint title="Description" data={currentWeatherInfo.weather[0].description} />
                                    <WeatherDataPoint title="Humidity" data={currentWeatherInfo.main.humidity + "%"} />
                                    <WeatherDataPoint title="Wind" data={currentWeatherInfo.wind.speed + " mph"} />
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}


export default Weather;