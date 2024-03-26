import Game from './components/Game';
import Popup from './components/Popup';
import { useState } from 'react';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? 'App dark' : 'App'}>
      <h2>Remove Balloons!</h2>
      <label className="switch">
        <input type="checkbox" onChange={toggleDarkMode} checked={darkMode} />
        <span className="slider round"></span>
      </label>
      <p>{darkMode ? '다크 모드' : '라이트 모드'}</p>
      <div className="board">
        <Game />
        <Popup message="You have WON!!!" className="pop-up1 pop-up--hide" />
        <Popup message="You have LOST!!!" className="pop-up2 pop-up--hide" />
      </div>
    </div>
  );
}

export default App;
