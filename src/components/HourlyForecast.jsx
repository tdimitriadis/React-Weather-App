import React from 'react';

import moment from 'moment';

import { ICONS } from '../constants.js';

import './css/hourlyForecast.css';

const HourlyForecast = ({ weatherReport }) => {
  const hourly = () => {
    return (
      weatherReport.hourly &&
      weatherReport.hourly.map((val, i) => {
        let weatherIcon = val.weather[0].icon;
        let time = moment.unix(val.dt).format('h A');

        if (i >= 14) {
          return null;
        }

        return (
          <div className={`hourly-forecast-${i + 1}`} key={i}>
            <div className='hourly-forecast-time'>{time}</div>
            <img
              className='hourly-forecast-icon'
              src={ICONS[`${weatherIcon}`]}
              alt='weatherIcon'
            ></img>
            <div className='hourly-forecast-temp'>
              {Math.round(val.temp) + '\xB0'}
            </div>
          </div>
        );
      })
    );
  };

  return (
    <div className='hourly-forecast-grid-container'>
      <div className='hourly-forecast-header'>
        <div className='hourly-forecast-title'>Forecast</div>
        <div className='hourly-forecast-line'></div>
      </div>
      {hourly()}
    </div>
  );
};

export default HourlyForecast;
