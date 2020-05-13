import React from "react";

import Button from "../components/Button.jsx";
import { SEVEN_DAY_ICONS } from "../constants.js";

import "./css/currentLocation.css";

const CurrentLocation = ({ location, weatherReport, click }) => {
  const weatherIcon = weatherReport?.weather[0].icon;

  return (
    <div className="current-location-grid-container">
      <div className="current-location-image">
        <img
          className="current-location-icon"
          src={SEVEN_DAY_ICONS[`${weatherIcon}`]}
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
          <Button onClick={click} value="Change Location" />
        </span>
      </div>
    </div>
  );
};

export default CurrentLocation;
