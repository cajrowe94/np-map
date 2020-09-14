import React from 'react';
import MapView from '../MapView';
import ListView from '../ListView';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="root_overlay root_overlay_hidden"></div>
      <div id="view">
        <MapView />
      </div>
    </div>
  );
}

export default App;
