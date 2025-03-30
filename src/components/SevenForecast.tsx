import React, { FC } from "react"; // Import FC

import moment from "moment";

import { SEVEN_DAY_ICONS } from "../constants"; // Use .ts (implicitly)

import "./css/sevenForecast.css";

// --- Interfaces & Types ---
interface WeatherDailyTemp {
  day?: number;
  // Add other fields if needed
}

interface WeatherDaily {
  dt?: number;
  temp?: WeatherDailyTemp;
  weather?: {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
  // Add other fields if needed
}

interface WeatherReportState {
  // Define structure based on parent component's state
  lat?: number;
  lon?: number;
  timezone?: string;
  timezone_offset?: number;
  current?: any; // Define if needed
  hourly?: any[]; // Define if needed
  daily?: WeatherDaily[];
}

interface Props {
  weatherReport: WeatherReportState; // Prop received from parent
}

// Type for Icon Keys from constants.ts
type IconKey = keyof typeof SEVEN_DAY_ICONS;

// Type guard function
const isValidIconKey = (key: string | undefined): key is IconKey => {
  return key !== undefined && key in SEVEN_DAY_ICONS;
};

// Helper to safely capitalize
const capitalize = (s?: string): string => {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// --- Component ---
const SevenForecast: FC<Props> = ({ weatherReport }) => {

  // Render function for daily items with type safety
  const renderDailyItems = () => {
    // Check if daily data exists and is an array
    if (!weatherReport?.daily || !Array.isArray(weatherReport.daily)) {
      return null; // Or return a loading/placeholder state
    }

    return weatherReport.daily.map((val, i) => {
      // Limit to first 7 items
      if (i >= 7) {
        return null;
      }

      // Safely access nested properties
      const weatherIcon = val.weather?.[0]?.icon;
      const day = val.dt ? moment.unix(val.dt).format("dddd") : '--';
      const description = val.weather?.[0]?.description || '';
      const temp = typeof val.temp?.day !== 'undefined' ? Math.round(val.temp.day) + "\xB0" : '--';

      // Use type guard for icon source
      const iconSrc = isValidIconKey(weatherIcon) ? SEVEN_DAY_ICONS[weatherIcon] : undefined;

      return (
        <div className={`seven-forecast-${i + 1}`} key={val.dt || i}> {/* Use dt for key */}
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

  return <div className="seven-forecast-grid-container">{renderDailyItems()}</div>;
};

export default SevenForecast;
