import React, { useState, useEffect, useCallback } from 'react';

import moment from 'moment';
import cloudy from '../assets/WeatherIcons/cloudy.svg';

import './css/simplereport.css';

const SimpleReport = ({ weatherReport }) => {
  const [windSpeed, setWindSpeed] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [currentTemp, setCurrentTemp] = useState('');

  console.log(weatherReport);
  let currentDay = moment().format('dddd');

  const handleWindSpeed = useCallback(() => {
    let windDirection = weatherReport && weatherReport.wind_deg;
    let cardinalWindDirection = '';

    if (windDirection < 11.25 || windDirection > 348.75)
      cardinalWindDirection = ' N';
    else if (windDirection > 11.25 && windDirection < 78.75)
      cardinalWindDirection = ' NE';
    else if (windDirection > 78.75 && windDirection < 123.75)
      cardinalWindDirection = ' E';
    else if (windDirection > 123.75 && windDirection < 168.75)
      cardinalWindDirection = ' SE';
    else if (windDirection > 168.75 && windDirection < 213.75)
      cardinalWindDirection = ' S';
    else if (windDirection > 213.75 && windDirection < 258.75)
      cardinalWindDirection = 'SW';
    else if (windDirection > 258.75 && windDirection < 281.25)
      cardinalWindDirection = ' W';
    else if (windDirection > 281.25 && windDirection < 348.75)
      cardinalWindDirection = ' NW';

    weatherReport &&
      setWindSpeed(
        Math.round(weatherReport.wind_speed) + ' MPH' + cardinalWindDirection
      );
  }, [weatherReport]);

  useEffect(() => {
    handleWindSpeed();
    setCurrentTemp(weatherReport && weatherReport.temp + ' \xB0F');
    setWeatherDescription(weatherReport && weatherReport.weather[0].main);
  }, [handleWindSpeed, weatherReport]);

  const getWeatherIcon = () => {};

  return (
    <div className='simple-report-grid-container'>
      <div className='simple-report-current-weather-container'>
        <div className='simple-report-current-weather'>Current Weather</div>
        <div className='simple-report-line '></div>
      </div>
      <div className='simple-report-image-container'>
        <img className='simple-report-icon' src={cloudy} alt='React Logo' />
      </div>
      <div className='simple-report-wind-container'>
        <div className='simple-report-wind'>{windSpeed}</div>
      </div>
      <div className='simple-report-current-day-container'>
        <div className='simple-report-current-day'>{currentDay}</div>
        <div>{weatherDescription}</div>
      </div>
      <div className='simple-report-temperature-container'>
        <div className='simple-report-temperature'>{currentTemp}</div>
      </div>
    </div>
  );
};

export default SimpleReport;
