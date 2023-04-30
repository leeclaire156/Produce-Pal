import React from 'react';
import spinner from '../../src/components/assets/loading.gif'; 
// update line 2 once file is added

function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;

