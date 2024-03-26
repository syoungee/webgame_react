import Game from './components/Game';
import './App.css';

function App() {
  function redo() {
    window.location.reload();
  }

  return (
    <div className="App">
      <h2>Remove Balloons!</h2>
      <div className="board">
        <Game />
        <div className="pop-up1 pop-up--hide">
          <button className="pop-up__refresh" onClick={redo}>
            Redo
          </button>
          <p className="pop-up__message">You have WON!!!</p>
        </div>
        <div className="pop-up2 pop-up--hide">
          <button className="pop-up__refresh" onClick={redo}>
            Redo
          </button>
          <p className="pop-up__message">You have LOST!!!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
