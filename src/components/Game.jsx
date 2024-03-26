import React, { useState, useEffect } from 'react';
import Grid from './Grid';

export default function Game() {
  const [gridSize, setGridSize] = useState(0);
  const [gridData, setGridData] = useState([]);
  let balloonData = [];

  useEffect(() => {
    const initializedGridData = initGame(gridSize);
    setGridData(initializedGridData);
    // balloonData = [];
    count(initializedGridData);
  }, [gridSize]);

  const handleInputChange = (event) => {
    const size = parseInt(event.target.value);
    setGridSize(size);
  };

  // 가장 많은 풍선의 갯수 반환 함수
  function getMax() {
    let maxNumber = Math.max(...balloonData);
    return maxNumber;
  }

  // bfs 탐색시 가도 되는 곳인지 유무 반환 함수
  function isValid(x, y, rows, columns, visited) {
    return x >= 0 && y >= 0 && x < rows && y < columns && !visited[x][y];
  }

  // 가장 많은 풍선의 갯수 삭제 함수
  function removeMax() {
    let maxNumber = Math.max(...balloonData);
    let maxIndex = balloonData.indexOf(maxNumber);
    if (maxIndex !== -1) {
      balloonData.splice(maxIndex, 1);
    }
  }

  // 인접한 풍선의 갯수 카운트 함수
  function count(gridData) {
    const rows = gridData?.length;
    const cols = gridData[0]?.length;

    const dx = [1, -1, 0, 0]; // (오른쪽, 왼쪽, 위, 아래)
    const dy = [0, 0, 1, -1];

    const visited = new Array(rows).fill(false).map(() => new Array(cols).fill(false));

    const queue = [];
    const queue2 = [];

    // bfs 탐색을 통해 인접한 풍선의 수 카운트 & balloonData에 저장
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
          while (queue2.length > 0) {
            const [x, y] = queue2.shift();
            gridData[x][y].count = adcount;
          }
        }
      }
    }
  }

  function initGame(gridSize) {
    let gridTable = document.getElementById('grid');
    gridTable.innerHTML = '';
    let gridData = [];

    for (let i = 1; i <= gridSize; i++) {
      let row = document.createElement('tr');
      let rowData = [];

      for (let j = 1; j <= gridSize; j++) {
        let cell = document.createElement('td');
        // 40% 확률로 풍선을 채워줌
        let balloon = Math.random() < 0.4 ? '🎈' : ' ';
        cell.textContent = balloon;

        let cellData = {
          balloon: balloon,
          count: 0,
        };
        rowData.push(cellData);

        cell.addEventListener('click', function () {
          let temp = getMax();
          if (this.textContent === '🎈') {
            let rowIndex = this.parentNode.rowIndex;
            let cellIndex = this.cellIndex;
            if (gridData[rowIndex][cellIndex].count === temp) {
              removeMax();
              temp = getMax();
              this.textContent = ' '; // 풍선 제거
              gridData[rowIndex][cellIndex].balloon = ' ';
              removeBalloons(gridData, rowIndex, cellIndex);
              if (balloonData.length == 0) {
                winGame();
              }
            } else {
              looseGame();
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

  // 상하좌우로 인접한 풍선 제거
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
    setGridData(gridData);
  }

  // 이기고 게임 끝 
  function winGame() {
    const popUp = document.querySelector('.pop-up1');
    popUp.classList.remove('pop-up--hide');
  }

  // 지고 게임 끝
  function looseGame() {
    const popUp = document.querySelector('.pop-up2');
    popUp.classList.remove('pop-up--hide');
  }

  return (
    <>
      <input className="input-box" type="number" value={gridSize} onChange={handleInputChange} placeholder="Enter grid size" />
      <div className="game-board">
        <Grid gridData={gridData} />
      </div>
    </>
  );
}
