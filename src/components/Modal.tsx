import React, { useState, useEffect, FC, ChangeEvent } from 'react'; // Import FC, ChangeEvent

import './css/modal.css';

// --- Interfaces & Types ---
type LocationInput = { [key: string]: string }; // Type for the location object

interface Props {
  cancel: () => void; // Function prop for canceling
  changeLocation: (loc: LocationInput) => void; // Function prop for changing location
}

// --- Component ---
const Modal: FC<Props> = ({ cancel, changeLocation }) => {
  // Typed state
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');

  // Cleanup effect remains the same
  useEffect(() => {
    return () => {
      setCity('');
      setState('');
    };
  }, []);

  // Typed event handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'city') {
      setCity(e.target.value);
    } else if (e.target.name === 'state') {
      setState(e.target.value);
    }
  };

  // Determine if the change button should be disabled
  const isChangeDisabled = city === '' || state === '';

  return (
    // Using template literal for class is fine, but could also use conditional class logic
    <div className={`modal-container`}>
      <div className='modal-grid-container'>
        <div className='modal-grid-header'>
          <div className='modal-grid-header-text'>Change Location</div>
        </div>
        <div className='modal-text-input'>
          <label className='modal-label' htmlFor='city'>
            City
          </label>
          <input
            className='modal-input'
            type='text'
            id='city'
            name='city'
            onChange={handleInputChange} // Use updated handler name
            value={city}
          />
          <label className='modal-label' htmlFor='state'>
            State
          </label>
          <input
            className='modal-input'
            type='text'
            id='state'
            name='state'
            onChange={handleInputChange} // Use updated handler name
            value={state}
          />
        </div>
        <div className='modal-button-container'>
          <button className='modal-button' onClick={cancel}> {/* Directly pass cancel prop */}
            Cancel
          </button>
          <button
            className={isChangeDisabled ? 'modal-disabled' : 'modal-button'} // Use calculated disabled state for class
            onClick={() => {
              if (!isChangeDisabled) { // Prevent action if disabled
                changeLocation({ [state]: city });
                cancel(); // Call cancel after changing location
              }
            }}
            disabled={isChangeDisabled} // Use calculated disabled state
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
