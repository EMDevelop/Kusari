import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function TokenInformation(props) {
  const { symbol } = useParams();

  useEffect(() => {
    console.log(symbol);
  }, []);

  return (
    <div className="token-info-page">
      <h1>{`${symbol} Information`}</h1>
    </div>
  );
}
