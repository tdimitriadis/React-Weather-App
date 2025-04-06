import React, { FC } from "react";

import Button from "../components/Button";
// Removed SEVEN_DAY_ICONS import

import "./css/currentLocation.css";

// --- Interfaces ---
// Define necessary interfaces from WeatherAPI response locally
// TODO: Move these to a shared types file
interface ApiCondition {
  text: string;
  icon: string; // URL path (e.g., //cdn.weatherapi.com/weather/64x64/day/116.png)
  code: number;
}
interface ApiCurrentWeather {
  condition: ApiCondition;
  // Add other fields from ApiCurrentWeather if needed by this component in the future
  // temp_f: number;
  // feelslike_f: number;
}

// Location state remains the same
interface LocationState {
  statename: string;
  city: string;
}

// Props interface updated to use the new weather report type
interface Props {
  location: LocationState;
  weatherReport?: ApiCurrentWeather; // Use the new interface, make optional
  click: () => void;
}

// --- Component ---
const CurrentLocation: FC<Props> = ({ location, weatherReport, click }) => {
  // Get icon URL and description directly from the new structure
  const iconUrlPath = weatherReport?.condition?.icon;
  // WeatherAPI icon URLs start with //, prepend https:
  const iconSrc = iconUrlPath ? `https:${iconUrlPath}` : undefined;
  const conditionText =
    weatherReport?.condition?.text || "Current weather condition"; // Default alt text

  return (
    <div className="current-location-grid-container">
      <div className="current-location-image">
        {iconSrc ? ( // Conditionally render image if src exists
          <img
            className="current-location-icon"
            src={iconSrc}
            alt={conditionText} // Use condition text for alt
          />
        ) : (
          // Optional: Placeholder or leave empty if no icon
          <div className="current-location-icon-placeholder"></div>
        )}
      </div>
      <div className="current-location-city">
        {/* location prop is required by interface, no need for && check */}
        <span className="current-location-city-name">{location.city}</span>
        <div className="current-location-state-name">
          City in {location.statename}
        </div>
      </div>
      <div className="current-location-change-location">
        <span className="current-location-button">
          {/* Assuming Button component will be typed later */}
          <Button onClick={click} value="Change Location" />
        </span>
      </div>
    </div>
  );
};

export default CurrentLocation;
