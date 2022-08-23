import './App.css';

import { useState } from 'react';
const api = {
 base: "https://api.openweathermap.org/data/2.5/",
 key: process.env.REACT_APP_API_KEY
}

let today = new Date().toDateString();

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch (`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }


  return (
    <div className={typeof weather.main != "undefined" ? (weather.main.temp > 16) ? 'app warm' : 'app cool' : 'app'}>
      <main>
        <div className="search-box">
          <input 
          type="text" 
          className="search-bar" 
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value = {query}
          onKeyPress={search}
          ></input>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{today}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°C
              <div className='temp-lowhigh'>low: {Math.round(weather.main.temp_min)} high: {Math.round(weather.main.temp_max)} </div>
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ("") }
      </main>
    </div>
  );
}

export default App;
