

import React from 'react';
import { logEvent } from '../logger';

const SampleButton = () => {
  const handleClick = async () => {
    logEvent('CLICK', 'User clicked the sample button');

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await res.json();
      logEvent('API_RESPONSE', 'Fetched data from API', { data });
    } catch (error) {
      logEvent('ERROR', 'API call failed', { error: error.message });
    }
  };

  return <button onClick={handleClick}>Click Me</button>;
};

export default SampleButton;
