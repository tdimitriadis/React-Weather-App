import React, { useState, useEffect, useCallback, FC } from "react"; // Import FC

import moment from "moment";

import "./css/simplereport.css";

// --- Interfaces ---
// Define necessary interfaces from WeatherAPI response locally
// TODO: Move these to a shared types file
interface ApiCondition {
  text: string;
  icon: string;
  code: number;
}
interface ApiCurrentWeather {
  temp_f: number;
  feelslike_f: number;
  pressure_in: number; // Use inches directly
  humidity: number;
  wind_mph: number;
  wind_degree: number;
  wind_dir: string; // Cardinal direction string
  condition: ApiCondition;
  // Add other fields if needed
}

// Props interface updated to use the new weather report type
interface Props {
  weatherReport?: ApiCurrentWeather; // Use the new interface, make optional
}

// --- Component ---
const SimpleReport: FC<Props> = ({ weatherReport }) => {
  // Typed state
  const [windSpeed, setWindSpeed] = useState<string>("");
  const [weatherDescription, setWeatherDescription] = useState<string>("");
  const [currentTemp, setCurrentTemp] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  // Updated function to use WeatherAPI fields
  const handleWindSpeed = useCallback(() => {
    // Use wind_dir directly if available, otherwise fallback or calculate if needed
    const direction = weatherReport?.wind_dir || "";
    const speed = weatherReport?.wind_mph;

    if (typeof speed === "undefined") {
      setWindSpeed("--"); // Reset or set to default if data is missing
      return;
    }

    // Combine direction (already cardinal) and speed
    setWindSpeed(`${direction} ${Math.round(speed)} MPH`);
  }, [weatherReport]);

  useEffect(() => {
    handleWindSpeed();

    // Update state using new WeatherAPI fields
    setCurrentTemp(
      weatherReport?.temp_f ? Math.round(weatherReport.temp_f) + "\xB0F" : "--"
    );
    setWeatherDescription(weatherReport?.condition?.text || "--");
    setCurrentDay(moment().format("dddd").toUpperCase());
  }, [handleWindSpeed, weatherReport]);

  // Helper function for safe rendering - remains useful
  const formatValue = (
    value: number | undefined,
    suffix: string = "",
    precision: number = 0
  ): string => {
    if (typeof value === "undefined" || value === null) return "--"; // Handle null too
    return `${
      precision > 0 ? value.toFixed(precision) : Math.round(value)
    }${suffix}`;
  };

  // Updated pressure formatting to use pressure_in directly
  const formatPressure = (pressureIn?: number): string => {
    if (typeof pressureIn === "undefined" || pressureIn === null) return "--";
    return pressureIn.toFixed(2) + " in"; // Already in inches
  };

  return (
    <div className="simple-report-grid-container">
      <div className="simple-report-current-weather-container">
        <div className="simple-report-current-weather">
          Current Weather Report
        </div>
        <div className="simple-report-line"></div>
      </div>
      <div className="simple-report-details-container">
        <div className="simple-report-detail-container">
          <span className="simple-report-detail">Humidity: </span>
          <span className="simple-report-detail-data">
            {/* Humidity field name is the same */}
            {formatValue(weatherReport?.humidity, "%")}
          </span>
        </div>
        <div className="simple-report-detail-container">
          <span className="simple-report-detail">Wind: </span>
          <span className="simple-report-detail-data">{windSpeed || "--"}</span>
        </div>
        <div className="simple-report-detail-container">
          <span className="simple-report-detail">Pressure: </span>
          <span className="simple-report-detail-data">
            {/* Use pressure_in directly */}
            {formatPressure(weatherReport?.pressure_in)}
          </span>
        </div>
        <div className="simple-report-detail-container">
          <span className="simple-report-detail">Feels Like: </span>
          <span className="simple-report-detail-data">
            {/* Use feelslike_f */}
            {formatValue(weatherReport?.feelslike_f, "\xB0F")}
          </span>
        </div>
      </div>
      <div className="simple-report-current-day-container">
        <div className="simple-report-current-day">{currentDay || "--"}</div>
        <div className="simple-report-weather-description">
          {weatherDescription || "--"}
        </div>
      </div>
      <div className="simple-report-temperature-container">
        <div className="simple-report-temperature">{currentTemp || "--"}</div>
      </div>
    </div>
  );
};

export default SimpleReport;
