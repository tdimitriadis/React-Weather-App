import React from 'react';

import marker from '../assets/marker.png';
import './css/button.css';

const Button = ({ value }) => {
  return (
    <button className="button-input" type="button" name="Button">
      <img className="button-image" src={marker} alt="img" />
      <span className="button-text">{value}</span>
    </button>
  );
};

export default Button;
