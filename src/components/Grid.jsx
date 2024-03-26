import React from 'react';
import BalloonCell from './BalloonCell';

export default function Grid({ gridData }) {
  return (
    <table id="grid">
      <tbody>
        {gridData.map((rowData, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {rowData.map((cellData, cellIndex) => (
                <BalloonCell key={cellIndex} balloon={cellData.balloon}></BalloonCell>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
