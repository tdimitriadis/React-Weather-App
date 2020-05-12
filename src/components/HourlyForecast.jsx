import React, { useState } from "react";

import moment from "moment";

import { icons } from "../constants.js";

import "./css/hourlyForecast.css";

const HourlyForecast = ({ weatherReport }) => {
  console.log(icons[0]["01d"]);

  const hourly = () => {
    return (
      weatherReport.hourly &&
      weatherReport.hourly.map((val, i) => {
        if (i >= 14) {
          return null;
        }
        let time = moment.unix(val.dt).format("h A");
        console.log("val.weather[0].icon: ", val.weather[0].icon);

        return (
          <div className={`hourly-forecast-${i + 1}`} key={i}>
            <div className="hourly-forecast-time">{time}</div>
            <img
              className="hourly-forecast-icon"
              src={icons[6]["04d"]}
              alt="weatherIcon"
            ></img>
            <div className="hourly-forecast-temp">
              {Math.round(val.temp) + "\xB0"}
            </div>
          </div>
        );
      })
    );
  };

  return (
    <div className="hourly-forecast-grid-container">
      <div className="hourly-forecast-header">
        <div className="hourly-forecast-title">Forecast</div>
        <div className="hourly-forecast-line"></div>
      </div>
      {hourly()}
    </div>
  );
};

export default HourlyForecast;
