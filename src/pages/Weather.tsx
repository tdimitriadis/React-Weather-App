import React, { useState, useEffect, FC } from "react"; // Import FC

// Import components (assuming they will be/are .tsx)
import SimpleReport from "../components/SimpleReport";
import CurrentLocation from "../components/CurrentLocation";
import Modal from "../components/Modal"; // Changed from .jsx
import HourlyForecast from "../components/HourlyForecast";
import SevenForecast from "../components/SevenForecast"; // Changed from .jsx
import AroundWorld from "../components/AroundWorld"; // Changed from .jsx

import "./css/weather.css";

// --- Interfaces and Types for WeatherAPI.com ---

// Basic interface for location state (used for display)
interface LocationState {
  statename: string; // Corresponds to 'region' in API
  city: string; // Corresponds to 'name' in API
}

// Type for the input to handleChangeLocation (remains the same)
type LocationInput = { [key: string]: string };

// WeatherAPI Location Object
interface ApiLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

// WeatherAPI Condition Object
interface ApiCondition {
  text: string;
  icon: string; // URL path
  code: number;
}

// WeatherAPI Current Weather Object
interface ApiCurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number; // 1 = Yes, 0 = No
  condition: ApiCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number; // Cloud cover as percentage
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

// WeatherAPI Daily Forecast Metrics (within 'day' object)
interface ApiDayForecastMetrics {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number; // 1 = Yes, 0 = No
  daily_chance_of_rain: number; // Percentage
  daily_will_it_snow: number; // 1 = Yes, 0 = No
  daily_chance_of_snow: number; // Percentage
  condition: ApiCondition;
  uv: number;
}

// WeatherAPI Astro Object (within 'forecastday')
interface ApiAstro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string; // Percentage
}

// WeatherAPI Hourly Forecast Object (within 'hour' array)
interface ApiHourForecast {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: ApiCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

// WeatherAPI Forecast Day Object (within 'forecastday' array)
interface ApiForecastDay {
  date: string;
  date_epoch: number;
  day: ApiDayForecastMetrics;
  astro: ApiAstro;
  hour: ApiHourForecast[]; // Array of hourly forecasts for this day
}

// WeatherAPI Forecast Object (contains 'forecastday' array)
interface ApiForecast {
  forecastday: ApiForecastDay[];
}

// Main WeatherAPI Response Structure (used for weatherReport state)
interface WeatherApiResponse {
  location?: ApiLocation;
  current?: ApiCurrentWeather;
  forecast?: ApiForecast;
}

// --- Component ---

const Weather: FC = () => {
  // Typed state hooks - Use the new main response interface
  const [weatherReport, setWeatherReport] = useState<WeatherApiResponse>({});
  const [location, setLocation] = useState<LocationState>({
    statename: "",
    city: "",
  }); // Initialize with empty strings
  const [modal, setModal] = useState<boolean>(false);

  // Ensure API key is treated as string (or handle potential undefined)
  const WEATHER_API_KEY: string = import.meta.env.VITE_WEATHER_API_KEY || "";
  // const GOOGLE_API_KEY: string = import.meta.env.VITE_GOOGLE_API_KEY || ""; // Removing Google API for now

  useEffect(() => {
    // Initial fetch for default location (San Francisco) using WeatherAPI.com
    if (WEATHER_API_KEY) {
      // Using WeatherAPI forecast endpoint. 'q' can be lat,lon or city name. 'days=7' for weekly forecast.
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=37.7749,-122.4194&days=7&aqi=no&alerts=no`
      )
        .then((res) => res.json())
        .then((data: WeatherApiResponse) => {
          // Add type annotation here
          // console.log("Initial WeatherAPI Data:", data); // For debugging
          setWeatherReport(data); // Store the new data structure
          // Use the new API structure for location
          if (data.location) {
            setLocation({
              statename: data.location.region,
              city: data.location.name,
            });
          } else {
            setLocation({ statename: "California", city: "San Francisco" }); // Fallback
          }
        })
        .catch((err) => console.error("Error fetching initial weather:", err));
    } else {
      console.error("WeatherAPI key (VITE_WEATHER_API_KEY) is missing.");
    }
  }, [WEATHER_API_KEY]); // Dependency array updated

  // Refactored function to use WeatherAPI directly
  const handleChangeLocation = (loc: LocationInput) => {
    if (!WEATHER_API_KEY) {
      console.error("WeatherAPI key is missing for location change.");
      return; // Exit if key is missing
    }

    const city = Object.values(loc)[0];
    const state = Object.keys(loc)[0]; // Assuming state is the key, city is the value
    const query = state ? `${city}, ${state}` : city; // Construct query string

    if (!query) {
      console.error("Invalid location input:", loc);
      return; // Exit if input is invalid
    }

    // Fetch weather data using WeatherAPI forecast endpoint
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(
        query
      )}&days=7&aqi=no&alerts=no`
    )
      .then((res) => {
        if (!res.ok) {
          // Handle API errors (like location not found)
          return res.json().then((errData) => {
            throw new Error(
              `WeatherAPI Error: ${errData.error?.message || res.statusText}`
            );
          });
        }
        return res.json();
      })
      .then((data: WeatherApiResponse) => {
        setWeatherReport(data);

        if (data.location) {
          setLocation({
            statename: data.location.region,
            city: data.location.name,
          });
        } else {
          setLocation({ statename: state || "", city: city });
        }
      })
      .catch((err) => {
        console.error("Error changing location:", err);
      });
  };

  return (
    <div className="weather-container">
      <div className="weather-grid-container">
        <div className="weather-current-location">
          {/* Pass typed props - TS will infer for now, explicit types needed in child components */}
          <CurrentLocation
            location={location}
            weatherReport={weatherReport?.current} // Pass ApiCurrentWeather | undefined
            click={() => setModal(true)}
          />
        </div>
        <div className="weather-around-the-world">
          <AroundWorld /> {/* Assuming AroundWorld takes no props for now */}
        </div>
        <div className="weather-current">
          <SimpleReport weatherReport={weatherReport?.current} />{" "}
        </div>
        <div className="weather-forecast">
          <HourlyForecast
            hourlyData={
              weatherReport?.forecast?.forecastday
                ? weatherReport?.forecast?.forecastday[0]?.hour
                : []
            }
          />
        </div>
        <div className="weather-seven-day">
          <SevenForecast dailyData={weatherReport?.forecast?.forecastday} />
        </div>
      </div>
      {modal && (
        <Modal
          cancel={() => setModal(false)}
          changeLocation={handleChangeLocation} // Pass the typed function
        />
      )}
    </div>
  );
};

export default Weather;
