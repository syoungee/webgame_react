import Game from './components/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Remove Balloons!</h2>
      <div className="board">
        <Game />
      </div>
    </div>
  );
}

export default App;
