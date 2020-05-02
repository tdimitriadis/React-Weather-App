import React, { useState, useEffect } from 'react';

import './css/modal.css';

const Modal = ({ cancel, changeLocation }) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    return () => {
      setCity('');
      setState('');
    };
  }, []);

  const handleChangeLocation = e => {
    if (e.target.name === 'city') {
      setCity(e.target.value);
    } else {
      setState(e.target.value);
    }
  };

  return (
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
            onChange={handleChangeLocation}
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
            onChange={handleChangeLocation}
            value={state}
          />
        </div>
        <div className='modal-button-container'>
          <button className='modal-button' onClick={() => cancel()}>
            Cancel
          </button>
          <button
            className={
              city === '' || state === '' ? 'modal-disabled' : 'modal-button'
            }
            onClick={() => {
              changeLocation({ [state]: city });
              cancel();
            }}
            disabled={(city === '' || state === '') && true}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
