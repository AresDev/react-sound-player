import React from 'react';
import './App.css';
import Player from './shared/components/player/Player';
function App() {
  return (
    <div className="App">
      <div id="bg-artwork" />
      <div id="bg-layer" />
      <Player />
    </div>
  );
}

export default App;
