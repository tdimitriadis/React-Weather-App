import React, { useState, useEffect } from 'react';

import * as data from '../assets/testData.json';
import SimpleReport from '../components/SimpleReport';
import './css/weather.css';

const Weather = () => {
  const [weatherReport, setWeatherReport] = useState({});
  const APIKEY = '4c960f34f15cb8711899b9bf6b4f763d';

  // useEffect(() => {
  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/onecall?lat=34.052235&lon=-118.243683&units=imperial&appid=${APIKEY}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setWeatherReport(data);
  //     });
  // }, []);

  useEffect(() => {
    setWeatherReport(data.default);
  }, []);

  return (
    <div className='weather-container'>
      <div className='weather-grid-container'>
        <div className='weather-current-location'>Current Location</div>
        <div className='weather-around-the-world'>Around the world</div>
        <div className='weather-current'>
          <SimpleReport weatherReport={weatherReport.current} />
        </div>
        <div className='weather-forecast'>Forecast</div>
        <div className='weather-seven-day'>Seven day</div>
      </div>
    </div>
  );
};

export default Weather;