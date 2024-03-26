import Game from './components/Game';
import Popup from './components/Popup';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Remove Balloons!</h2>
      <div className="board">
        <Game />
        <Popup message="You have WON!!!" className="pop-up1 pop-up--hide" />
        <Popup message="You have LOST!!!" className="pop-up2 pop-up--hide" />
      </div>
    </div>
  );
}

export default App;
