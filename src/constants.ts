import sunIcon from "./assets/sunIcon.png";
import nightSunIcon from "./assets/nightSunIcon.png";
import nightBrokenClouds from "./assets/nightBrokenClouds.png";
import fewCloudsIcon from "./assets/fewCloudsIcon.png";
import nightFewCloudsIcon from "./assets/nightFewCloudsIcon.png";
import scatteredCloudsIcon from "./assets/scatteredCloudsIcon.png";
import showerRainIcon from "./assets/showerRainIcon.png";
import rainIcon from "./assets/rainIcon.png";
import nightRainIcon from "./assets/nightRainIcon.png";
import thunderstormIcon from "./assets/thunderstormIcon.png";
import snowIcon from "./assets/snowIcon.png";
import windIcon from "./assets/windIcon.png";

import sunIconSeven from "./assets/WeatherIcons/day_clear.svg";
import nightBrokenCloudsSeven from "./assets/WeatherIcons/cloudy.svg";
import scatteredCloudsIconSeven from "./assets/WeatherIcons/angry_clouds.svg";
import rainIconSeven from "./assets/WeatherIcons/day_rain.svg";
import fewCloudsIconSeven from "./assets/WeatherIcons/day_partial_cloud.svg";
import showerRainIconSeven from "./assets/WeatherIcons/rain.svg";
import thunderstormIconSeven from "./assets/WeatherIcons/rain_thunder.svg";

import newYork from "./assets/Cities/NewYork.jpg";
import losAngeles from "./assets/Cities/LosAngeles.jpg";
import chicago from "./assets/Cities/Chicago.jpg";
import houston from "./assets/Cities/Houston.jpg";
import philadelphia from "./assets/Cities/Philadelphia.jpg";
import sanFransisco from "./assets/Cities/SanFransisco.jpg";
import mexicoCity from "./assets/Cities/MexicoCity.jpg";
import tokyo from "./assets/Cities/Tokyo.jpg";
import sanPaulo from "./assets/Cities/SanPaulo.jpg";
import london from "./assets/Cities/London.jpg";
import paris from "./assets/Cities/Paris.jpg";
import venice from "./assets/Cities/Venice.jpg";

export const ICONS = {
  "01d": sunIcon,
  "01n": nightSunIcon,
  "02d": fewCloudsIcon,
  "02n": nightFewCloudsIcon,
  "03d": scatteredCloudsIcon,
  "03n": scatteredCloudsIcon,
  "04d": nightBrokenClouds,
  "04n": nightBrokenClouds,
  "09d": showerRainIcon,
  "09n": showerRainIcon,
  "10d": rainIcon,
  "10n": nightRainIcon,
  "11d": thunderstormIcon,
  "11n": thunderstormIcon,
  "13d": snowIcon,
  "13n": snowIcon,
  "50n": windIcon,
  "50d": windIcon,
};

export const SEVEN_DAY_ICONS = {
  "01d": sunIconSeven,
  "01n": sunIconSeven,
  "02d": fewCloudsIconSeven,
  "02n": fewCloudsIconSeven,
  "03d": scatteredCloudsIconSeven,
  "03n": scatteredCloudsIconSeven,
  "04d": nightBrokenCloudsSeven,
  "04n": nightBrokenCloudsSeven,
  "09d": showerRainIconSeven,
  "09n": showerRainIconSeven,
  "10d": rainIconSeven,
  "10n": rainIconSeven,
  "11d": thunderstormIconSeven,
  "11n": thunderstormIconSeven,
  "13d": snowIcon,
  "13n": snowIcon,
  "50n": windIcon,
  "50d": windIcon,
};

export const CITIES = [
  { "New York": "New York" },
  { "California": "Los Angeles" },
  { "Illinois": "Chicago" },
  { "Texas": "Houston" },
  { "Pennsylvania": "Philidelphia" },
  { "California": "San Francisco" },
  { "Mexico": "Mexico City" },
  { "Japan": "Tokyo" },
  { "Brazil": "San Paulo" },
  { "England": "London" },
  { "France": "Paris" },
  { "Italy": "Venice" },
];

export const CITY_IMAGES = {
  "New York": newYork,
  "Los Angeles": losAngeles,
  "Chicago": chicago,
  "Houston": houston,
  "Philidelphia": philadelphia,
  "San Francisco": sanFransisco,
  "Mexico City": mexicoCity,
  "Tokyo": tokyo,
  "San Paulo": sanPaulo,
  "London": london,
  "Paris": paris,
  "Venice": venice,
};
