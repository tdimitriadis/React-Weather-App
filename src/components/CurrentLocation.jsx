import React from 'react';

import './css/currentLocation.css';

const CurrentLocation = ({ location }) => {
  return (
    <div className='current-location-grid-container'>
      <div className='current-location-image'>Image</div>
      <div className='current-location-city'>
        <span className='current-location-city-name'>
          {location.default &&
            location.default.city.charAt(0).toUpperCase() +
              location.default.city.slice(1).toLowerCase()}
        </span>
      </div>
      <div className='current-location-state'>
        <span className='current-location-state-name'>
          City in {location.default && location.default.statename}
        </span>
      </div>
      <div className='current-location-change-location'>Change Location</div>
    </div>
  );
};

export default CurrentLocation;
