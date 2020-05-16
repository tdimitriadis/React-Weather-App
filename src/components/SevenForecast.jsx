import React from "react";

import moment from "moment";

import { SEVEN_DAY_ICONS } from "../constants.js";

import "./css/sevenForecast.css";

const SevenForecast = ({ weatherReport }) => {
  const daily = () => {
    return (
      weatherReport.daily &&
      weatherReport.daily.map((val, i) => {
        let weatherIcon = val.weather[0].icon;
        let day = moment.unix(val.dt).format("dddd");
        let description = val.weather[0].description;

        if (i >= 7) {
          return null;
        }

        return (
          <div className={`seven-forecast-${i + 1}`} key={i}>
            {day}
            <div>
              <div className="seven-forecast-description">
                {description.replace(/^./, description[0].toUpperCase())}
              </div>
              <img
                className="seven-forecast-icon"
                src={SEVEN_DAY_ICONS[`${weatherIcon}`]}
                alt="weatherIcon"
              ></img>
            </div>
            <div className="seven-forecast-temp">
              {Math.round(val.temp.day) + "\xB0"}
            </div>
          </div>
        );
      })
    );
  };

  return <div className="seven-forecast-grid-container">{daily()}</div>;
};

export default SevenForecast;
