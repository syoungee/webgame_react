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
      <button onClick={toggleDarkMode} className="darkmode-btn">{darkMode ? 'light mode' : 'dark mode'}</button>
      <div className="board">
        <Game />
        <Popup message="You have WON!!!" className="pop-up1 pop-up--hide" />
        <Popup message="You have LOST!!!" className="pop-up2 pop-up--hide" />
      </div>
    </div>
  );
}

export default App;
