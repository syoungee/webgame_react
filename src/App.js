import Game from './components/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Remove Balloons!</h2>
      <div className="board">
        <Game />
        {/* <div class="pop-up pop-up--hide">
          <button class="pop-up__refresh">Redo</button>
          <p class="pop-up__message">You have WON!!!</p>
        </div> */}
        <div class="pop-up pop-up--hide">
          <button class="pop-up__refresh">Redo</button>
          <p class="pop-up__message">You have LOOSED!!!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
