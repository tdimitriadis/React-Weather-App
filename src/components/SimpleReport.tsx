import React, { useState, useEffect, useCallback, FC } from 'react'; // Import FC

import moment from 'moment';

import './css/simplereport.css';

// --- Interfaces ---
interface WeatherCurrent {
  dt?: number;
  sunrise?: number;
  sunset?: number;
  temp?: number;
  feels_like?: number;
  pressure?: number;
  humidity?: number;
  dew_point?: number;
  uvi?: number;
  clouds?: number;
  visibility?: number;
  wind_speed?: number;
  wind_deg?: number;
  weather?: {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
}

interface Props {
  weatherReport?: WeatherCurrent; // Optional based on parent usage
}

// --- Component ---
const SimpleReport: FC<Props> = ({ weatherReport }) => {
  // Typed state
  const [windSpeed, setWindSpeed] = useState<string>('');
  const [weatherDescription, setWeatherDescription] = useState<string>('');
  const [currentTemp, setCurrentTemp] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');

  // Typed function with checks for undefined
  const handleWindSpeed = useCallback(() => {
    if (!weatherReport || typeof weatherReport.wind_deg === 'undefined' || typeof weatherReport.wind_speed === 'undefined') {
      setWindSpeed(''); // Reset or set to default if data is missing
      return;
    }

    const windDirection = weatherReport.wind_deg;
    let cardinalWindDirection = '';

    if (windDirection < 11.25 || windDirection > 348.75)
      cardinalWindDirection = 'N ';
    else if (windDirection > 11.25 && windDirection < 78.75)
      cardinalWindDirection = 'NE ';
    else if (windDirection > 78.75 && windDirection < 123.75)
      cardinalWindDirection = 'E ';
    else if (windDirection > 123.75 && windDirection < 168.75)
      cardinalWindDirection = 'SE ';
    else if (windDirection > 168.75 && windDirection < 213.75)
      cardinalWindDirection = 'S ';
    else if (windDirection > 213.75 && windDirection < 258.75)
      cardinalWindDirection = 'SW ';
    else if (windDirection > 258.75 && windDirection < 281.25)
      cardinalWindDirection = 'W ';
    else if (windDirection > 281.25 && windDirection < 348.75)
      cardinalWindDirection = 'NW ';

    setWindSpeed(
      cardinalWindDirection + Math.round(weatherReport.wind_speed) + ' MPH'
    );
  }, [weatherReport]);

  useEffect(() => {
    handleWindSpeed();

    // Use optional chaining and provide fallbacks
    setCurrentTemp(weatherReport?.temp ? Math.round(weatherReport.temp) + '\xB0F' : '');
    setWeatherDescription(weatherReport?.weather?.[0]?.main || '');
    setCurrentDay(moment().format('dddd').toUpperCase());
  }, [handleWindSpeed, weatherReport]);

  // Helper function for safe rendering of potentially undefined numbers
  const formatValue = (value: number | undefined, suffix: string = '', precision: number = 0): string => {
    if (typeof value === 'undefined') return '--'; // Or some other placeholder
    return `${precision > 0 ? value.toFixed(precision) : Math.round(value)}${suffix}`;
  }

  const formatPressure = (pressure?: number): string => {
    if (typeof pressure === 'undefined') return '--';
    return (pressure * 0.02953).toFixed(2) + ' in';
  }

  return (
    <div className='simple-report-grid-container'>
      <div className='simple-report-current-weather-container'>
        <div className='simple-report-current-weather'>
          Current Weather Report
        </div>
        <div className='simple-report-line'></div>
      </div>
      <div className='simple-report-details-container'>
        <div className='simple-report-detail-container'>
          <span className='simple-report-detail'>Humidity: </span>
          <span className='simple-report-detail-data'>
            {formatValue(weatherReport?.humidity, '%')}
          </span>
        </div>
        <div className='simple-report-detail-container'>
          <span className='simple-report-detail'>Wind: </span>
          <span className='simple-report-detail-data'>{windSpeed || '--'}</span>
        </div>
        <div className='simple-report-detail-container'>
          <span className='simple-report-detail'>Pressure: </span>
          <span className='simple-report-detail-data'>
            {formatPressure(weatherReport?.pressure)}
          </span>
        </div>
        <div className='simple-report-detail-container'>
          <span className='simple-report-detail'>Feels Like: </span>
          <span className='simple-report-detail-data'>
            {formatValue(weatherReport?.feels_like, '\xB0F')}
          </span>
        </div>
      </div>
      <div className='simple-report-current-day-container'>
        <div className='simple-report-current-day'>{currentDay || '--'}</div>
        <div className='simple-report-weather-description'>
          {weatherDescription || '--'}
        </div>
      </div>
      <div className='simple-report-temperature-container'>
        <div className='simple-report-temperature'>{currentTemp || '--'}</div>
      </div>
    </div>
  );
};

export default SimpleReport;
