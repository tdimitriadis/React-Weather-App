import React, { FC } from 'react'; // Import FC

import moment from 'moment';

import { ICONS } from '../constants'; // Use .ts (implicitly)

import './css/hourlyForecast.css';

// --- Interfaces & Types ---
interface WeatherHourly {
  dt?: number;
  temp?: number;
  weather?: {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
  // Add other fields from WeatherHourly if needed
}

interface WeatherReportState {
  // Define structure based on parent component's state
  lat?: number;
  lon?: number;
  timezone?: string;
  timezone_offset?: number;
  current?: any; // Define if needed, or import from shared types
  hourly?: WeatherHourly[];
  daily?: any[]; // Define if needed, or import from shared types
}

interface Props {
  weatherReport: WeatherReportState; // Prop received from parent
}

// Type for Icon Keys from constants.ts
type IconKey = keyof typeof ICONS;

// Type guard function
const isValidIconKey = (key: string | undefined): key is IconKey => {
  return key !== undefined && key in ICONS;
};

// --- Component ---
const HourlyForecast: FC<Props> = ({ weatherReport }) => {

  // Render function for hourly items with type safety
  const renderHourlyItems = () => {
    // Check if hourly data exists and is an array
    if (!weatherReport?.hourly || !Array.isArray(weatherReport.hourly)) {
      return null; // Or return a loading/placeholder state
    }

    return weatherReport.hourly.map((val, i) => {
      // Limit to first 14 items
      if (i >= 14) {
        return null;
      }

      // Safely access nested properties
      const weatherIcon = val.weather?.[0]?.icon;
      const time = val.dt ? moment.unix(val.dt).format('h A') : '--';
      const temp = typeof val.temp !== 'undefined' ? Math.round(val.temp) + '\xB0' : '--';

      // Use type guard for icon source
      const iconSrc = isValidIconKey(weatherIcon) ? ICONS[weatherIcon] : undefined;

      return (
        <div className={`hourly-forecast-${i + 1}`} key={val.dt || i}> {/* Use dt for key if available */}
          <div className='hourly-forecast-time'>{time}</div>
          {iconSrc ? (
             <img
               className='hourly-forecast-icon'
               src={iconSrc}
               alt={val.weather?.[0]?.description || 'weather icon'} // Use description for alt text
             />
           ) : (
             <div className='hourly-forecast-icon-placeholder'></div> // Placeholder if no icon
           )}
          <div className='hourly-forecast-temp'>{temp}</div>
        </div>
      );
    });
  };

  return (
    <div className='hourly-forecast-grid-container'>
      <div className='hourly-forecast-header'>
        <div className='hourly-forecast-title'>Forecast</div>
        <div className='hourly-forecast-line'></div>
      </div>
      {renderHourlyItems()} {/* Call the render function */}
    </div>
  );
};

export default HourlyForecast;
