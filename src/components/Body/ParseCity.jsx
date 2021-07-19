import React, { Component } from 'react';
import '../../App.css';
import Info from './Info';
import Forecast from './Forecast';
import Day from './Day';
import Icon from './Icon';

class ParseCity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            days: []
        };
    }

    formatDate(day) {

        const d = new Date();
        let month = d.getMonth() + 1;

        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        let temp = d.getFullYear() + "-" + month + "-" + day;

        return temp;
    }

    getForecast() {

        const forecastArr = this.props.forecastInfo.list;

        const d = new Date();
        const tomorrow = d.getDate() + 1;

        //eslint-disable-next-line
        this.state.days = [this.formatDate(tomorrow), this.formatDate(tomorrow + 1), this.formatDate(tomorrow + 2), this.formatDate(tomorrow + 3), this.formatDate(tomorrow + 4)];

        let localDays = this.state.days;
        let dayWeather = [0, 0, 0, 0, 0];
        let dayDescription = [];
        let dayWind = [];
        let icons = [];

        for (var i = 0; i < forecastArr.length; i++) {

            if (forecastArr[i].dt_txt.split(' ')[0] === localDays[0]) {
                dayWeather[0] = forecastArr[i].main.temp;
                dayDescription[0] = forecastArr[i].weather[0].description;
                dayWind[0] = forecastArr[i].wind.speed;
                icons[0] = forecastArr[i].weather[0].icon;
            }

            if (forecastArr[i].dt_txt.split(' ')[0] === localDays[1]) {
                dayWeather[1] = forecastArr[i].main.temp;
                dayDescription[1] = forecastArr[i].weather[0].description;
                dayWind[1] = forecastArr[i].wind.speed;
                icons[1] = forecastArr[i].weather[0].icon;
            }

            if (forecastArr[i].dt_txt.split(' ')[0] === localDays[2]) {
                dayWeather[2] = forecastArr[i].main.temp;
                dayDescription[2] = forecastArr[i].weather[0].description;
                dayWind[2] = forecastArr[i].wind.speed;
                icons[2] = forecastArr[i].weather[0].icon;
            }

            if (forecastArr[i].dt_txt.split(' ')[0] === localDays[3]) {
                dayWeather[3] = forecastArr[i].main.temp;
                dayDescription[3] = forecastArr[i].weather[0].description;
                dayWind[3] = forecastArr[i].wind.speed;
                icons[3] = forecastArr[i].weather[0].icon;
            }

            if (forecastArr[i].dt_txt.split(' ')[0] === localDays[4]) {
                dayWeather[4] = forecastArr[i].main.temp;
                dayDescription[4] = forecastArr[i].weather[0].description;
                dayWind[4] = forecastArr[i].wind.speed;
                icons[4] = forecastArr[i].weather[0].icon;
            }

        }

        let allForecasts = [dayWeather, dayDescription, dayWind, icons];
        return allForecasts;

    }

    timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = hour + ':' + min + ':' + sec;
        return time;
    }

    parseInfo() {
        const result = this.props.weatherInfo;
        let today = new Date();

        let output;
        if (result.name) {
            output = <div>
                <div className="text-right">
                    <sub>As of: {this.timeConverter(result.dt)} EST</sub>
                </div>
                <h3>
                    <span className="">
                        {result.name}
                        <br />
                        <small className="text-muted"> <Day day={today.getDay()} />, {today.getMonth() + 1}/{today.getDate()}</small>
                    </span>
                </h3>

                <div className="row">

                    <div className="col-lg-4">
                        <span className="h1">{result.main.temp}</span>
                        <span className="h2"> &#8457; </span>
                        <br />
                        <span className="text-muted">Low/high: {result.main.temp_min}/{result.main.temp_max} &#8457; </span>
                    </div>

                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-sm-3">
                                <Icon icon={result.weather[0].icon} alt={result.weather[0].description} />
                            </div>
                            <div className="col-sm-7">
                                <Info title="Description" data={result.weather[0].description} />
                                <Info title="Humidity" data={result.main.humidity + "%"} />
                                <Info title="Wind" data={result.wind.speed + " mph"} />
                            </div>
                        </div>

                    </div>

                </div>

                <hr />
                <Forecast forecast={this.getForecast()} dates={this.state.days} />
            </div>
        } else {
            output = <div>
                <br />
                <div className="alert alert-danger text-center" role="alert">
                    Something went wrong, please try again.
                    </div>
            </div>
        }

        return (

            <div className="container">

                {output}

            </div>

        );
    }

    render() {

        return (
            <div>
                <br />
                <div className="jumbotron" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
                    {this.parseInfo()}
                </div>
            </div>
        );
    }
}

export default ParseCity;