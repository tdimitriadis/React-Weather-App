import React, { useState, useEffect, useCallback } from 'react';

import Button from '../components/Button.jsx';
import './css/currentLocation.css';

const CurrentLocation = ({ location, weatherReport }) => {
  const [weatherIcon, setWeatherIcon] = useState(undefined);

  const getWeatherIcon = useCallback(() => {
    weatherReport &&
      fetch(
        `http://openweathermap.org/img/wn/${weatherReport.weather[0].icon}@2x.png`
      ).then((data) => {
        setWeatherIcon(data.url);
      });
  }, [weatherReport]);

  useEffect(() => {
    getWeatherIcon();
  }, [getWeatherIcon, weatherReport]);

  return (
    <div className="current-location-grid-container">
      <div className="current-location-image">
        <img
          className="current-location-icon"
          src={weatherIcon}
          alt="Weather Icon"
        />
      </div>
      <div className="current-location-city">
        <span className="current-location-city-name">
          {location && location.city}
        </span>
        <div className="current-location-state-name">
          City in {location && location.statename}
        </div>
      </div>
      <div className="current-location-change-location">
        <span className="current-location-button">
          <Button value="Change Location" />
        </span>
      </div>
    </div>
  );
};

export default CurrentLocation;
