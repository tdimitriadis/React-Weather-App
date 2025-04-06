import React, { FC } from "react";

import moment from "moment";

// Removed ICONS import
// import { ICONS } from '../constants';

import "./css/hourlyForecast.css";

// --- Interfaces & Types ---
// Define necessary interfaces from WeatherAPI response locally
// TODO: Move these to a shared types file
interface ApiCondition {
  text: string;
  icon: string; // URL path
  code: number;
}

interface ApiHourForecast {
  time_epoch: number;
  time: string;
  temp_f: number;
  condition: ApiCondition;
  // Add other fields if needed by this component
}

// Update Props interface to accept the hourly forecast array directly
interface Props {
  hourlyData?: ApiHourForecast[]; // Make optional, as parent might not have data yet
}

// --- Component ---
const HourlyForecast: FC<Props> = ({ hourlyData }) => {
  // Render function for hourly items using new data structure
  const renderHourlyItems = () => {
    // Check if hourly data exists and is an array
    if (!hourlyData || !Array.isArray(hourlyData)) {
      return <div className="hourly-forecast-loading">Loading forecast...</div>; // Provide feedback
    }

    return hourlyData.map((val, i) => {
      // Limit to first 14 items (or adjust as needed)
      if (i >= 14) {
        return null;
      }

      // Use new fields from ApiHourForecast
      const time = val.time_epoch
        ? moment.unix(val.time_epoch).format("h A")
        : "--";
      const temp =
        typeof val.temp_f !== "undefined"
          ? Math.round(val.temp_f) + "\xB0"
          : "--";
      const iconUrlPath = val.condition?.icon;
      const iconSrc = iconUrlPath ? `https:${iconUrlPath}` : undefined;
      const conditionText = val.condition?.text || "Weather icon"; // Alt text

      return (
        <div className={`hourly-forecast-${i + 1}`} key={val.time_epoch || i}>
          {" "}
          {/* Use time_epoch for key */}
          <div className="hourly-forecast-time">{time}</div>
          {iconSrc ? (
            <img
              className="hourly-forecast-icon"
              src={iconSrc}
              alt={conditionText} // Use condition text for alt
            />
          ) : (
            <div className="hourly-forecast-icon-placeholder"></div> // Placeholder if no icon
          )}
          <div className="hourly-forecast-temp">{temp}</div>
        </div>
      );
    });
  };

  return (
    <div className="hourly-forecast-grid-container">
      <div className="hourly-forecast-header">
        <div className="hourly-forecast-title">Hourly Forecast</div>{" "}
        <div className="hourly-forecast-line"></div>
      </div>
      {renderHourlyItems()} {/* Call the render function */}
    </div>
  );
};

export default HourlyForecast;
