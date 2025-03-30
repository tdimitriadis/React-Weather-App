import React, { FC } from 'react'; // Import FC

import Weather from './pages/Weather';
import './App.css';

const App: FC = () => { // Type the component with FC and use arrow function syntax
  return (
    <div>
      <Weather />
    </div>
  );
}

export default App;
