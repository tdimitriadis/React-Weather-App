import React, { useState, useEffect } from 'react';

import * as data from '../assets/testDataStockton.json';
import locationData from '../assets/locationTestData.json';
import SimpleReport from '../components/SimpleReport';
import CurrentLocation from '../components/CurrentLocation';

import './css/weather.css';

const Weather = () => {
  const [weatherReport, setWeatherReport] = useState({});
  const [location, setLocation] = useState({});
  const APIKEY = '4c960f34f15cb8711899b9bf6b4f763d';

  // useEffect(() => {
  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/onecall?lat=37.9577&lon=-121.2908&units=imperial&appid=${APIKEY}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setWeatherReport(data);
  //     });
  //   fetch(`https://geocode.xyz/37.9577,-121.2908?geoit=json`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setLocation(data);
  //     });
  //   fetch(`https://geocode.xyz/stockton+california?json=1`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  useEffect(() => {
    setWeatherReport(data.default);
    setLocation(locationData);
    console.log(locationData);
  }, []);

  return (
    <div className="weather-container">
      <div className="weather-modal">Modal</div>

      <div className="weather-grid-container">
        <div className="weather-current-location">
          <CurrentLocation
            location={location}
            weatherReport={weatherReport.current}
          />
        </div>
        <div className="weather-around-the-world">Around the world</div>
        <div className="weather-current">
          <SimpleReport weatherReport={weatherReport.current} />
        </div>
        <div className="weather-forecast">Forecast</div>
        <div className="weather-seven-day">Seven day</div>
      </div>
    </div>
  );
};

export default Weather;
