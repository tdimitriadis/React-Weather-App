import React, { useState, useEffect } from 'react';

import * as locationData from '../assets/testData.json';
import SimpleReport from '../components/SimpleReport';
import CurrentLocation from '../components/CurrentLocation';
import Modal from '../components/Modal.jsx';
import HourlyForecast from '../components/HourlyForecast';
import SevenForecast from '../components/SevenForecast.jsx';

import './css/weather.css';

const Weather = () => {
  const [weatherReport, setWeatherReport] = useState({});
  const [location, setLocation] = useState({});
  const [modal, setModal] = useState(false);

  const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  // useEffect(() => {
  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/onecall?lat=37.7749295&lon=-122.4194155&units=imperial&appid=${OPEN_WEATHER_API_KEY}`,
  //   )
  //     .then(res => res.json())
  //     .then(data => {
  //       setWeatherReport(data);
  //       setLocation({ statename: 'California', city: 'San Francisco' });
  //     });
  // }, []);

  useEffect(() => {
    setWeatherReport(locationData.default);
    setLocation({ statename: 'California', city: 'San Francisco' });
  }, []);

  const handleChangeLocation = loc => {
    let city = Object.values(loc);
    let state = Object.keys(loc);

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=${GOOGLE_API_KEY}`,
    )
      .then(res => res.json())
      .then(data => {
        let geoLocation = data.results[0].geometry.location;
        let lon = geoLocation.lng;
        let lat = geoLocation.lat;
        setLocation({ statename: state, city: city });
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`,
        )
          .then(res => res.json())
          .then(data => {
            setWeatherReport(data);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='weather-container'>
      <div className='weather-grid-container'>
        <div className='weather-current-location'>
          <CurrentLocation
            location={location}
            weatherReport={weatherReport.current}
            click={() => setModal(true)}
          />
        </div>
        <div className='weather-around-the-world'>Around the world</div>
        <div className='weather-current'>
          <SimpleReport weatherReport={weatherReport.current} />
        </div>
        <div className='weather-forecast'>
          <HourlyForecast />
        </div>
        <div className='weather-seven-day'>
          <SevenForecast />
        </div>
      </div>
      {modal && (
        <Modal
          cancel={() => setModal(false)}
          changeLocation={loc => handleChangeLocation(loc)}
        />
      )}
    </div>
  );
};

export default Weather;
