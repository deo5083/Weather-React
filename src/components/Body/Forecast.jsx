import React, { Component } from 'react';
import '../../App.css';
import Icon from './Icon';
import Day from './Day';

class Forecast extends Component {

    getDay(month, day) {
        let dateString = new Date().getFullYear() + "-" + month + "-" + day + "T00:00:00";
        let newDay = new Date(dateString);
        let formattedDate = newDay.getMonth() + "/" + newDay.getDate();
        return <small> <Day day={newDay.getDay()} />, {formattedDate} </small>;
    }

    generateCards() {

        const arr = this.props.dates;
        const dayWeather = this.props.forecast[0];
        const dayDescription = this.props.forecast[1];
        const dayWind = this.props.forecast[2];
        const dayIcon = this.props.forecast[3];

        return dayWeather.map((item, i) =>

            <div className="col-lg-2 card card-body" key={i}>
                <div >
                    <h5 className="card-title text-center">{this.getDay(arr[i].split('-')[1], arr[i].split('-')[2])}</h5>
                    <hr />
                    <Icon icon={dayIcon[i]} alt={dayDescription[i]} />
                    <hr />
                    <h6 className="card-subtitle mb-2 text-muted">{dayDescription[i]}</h6>
                    <br />
                    <h6 className="card-subtitle mb-2 text-muted">{item} &#8457;</h6>
                    <br />
                    <h6 className="card-subtitle mb-2 text-muted">wind: {dayWind[i]} mph</h6>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className=" ">
                <div className="lead text-center">5-Day Forecast</div>
                <br />
                <div className="row justify-content-center">
                    {this.generateCards()}
                </div>
            </div>
        );
    }
}
export default Forecast;