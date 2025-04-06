import React, { FC } from "react";

import moment from "moment";

// Removed SEVEN_DAY_ICONS import
// import { SEVEN_DAY_ICONS } from "../constants";

import "./css/sevenForecast.css";

// --- Interfaces & Types ---
// Define necessary interfaces from WeatherAPI response locally
// TODO: Move these to a shared types file
interface ApiCondition {
  text: string;
  icon: string; // URL path
  code: number;
}

interface ApiDayForecastMetrics {
  maxtemp_f: number;
  mintemp_f: number; // Available if needed
  condition: ApiCondition;
  // Add other fields if needed
}

interface ApiForecastDay {
  date: string;
  date_epoch: number;
  day: ApiDayForecastMetrics;
  // astro: ApiAstro; // Available if needed
  // hour: ApiHourForecast[]; // Available if needed
}

// Update Props interface to accept the daily forecast array directly
interface Props {
  dailyData?: ApiForecastDay[]; // Make optional
}

// Helper to safely capitalize (still useful)
const capitalize = (s?: string): string => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// --- Component ---
const SevenForecast: FC<Props> = ({ dailyData }) => {
  // Render function for daily items using new data structure
  const renderDailyItems = () => {
    // Check if daily data exists and is an array
    if (!dailyData || !Array.isArray(dailyData)) {
      return <div className="seven-forecast-loading">Loading forecast...</div>; // Provide feedback
    }

    return dailyData.map((val, i) => {
      // API usually returns enough days, but limit just in case or if desired
      if (i >= 7) {
        return null;
      }

      // Use new fields from ApiForecastDay and nested objects
      const day = val.date_epoch
        ? moment.unix(val.date_epoch).format("dddd")
        : "--";
      const description = val.day?.condition?.text || "";
      // Using max temp for consistency with previous implementation
      const temp =
        typeof val.day?.maxtemp_f !== "undefined"
          ? Math.round(val.day.maxtemp_f) + "\xB0"
          : "--";
      const iconUrlPath = val.day?.condition?.icon;
      const iconSrc = iconUrlPath ? `https:${iconUrlPath}` : undefined;

      return (
        <div className={`seven-forecast-${i + 1}`} key={val.date_epoch || i}>
          {" "}
          {/* Use date_epoch for key */}
          {day}
          <div>
            <div className="seven-forecast-description">
              {capitalize(description)}
            </div>
            {iconSrc ? (
              <img
                className="seven-forecast-icon"
                src={iconSrc}
                alt={description} // Use description for alt text
              />
            ) : (
              <div className="seven-forecast-icon-placeholder"></div> // Placeholder
            )}
          </div>
          <div className="seven-forecast-temp">{temp}</div>
        </div>
      );
    });
  };

  return (
    <div className="seven-forecast-grid-container">{renderDailyItems()}</div>
  );
};

export default SevenForecast;
