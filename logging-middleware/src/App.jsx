// src/App.jsx

import React, { useEffect } from 'react';
import { logEvent } from './logger';
import SampleButton from './components/SampleButton';

function App() {
  useEffect(() => {
    logEvent('MOUNT', 'App component mounted');
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>Logging Middleware </h1>
      <SampleButton />
    </div>
  );
}

export default App;
