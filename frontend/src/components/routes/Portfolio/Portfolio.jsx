import React, { useEffect } from 'react';

export default function Portfolio() {
  useEffect(() => {
    // Request to the backend so that we can see all of the current users portfolio
    'multi/get-prices/:username';
  }, []);

  return <div></div>;
}
