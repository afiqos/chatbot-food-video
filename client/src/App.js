import './App.css';
import Chat from './Chat';

function App() {
  return (
    // BEM naming convention
    <div className="app">
      <div className="app__body">
        <Chat />
      </div>
    </div>
  );
}

export default App;
