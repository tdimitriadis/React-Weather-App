import React, { useState, useEffect, useCallback } from 'react';

import moment from 'moment';

import './css/simplereport.css';

const SimpleReport = ({ weatherReport }) => {
  console.log('weatherReport: ', weatherReport);
  const [windSpeed, setWindSpeed] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [currentTemp, setCurrentTemp] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  const handleWindSpeed = useCallback(() => {
    let windDirection = weatherReport && weatherReport.wind_deg;
    let cardinalWindDirection = '';

    if (windDirection < 11.25 || windDirection > 348.75)
      cardinalWindDirection = 'N ';
    else if (windDirection > 11.25 && windDirection < 78.75)
      cardinalWindDirection = 'NE ';
    else if (windDirection > 78.75 && windDirection < 123.75)
      cardinalWindDirection = 'E ';
    else if (windDirection > 123.75 && windDirection < 168.75)
      cardinalWindDirection = 'SE ';
    else if (windDirection > 168.75 && windDirection < 213.75)
      cardinalWindDirection = 'S ';
    else if (windDirection > 213.75 && windDirection < 258.75)
      cardinalWindDirection = 'SW ';
    else if (windDirection > 258.75 && windDirection < 281.25)
      cardinalWindDirection = 'W ';
    else if (windDirection > 281.25 && windDirection < 348.75)
      cardinalWindDirection = 'NW ';

    weatherReport &&
      setWindSpeed(
        cardinalWindDirection + Math.round(weatherReport.wind_speed) + ' MPH',
      );
  }, [weatherReport]);

  useEffect(() => {
    handleWindSpeed();

    setCurrentTemp(weatherReport && Math.round(weatherReport.temp) + '\xB0F');
    setWeatherDescription(weatherReport && weatherReport.weather[0].main);
    setCurrentDay(moment().format('dddd').toUpperCase());
  }, [handleWindSpeed, weatherReport]);

  return (
    <div className='simple-report-grid-container'>
      <div className='simple-report-current-weather-container'>
        <div className='simple-report-current-weather'>
          Current Weather Report
        </div>
        <div className='simple-report-line'></div>
      </div>
      <div className='simple-report-details-container'>
        <div className='simple-report-detail-container'>
          <span className='simple-report-detail'>Humidity: </span>
          <span className='simple-report-detail-data'>
            {weatherReport?.humidity + '%'}
          </span>
        </div>
        <div className='simple-report-detail-container'>
          <span className='simple-report-detail'>Wind: </span>
          <span className='simple-report-detail-data'>{windSpeed}</span>
        </div>
        <div className='simple-report-detail-container'>
          <span className='simple-report-detail'>Pressure: </span>
          <span className='simple-report-detail-data'>
            {weatherReport &&
              (weatherReport.pressure * 0.02953).toFixed(2) + ' in'}
          </span>
        </div>
        <div className='simple-report-detail-container'>
          <span className='simple-report-detail'>Feels Like: </span>
          <span className='simple-report-detail-data'>
            {weatherReport && Math.round(weatherReport.feels_like) + '\xB0F'}
          </span>
        </div>
      </div>
      <div className='simple-report-current-day-container'>
        <div className='simple-report-current-day'>{currentDay}</div>
        <div className='simple-report-weather-description'>
          {weatherDescription}
        </div>
      </div>
      <div className='simple-report-temperature-container'>
        <div className='simple-report-temperature'>{currentTemp}</div>
      </div>
    </div>
  );
};

export default SimpleReport;
