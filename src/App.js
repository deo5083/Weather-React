import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      searchInput: ""
      ,searchResult: []
      ,forecastResult:[]
      ,hasSearched: false
      ,isFound: false
    };

    this.handleClick = this.handleClick.bind(this);
  } 
  

  
  getWeather = async () => {

    const api_key = "ec98ea89c0ae53c7edf2e2293b6d5e10";
    let build_call;
    if(isNaN(this.state.searchInput)){
      build_call = "?q="+this.state.searchInput;
    } else {
      build_call = "?zip="+this.state.searchInput;
    }

    const call = "http://api.openweathermap.org/data/2.5/weather"+build_call+",us&appid="+api_key+"&units=imperial";
    
    const api_call = await fetch(call);
    const response = await api_call.json();

    //console.log(response);

    const build_forecast_call = "http://api.openweathermap.org/data/2.5/forecast"+build_call+",us&appid="+api_key+"&units=imperial";
    const forecast_call = await fetch(build_forecast_call);
    const forecast_response = await forecast_call.json();
    console.log(forecast_response);

    let result, found;
    
    if (response.cod === 200){
      found = true;
      
      this.setState({
        searchResult: response
        ,forecastResult: forecast_response
      });

    } else {
      result = "not found"
      found = false;
      this.setState({
        searchResult: result
        ,forecastResult: result
      });
    }

    this.setState({
      hasSearched: true
      ,isFound : found
    });

  }
  
  handleClick(e){
    //eslint-disable-next-line
    this.state.searchInput = document.getElementById('searchInput').value;
    this.getWeather();
    e.preventDefault();
  }

  render() {
    
    const noResult = (
      <div>
          <br/>
          <div className="alert alert-info text-center">
            Search for a city above.
          </div>
        </div>
      );

      let displayHTML;
      if(this.state.hasSearched){
        if(this.state.isFound){
          displayHTML = <ParseCity  weatherInfo={this.state.searchResult} forecastInfo={this.state.forecastResult}/>;
        } else {
          displayHTML = <NoResults searchWord={this.state.searchInput} />;
        }
        
      } else {
        displayHTML = noResult;
      }

      return (
      <div>
        <NavBar onClick={this.handleClick} />
        <div className="container">
          {displayHTML}
        </div>
      </div>
    );
  }
}

export default App;

class NavBar extends Component {
  
  render() {
    const nav = (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="./">Weather</a>
          <form className="form-inline" onSubmit={this.props.onClick}>
            <input id="searchInput" className="form-control mr-sm-2" type="search" placeholder="Search by city or zip" aria-label="Search" />
            <SearchButton onClick={this.props.onClick} />
          </form>
        </div>
      </nav>
    );
    return nav;
  }
}

class SearchButton extends Component {
 
  render() {
    return (
      <button className="btn btn-outline-info my-2 my-sm-0" type="submit" onClick={this.props.onClick} >Search</button>
    );
  }
}

class NoResults extends Component {
  render() {
    return (
      <div>
        <br/>
        <div className="alert alert-danger text-center" role="alert">
          "{this.props.searchWord}" was not found, please try again.
        </div>
      </div>
      
    );
  }
}

class Info extends Component{
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

class ParseCity extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      days: []
    };
  }
  

  formatDate(day){
    
    const d = new Date();
    let month = d.getMonth()+1;

    if(month < 10){
      month = "0" + month;
    }
    let temp = d.getFullYear() +"-"+ month +"-"+day;

    return temp;
  }
  
  getForecast(){

    const forecastArr = this.props.forecastInfo.list;
    
    const d = new Date();
    const tomorrow = d.getDate() +1;
    
    this.state.days = [this.formatDate(tomorrow), this.formatDate(tomorrow+1), this.formatDate(tomorrow+2), this.formatDate(tomorrow+3), this.formatDate(tomorrow+4)];
    let localDays = this.state.days;
    //console.log(days[2]);
    let dayWeather = [0,0,0,0,0];
    let dayDescription = [];
    let dayWind = [];
    
    for(var i = 0; i<forecastArr.length; i++){

      if(forecastArr[i].dt_txt.split(' ')[0] === localDays[0]){ 
        dayWeather[0] = forecastArr[i].main.temp;
        dayDescription[0] = forecastArr[i].weather[0].description;
        dayWind[0] = forecastArr[i].wind.speed;
      }

      if(forecastArr[i].dt_txt.split(' ')[0] === localDays[1]){
        dayWeather[1] = forecastArr[i].main.temp;
        dayDescription[1] = forecastArr[i].weather[0].description;
        dayWind[1] = forecastArr[i].wind.speed;
      }

      if(forecastArr[i].dt_txt.split(' ')[0] === localDays[2]){
        dayWeather[2] = forecastArr[i].main.temp;
        dayDescription[2] = forecastArr[i].weather[0].description;
        dayWind[2] = forecastArr[i].wind.speed;
      }

      if(forecastArr[i].dt_txt.split(' ')[0] === localDays[3]){
        dayWeather[3] = forecastArr[i].main.temp;
        dayDescription[3] = forecastArr[i].weather[0].description;
        dayWind[3] = forecastArr[i].wind.speed;
      }

      if(forecastArr[i].dt_txt.split(' ')[0] === localDays[4]){
        dayWeather[4] = forecastArr[i].main.temp;
        dayDescription[4] = forecastArr[i].weather[0].description;
        dayWind[4] = forecastArr[i].wind.speed;
      }

    }
    
    //console.log(dayWeather[0] + ", " + dayWeather[1] + ", " + dayWeather[2] + ", " + dayWeather[3] + ", " + dayWeather[4]);
    //.main.temp
    let allForecasts = [dayWeather, dayDescription, dayWind];
    return allForecasts;

  }

  parseInfo(){
    const result = this.props.weatherInfo;

    return (

      <div>
        <span className="h3 lead">{result.name}</span> 
        <div className="row">


          <div className="col-sm">
            <p>
              <span className="h1">{result.main.temp}</span> 
              <span className="h2"> &#8457; </span>
            </p>
            <sup>Low/high: {result.main.temp_min}/{result.main.temp_max} &#8457; </sup>
          </div>

          <div className="col-sm">
            
            <Info title="Description" data={result.weather[0].description}/>
            <Info title="Humidity" data={result.main.humidity+"%"}/>
            <Info title="Wind" data={result.wind.speed+" mph"}/>

          </div>

        </div>
        <hr/>
        <Forecast  forecast={this.getForecast()} dates={this.state.days}/>
        
      </div>

      );
  }
  
  render() {

    return (
      <div>
        <br/>
        <br/>
        <div className ="jumbotron">
          {this.parseInfo()}
        </div>
      </div>
    );
  }
}

class Forecast extends Component{
  
  generateCards(){

    const arr = this.props.dates;
    const dayWeather = this.props.forecast[0];
    const dayDescription = this.props.forecast[1];
    const dayWind = this.props.forecast[2];

    return dayWeather.map((item,i) => 
      <div className="col-sm-2" key={i}>
        <div className="card" style={{width: '0 em'}}>
          <div className="card-body">
            <h5 className="card-title text-center">{arr[i].split('-')[1]}/{arr[i].split('-')[2]}</h5>
            <hr/>
            <h6 className="card-subtitle mb-2 text-muted">{item} &#8457;</h6>
            <h6 className="card-subtitle mb-2 text-muted">{dayDescription[i]}</h6>
            <h6 className="card-subtitle mb-2 text-muted">wind: {dayWind[i]} mph</h6>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="row justify-content-center">
          {this.generateCards()}
      </div>
    );
  }
}
