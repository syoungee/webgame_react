import React, { useState, useEffect } from 'react';
import Grid from './Grid';

export default function Game() {
  const [gridData, setGridData] = useState([]);
  let balloonData = [];

  useEffect(() => {
    const initializedGridData = initGame();
    setGridData(initializedGridData);
    balloonData = [];
    count(initializedGridData);
  }, []);

  function getMax() {
    let maxNumber = Math.max(...balloonData);
    console.log('get max data>>', maxNumber, balloonData);
    return maxNumber;
  }

  function isValid(x, y, rows, columns, visited) {
    return x >= 0 && y >= 0 && x < rows && y < columns && !visited[x][y];
  }

  function removeMax() {
    let maxNumber = Math.max(...balloonData);
    let maxIndex = balloonData.indexOf(maxNumber);
    console.log(balloonData);
    if (maxIndex !== -1) {
      console.log(maxIndex);
      balloonData.splice(maxIndex, 1);
    }
    // setBalloonData(balloonData);
    console.log('지운 뒤 결과물', balloonData);
  }

  function count(gridData) {
    const rows = gridData.length;
    const cols = gridData[0].length;

    const dx = [1, -1, 0, 0]; // (오른쪽, 왼쪽, 위, 아래)
    const dy = [0, 0, 1, -1];

    const visited = new Array(rows).fill(false).map(() => new Array(cols).fill(false));

    const queue = [];
    const queue2 = [];

    for (let i = 0; i < gridData.length; i++) {
      for (let j = 0; j < gridData[0].length; j++) {
        if (gridData[i][j].balloon !== '🎈' || visited[i][j]) {
          continue;
        } else {
          queue.push([i, j]);
          queue2.push([i, j]);

          visited[i][j] = true;
          while (queue.length > 0) {
            const [x, y] = queue.shift();

            for (let d = 0; d < 4; d++) {
              const nx = x + dx[d];
              const ny = y + dy[d];
              if (isValid(nx, ny, rows, cols, visited) && gridData[nx][ny].balloon === '🎈') {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
                queue2.push([nx, ny]);
              }
            }
          }

          let adcount = queue2.length;
          balloonData.push(adcount);
          console.log('>', i, j, adcount, balloonData);
          while (queue2.length > 0) {
            const [x, y] = queue2.shift();
            gridData[x][y].count = adcount;
          }
        }
      }
    }

    console.log('grid data', gridData);
  }

  function initGame() {
    let gridTable = document.getElementById('grid');
    gridTable.innerHTML = '';
    let gridData = [];

    // 9x9
    for (let i = 1; i <= 5; i++) {
      let row = document.createElement('tr');
      let rowData = [];

      for (let j = 1; j <= 5; j++) {
        let cell = document.createElement('td');
        let balloon = Math.random() < 0.4 ? '🎈' : ' ';
        cell.textContent = balloon;

        let cellData = {
          balloon: balloon,
          adjacentBalloons: 0,
        };
        rowData.push(cellData);

        // click event
        cell.addEventListener('click', function () {
          let temp = getMax();
          if (this.textContent === '🎈') {
            let rowIndex = this.parentNode.rowIndex;
            let cellIndex = this.cellIndex;
            console.log(rowIndex, cellIndex, gridData[rowIndex][cellIndex].count, temp);
            if (gridData[rowIndex][cellIndex].count == temp) {
              removeMax();
              temp = getMax();
              console.log(balloonData);
              console.log('잘 지워짐!');
              this.textContent = ' '; // 풍선 제거
              gridData[rowIndex][cellIndex].balloon = ' ';
              removeBalloons(gridData, rowIndex, cellIndex);
              console.log(gridData[rowIndex][cellIndex]);
            }
          }
        });
        row.appendChild(cell);
      }

      gridData.push(rowData);
      gridTable.appendChild(row);
    }

    return gridData;
  }

  function removeBalloons(gridData, rowIndex, cellIndex) {
    const dx = [1, -1, 0, 0]; // (오른쪽, 왼쪽, 위, 아래)
    const dy = [0, 0, 1, -1];
    const rows = gridData.length;
    const cols = gridData[0].length;
    const visited = new Array(rows).fill(false).map(() => new Array(cols).fill(false));
    const queue = [];

    queue.push([rowIndex, cellIndex]);
    visited[rowIndex][cellIndex] = true;
    while (queue.length > 0) {
      const [x, y] = queue.shift();

      const cell = document.getElementsByTagName('tr')[x].getElementsByTagName('td')[y];
      cell.textContent = ' ';

      for (let d = 0; d < 4; d++) {
        const nx = x + dx[d];
        const ny = y + dy[d];
        if (isValid(nx, ny, rows, cols, visited) && gridData[nx][ny].balloon === '🎈') {
          visited[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
    }
    console.log('grid data updated', gridData);
    setGridData(gridData);
  }

  function finishGame(win){
    const popUp = document.querySelector('.pop-up');
    popUp.classList.remove('pop-up--hide');
  }
  

  return <Grid gridData={gridData} />;
}
