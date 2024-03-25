import React from 'react';

export default function BalloonCell({ balloon, onClick }) {
  return <td onClick={onClick}>{balloon}</td>;
}
