import React, { FC } from "react"; // Import FC

import Button from "../components/Button"; // Use .tsx (implicitly)
import { SEVEN_DAY_ICONS } from "../constants"; // Use .ts (implicitly)

import "./css/currentLocation.css";

// --- Type for Icon Keys ---
type IconKey = keyof typeof SEVEN_DAY_ICONS;

// --- Interfaces ---
interface LocationState {
  statename: string;
  city: string;
}

interface WeatherCurrent {
  weather?: {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
}

interface Props {
  location: LocationState;
  weatherReport?: WeatherCurrent; // Optional based on parent usage
  click: () => void;
}

// --- Component ---
const CurrentLocation: FC<Props> = ({ location, weatherReport, click }) => {
  // Use optional chaining robustly
  const weatherIcon = weatherReport?.weather?.[0]?.icon;

  // Type guard to check if the icon string is a valid key
  const isValidIconKey = (key: string | undefined): key is IconKey => {
    return key !== undefined && key in SEVEN_DAY_ICONS;
  };

  // Use the type guard before accessing the object
  const iconSrc = isValidIconKey(weatherIcon) ? SEVEN_DAY_ICONS[weatherIcon] : undefined;

  return (
    <div className="current-location-grid-container">
      <div className="current-location-image">
        {iconSrc ? ( // Conditionally render image if src exists
          <img
            className="current-location-icon"
            src={iconSrc}
            alt="Weather Icon"
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
