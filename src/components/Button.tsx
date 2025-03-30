import React, { FC, MouseEventHandler } from 'react'; // Import FC, MouseEventHandler

import marker from '../assets/marker.png';
import './css/button.css';

// --- Interface ---
interface Props {
  value: string; // Text displayed on the button
  onClick: MouseEventHandler<HTMLButtonElement>; // Click handler function
}

// --- Component ---
const Button: FC<Props> = ({ value, onClick }) => {
  return (
    <button
      className='button-input'
      type='button'
      name='Button' // Name attribute is usually not needed for buttons unless submitting forms
      onClick={onClick} // Pass the onClick handler directly
    >
      <img className='button-image' src={marker} alt='' /> {/* Alt text could be more descriptive or empty */}
      <span className='button-text'>{value}</span>
    </button>
  );
};

export default Button;
