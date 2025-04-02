import React, { useState, useEffect, FC } from "react"; // Import FC

// Import components (assuming they will be/are .tsx)
import SimpleReport from "../components/SimpleReport";
import CurrentLocation from "../components/CurrentLocation";
import Modal from "../components/Modal"; // Changed from .jsx
import HourlyForecast from "../components/HourlyForecast";
import SevenForecast from "../components/SevenForecast"; // Changed from .jsx
import AroundWorld from "../components/AroundWorld"; // Changed from .jsx

import "./css/weather.css";

// --- Interfaces and Types ---

// Basic interface for location state
interface LocationState {
  statename: string;
  city: string;
}

// Basic interfaces for weather report state based on usage
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

interface WeatherHourly {
  dt?: number;
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
  wind_gust?: number;
  weather?: {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
  pop?: number;
}

interface WeatherDailyTemp {
  day?: number;
  min?: number;
  max?: number;
  night?: number;
  eve?: number;
  morn?: number;
}

interface WeatherDailyFeelsLike {
  day?: number;
  night?: number;
  eve?: number;
  morn?: number;
}

interface WeatherDaily {
  dt?: number;
  sunrise?: number;
  sunset?: number;
  moonrise?: number;
  moonset?: number;
  moon_phase?: number;
  temp?: WeatherDailyTemp;
  feels_like?: WeatherDailyFeelsLike;
  pressure?: number;
  humidity?: number;
  dew_point?: number;
  wind_speed?: number;
  wind_deg?: number;
  wind_gust?: number;
  weather?: {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
  clouds?: number;
  pop?: number;
  uvi?: number;
}

interface WeatherReportState {
  lat?: number;
  lon?: number;
  timezone?: string;
  timezone_offset?: number;
  current?: WeatherCurrent;
  hourly?: WeatherHourly[];
  daily?: WeatherDaily[];
}

// Type for the input to handleChangeLocation
type LocationInput = { [key: string]: string };

// Types for Google Geocoding API response
interface GeoLocation {
  lat: number;
  lng: number;
}
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
interface GeocodeResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: {
    location: GeoLocation;
    location_type: string;
    viewport: {
      northeast: GeoLocation;
      southwest: GeoLocation;
    };
  };
  place_id: string;
  types: string[];
}
interface GeocodeResponse {
  results: GeocodeResult[];
  status: string;
}

// --- Component ---

const Weather: FC = () => {
  // Typed state hooks
  const [weatherReport, setWeatherReport] = useState<WeatherReportState>({});
  const [location, setLocation] = useState<LocationState>({
    statename: "",
    city: "",
  }); // Initialize with empty strings
  const [modal, setModal] = useState<boolean>(false);

  // Ensure API keys are treated as strings (or handle potential undefined)
  const OPEN_WEATHER_API_KEY: string =
    import.meta.env.VITE_OPEN_WEATHER_API_KEY || "";
  const GOOGLE_API_KEY: string = import.meta.env.VITE_GOOGLE_API_KEY || "";

  useEffect(() => {
    // Initial fetch for default location (San Francisco)
    if (OPEN_WEATHER_API_KEY) {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=37.7749295&lon=-122.4194155&units=imperial&appid=${OPEN_WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((data: WeatherReportState) => {
          // Type the response data
          setWeatherReport(data);
          setLocation({ statename: "California", city: "San Francisco" });
        })
        .catch((err) => console.error("Error fetching initial weather:", err)); // Add error handling
    } else {
      console.error("OpenWeather API key is missing.");
    }
  }, [OPEN_WEATHER_API_KEY]); // Dependency array

  // Typed function
  const handleChangeLocation = (loc: LocationInput) => {
    if (!GOOGLE_API_KEY || !OPEN_WEATHER_API_KEY) {
      console.error("API key(s) missing for location change.");
      return; // Exit if keys are missing
    }

    const city = Object.values(loc)[0]; // Assuming only one key-value pair
    const state = Object.keys(loc)[0]; // Assuming only one key-value pair

    if (!city || !state) {
      console.error("Invalid location input:", loc);
      return; // Exit if input is invalid
    }

    // Fetch geocoding data
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        city
      )},+${encodeURIComponent(state)}&key=${GOOGLE_API_KEY}`
    )
      .then((res) => res.json())
      .then((data: GeocodeResponse) => {
        // Type the geocoding response
        if (
          data.status !== "OK" ||
          !data.results ||
          data.results.length === 0
        ) {
          throw new Error(`Geocoding failed: ${data.status}`);
        }

        const address = data.results[0].address_components;
        const geoLocation = data.results[0].geometry.location;
        const lon = geoLocation.lng;
        const lat = geoLocation.lat;

        let foundLocation: LocationState | null = null;

        // Find matching state/city - simplified logic
        const stateComponent = address.find((comp) =>
          comp.types.includes("administrative_area_level_1")
        );
        const cityComponent = address.find(
          (comp) =>
            comp.types.includes("locality") ||
            comp.types.includes("administrative_area_level_3") ||
            comp.types.includes("postal_town")
        );

        if (stateComponent && cityComponent) {
          foundLocation = {
            statename: stateComponent.long_name,
            city: cityComponent.long_name,
          };
          setLocation(foundLocation);
        } else {
          console.warn(
            "Could not accurately determine state/city from geocoding response."
          );
          // Fallback or keep previous location? For now, just log.
        }

        // Fetch weather data for the new coordinates
        return fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`
        );
      })
      .then((res) => {
        if (!res) return; // Skip if geocoding failed
        return res.json();
      })
      .then((data?: WeatherReportState) => {
        // Type weather response, make optional
        if (data) {
          setWeatherReport(data);
        }
      })
      .catch((err) => {
        console.error("Error changing location:", err); // Improved error logging
      });
  };

  return (
    <div className="weather-container">
      <div className="weather-grid-container">
        <div className="weather-current-location">
          {/* Pass typed props - TS will infer for now, explicit types needed in child components */}
          <CurrentLocation
            location={location}
            weatherReport={weatherReport?.current} // Use optional chaining
            click={() => setModal(true)}
          />
        </div>
        <div className="weather-around-the-world">
          <AroundWorld /> {/* Assuming AroundWorld takes no props for now */}
        </div>
        <div className="weather-current">
          <SimpleReport weatherReport={weatherReport?.current} />{" "}
          {/* Use optional chaining */}
        </div>
        <div className="weather-forecast">
          <HourlyForecast weatherReport={weatherReport} />
        </div>
        <div className="weather-seven-day">
          <SevenForecast weatherReport={weatherReport} />
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
