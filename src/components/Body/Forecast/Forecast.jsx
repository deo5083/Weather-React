import React, { Component } from 'react';
import '../../../App.css';
import WeatherIcon from './../Weather/WeatherIcon';
import moment from 'moment';

const DATE_FORMAT = "YYYY-MM-DD";
class Forecast extends Component {

    generateForecastDates(numForecastDays) {
        let dates = [];
        for (let i = 1; dates.length < numForecastDays; i++) {
            dates.push(moment().add(i, "days").format(DATE_FORMAT));
        }
        return dates;
    }

    getDaysWeather(date, forecast) {
        return {
            date: date,
            dayWeather: forecast.main.temp,
            dayDescription: forecast.weather[0].description,
            dayWind: forecast.wind.speed,
            dayIcon: forecast.weather[0].icon,
        }
    }

    getForecast(numForecastDays) {
        const forecastArr = this.props.forecastInfo.list;
        let forecastData = [];
        let localDays = this.generateForecastDates(numForecastDays);
        localDays.forEach(day => {
            const foundForecast = forecastArr.find(f => f.dt_txt.split(' ')[0] === day);
            if (foundForecast) {
                forecastData.push(this.getDaysWeather(day, foundForecast));
            }
        });
        return forecastData;
    }

    generateCards(numOfCards) {
        return this.getForecast(numOfCards).map((item) =>

            <div className="col-lg-2 card card-body" key={item.date}>
                <div >
                    <h5 className="card-title text-center">{moment(item.date).format("ddd, MM/DD")}</h5>
                    <hr />
                    <WeatherIcon icon={item.dayIcon} alt={item.dayDescription} />
                    <hr />
                    <h6 className="card-subtitle mb-2 text-muted">{item.dayDescription}</h6>
                    <br />
                    <h6 className="card-subtitle mb-2 text-muted">{item.dayWeather} &#8457;</h6>
                    <br />
                    <h6 className="card-subtitle mb-2 text-muted">wind: {item.dayWind} mph</h6>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className=" ">
                <div className="lead text-center">{this.props.numOfForecastDays}-Day Forecast</div>
                <br />
                <div className="row justify-content-center">
                    {this.generateCards(this.props.numOfForecastDays)}
                </div>
            </div>
        );
    }
}
export default Forecast;