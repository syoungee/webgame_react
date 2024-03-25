import React from 'react';
import BalloonCell from './BalloonCell';

export default function Grid({ gridData, onCellClick }) {
  return (
    <table id="grid">
      <tbody>
        {gridData.map((rowData, rowIndex) => {
          <tr key={rowIndex}>
            {rowData.map((cellData, cellIndex) => (
              <BalloonCell key={cellIndex} balloon={cellData.balloon} onClick={() => onCellClick(rowIndex, cellIndex)}></BalloonCell>
            ))}
          </tr>;
        })}
      </tbody>
    </table>
  );
}
