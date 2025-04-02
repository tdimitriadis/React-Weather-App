import React, { useState, useEffect, useCallback, FC } from "react"; // Import FC

import { CITIES, CITY_IMAGES } from "../constants"; // Use .ts (implicitly)

import "./css/aroundWorld.css";

// --- Interfaces and Types ---
interface WeatherCurrent {
  temp?: number;
  weather?: {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
  // Add other fields if needed
}

interface WeatherReportState {
  lat?: number;
  lon?: number;
  timezone?: string;
  timezone_offset?: number;
  current?: WeatherCurrent;
  // hourly?: any[]; // Not used here
  // daily?: any[]; // Not used here
}

type LocationInput = { [key: string]: string };

interface GeoLocation {
  lat: number;
  lng: number;
}
interface GeocodeResult {
  address_components: any[]; // Define further if needed
  formatted_address: string;
  geometry: { location: GeoLocation /* other fields */ };
  place_id: string;
  types: string[];
}
interface GeocodeResponse {
  results: GeocodeResult[];
  status: string;
}

// Type for CITY_IMAGES keys
type CityImageKey = keyof typeof CITY_IMAGES;

// Type guard for CITY_IMAGES keys
const isValidCityImageKey = (key: string): key is CityImageKey => {
  return key in CITY_IMAGES;
};

// Helper to safely capitalize
const capitalize = (s?: string): string => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// --- Component ---
const AroundWorld: FC = () => {
  // Typed API Keys
  const OPEN_WEATHER_API_KEY: string =
    import.meta.env.VITE_OPEN_WEATHER_API_KEY || "";
  const GOOGLE_API_KEY: string = import.meta.env.VITE_GOOGLE_API_KEY || "";

  // Typed State
  const [weatherReport, setWeatherReport] = useState<WeatherReportState>({});
  const [temperature, setTemperature] = useState<string>(""); // Store as string for display consistency
  const [currentCity, setCurrentCity] = useState<string>("New York"); // Default city
  const [active, setActive] = useState<number>(0); // Default active index

  // Typed Callback Function
  const handleChangeLocation = useCallback(
    (loc: LocationInput) => {
      if (!GOOGLE_API_KEY || !OPEN_WEATHER_API_KEY) {
        console.error("API key(s) missing for AroundWorld location change.");
        return;
      }

      const city = Object.values(loc)[0];
      const state = Object.keys(loc)[0]; // Note: This assumes state is the key, might need adjustment based on CITIES structure

      if (!city || !state) {
        console.error("Invalid location input in AroundWorld:", loc);
        return;
      }

      // Fetch Geocoding
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          city
        )},+${encodeURIComponent(state)}&key=${GOOGLE_API_KEY}`
      )
        .then((res) => res.json())
        .then((data: GeocodeResponse) => {
          // Type response
          if (
            data.status !== "OK" ||
            !data.results ||
            data.results.length === 0
          ) {
            throw new Error(`Geocoding failed in AroundWorld: ${data.status}`);
          }
          const geoLocation = data.results[0].geometry.location;
          const lon = geoLocation.lng;
          const lat = geoLocation.lat;

          // Fetch Weather
          return fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`
          );
        })
        .then((res) => res.json())
        .then((data: WeatherReportState) => {
          // Type response
          setWeatherReport(data);
          // Safely set temperature string
          setTemperature(
            data.current?.temp ? Math.round(data.current.temp).toString() : ""
          );
        })
        .catch((err) => {
          console.error("Error changing location in AroundWorld:", err);
          setTemperature(""); // Reset temp on error
          setWeatherReport({}); // Reset weather on error
        });
    },
    [OPEN_WEATHER_API_KEY, GOOGLE_API_KEY] // Dependencies
  );

  // Initial fetch on mount
  useEffect(() => {
    // Find the index for "New York" to set initial active state correctly
    const initialIndex = CITIES.findIndex(
      (cityObj) => Object.values(cityObj)[0] === "New York"
    );
    if (initialIndex !== -1) {
      setActive(initialIndex);
    }
    handleChangeLocation({ "New York": "New York" }); // Fetch for default city
  }, [handleChangeLocation]); // Run only once on mount

  // Typed render function for cities
  const displayCities = () => {
    return CITIES.map((val, i) => {
      const cityValue = Object.values(val)[0]; // Get city name
      if (!cityValue) return null; // Skip if city name is somehow missing

      return (
        <li
          className={
            active === i ? "around-world-city-active" : "around-world-city"
          }
          key={cityValue} // Use city name as key
          onClick={() => {
            setActive(i);
            // Use double type assertion as suggested by TS error
            handleChangeLocation(val as unknown as LocationInput);
            setCurrentCity(cityValue); // Set the current city name string
          }}
        >
          {cityValue}
        </li>
      );
    });
  };

  // Determine image source safely
  const cityImageSrc = isValidCityImageKey(currentCity)
    ? CITY_IMAGES[currentCity]
    : CITY_IMAGES["New York"]; // Fallback to NY

  return (
    <div className="around-world-grid-container">
      <div className="around-world-image">
        <img
          className="around-world-img"
          src={cityImageSrc}
          alt={currentCity} // Use current city name for alt text
        />
        <div className="around-world-weather">
          <div className="around-world-description">
            {capitalize(weatherReport?.current?.weather?.[0]?.description)}
          </div>
          <div className="around-world-temp">
            {temperature ? temperature + "\xB0F" : "--"}{" "}
            {/* Display temp or placeholder */}
          </div>
        </div>
      </div>
      <div className="around-world-title">
        <div className="around-world-title-text">Around the World</div>
        <div className="around-world-line"></div>
      </div>
      <div className="around-world-locations">
        <ul className="around-world-list">{displayCities()}</ul>
      </div>
    </div>
  );
};

export default AroundWorld;
